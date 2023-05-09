import 'dotenv/config';
import prompt from 'prompt';
import { chatWithGPT } from './services/openai';
import getDb from './services/db';
import { getUserInput } from './services/utils';

prompt.start();

const chat = async () => {
  const DB = await getDb();
  const ore = await import('ora');
  const ora = ore.default;
  const spinner = ora('Loading...');
  const sessionId = Date.now();
  DB.data.history[sessionId] = DB.data.history[sessionId] || [];
  await DB.write();

  console.log('Welcome to ChatGPT CLI! Type your message and press Enter.');
  const context = [];
  while (true) {
    const userInput = await getUserInput();
    if (typeof userInput === 'string' && userInput.toLowerCase() === 'exit') {
      console.log('Goodbye!');
      setTimeout(() => {
        process.exit(0);
      }, 500);
      break;
    }
    if (userInput === null || userInput === undefined || userInput === '') {
      continue;
    }

    // Call your chat function here, for example:
    spinner.start();
    const response = await chatWithGPT(userInput as string, context);
    spinner.stop();
    context.push({ role: 'user', content: userInput });
    context.push({ role: 'system', content: response });
    console.log(`ChatGPT: ${response}`);

    DB.data.history[sessionId].push({ input: userInput, output: response });
    DB.write();
  }
};

chat();
