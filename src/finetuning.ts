import 'dotenv/config';
import prompt from 'prompt';
import { join } from 'node:path';
import { debug as Debug } from 'debug';
import { openai } from './services/openai';
import getDb from './services/db';
import { getUserInput, checkForExitInput } from './services/utils';
import { writeFileSync, createReadStream } from 'fs';

const debug = Debug('chat:finetuning');
let fileToUpload = process.argv[2];
prompt.start();

/**
 * Get's the input training data in form of an array of objects with prompt and completion properties..
 *
 * @returns {Promise<{ prompt: string; completion: string; }[]>}
 */
async function inputTrainingData(): Promise<
  { prompt: string; completion: string }[]
> {
  let trainingData = [];
  let isInputtingData = true;
  while (isInputtingData) {
    console.log(
      'Please enter a prompt and press Enter. (Enter DONE to finish)\n\n',
    );
    const input = await getUserInput('prompt');
    if (checkForExitInput(input)) {
      break;
    }
    if (input === 'DONE' || input === '') {
      isInputtingData = false;
      break;
    }
    console.log(
      'Please enter the related completion and press Enter. (Enter DONE to finish)\n\n',
    );
    const completion = await getUserInput('completion');
    if (checkForExitInput(completion)) {
      break;
    }
    if (input === 'DONE' || input === '') {
      isInputtingData = false;
      break;
    }
    trainingData.push({ prompt: input, completion });
  }
  return trainingData;
}
const chat = async () => {
  const DB = await getDb();
  const ore = await import('ora');
  const ora = ore.default;
  const spinner = ora('Loading...');
  const sessionId = Date.now();
  DB.data.history[sessionId] = DB.data.history[sessionId] || [];
  await DB.write();

  console.log('Welcome to ChatGPT CLI! Fine tuning\n\n');
  const context = [];
  while (true) {
    const existingTuningList = (await openai.listFineTunes()).data?.data;
    console.log('Existing fine tuning models:');
    debug(existingTuningList);
    console.table(
      existingTuningList.map(({ id, model, status, fine_tuned_model }) => ({
        id,
        model,
        status,
        fine_tuned_model,
      })),
    );

    console.log(
      'Please type the name for the model you want to train and press Enter. If you type a model that does not exists, it will be create',
      '\n\n',
    );
    const trainingModelName = await getUserInput('model name');
    checkForExitInput(trainingModelName as string);
    if (
      trainingModelName === null ||
      trainingModelName === undefined ||
      trainingModelName === ''
    ) {
      console.log('Please enter a valid name');
      continue;
    }

    // if the user did not provide a file to upload via arg, ask for the training data
    if (!fileToUpload) {
      const trainingData = await inputTrainingData();
      // create and upload the training file content
      const trainingFileContent = trainingData
        .map(
          ({ prompt, completion }) =>
            `{"prompt": "${prompt}", "completion": "${completion}"}`,
        )
        .join('\n');
      fileToUpload = join(
        __dirname,
        '../db/',
        `training-${trainingModelName}.jsonl`,
      );
      writeFileSync(fileToUpload, trainingFileContent, 'utf8');
    }
    // upload the training file to openai
    let file;
    try {
      file = await openai.createFile(
        createReadStream(fileToUpload) as any,
        'fine-tune',
      );
    } catch (e) {
      console.log('Error creating file', e.response.data);
      throw e;
    }

    // Call your chat function here, for example:
    spinner.start();
    const response = await openai
      .createFineTune({
        model: 'text-davinci-003', // TODO: make this configurable
        suffix: trainingModelName,
        training_file: file.data.id,
      })
      .catch((e) => console.warn('Error creating fine tune', e.response.data));

    spinner.stop();
    if (!DB.data.fineTunes) {
      DB.data.fineTunes = {};
    }
    DB.data.fineTunes[trainingModelName] = {
      file: file.data.id,
      trainingModelName,
      modelresponse: response && response?.data,
      inputs: context,
    };
    DB.write();
  }
};

chat();
