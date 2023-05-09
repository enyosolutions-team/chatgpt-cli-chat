import {
  Configuration, OpenAIApi
} from 'openai';
import { promptForApiKey } from './utils.ts';

let apiKey = process.env.OPEN_API_API_KEY || '';

if (!apiKey) {
  promptForApiKey()
    .then((key: string) => {
      apiKey = key;
    })
    .catch(console.error);
}
// OpenAI configuration creation
const configuration = new Configuration({apiKey,});
// OpenAI instance creation
export const openai = new OpenAIApi(configuration);

export async function chatWithGPT(
  message: string,
  context = [],
  model = 'gpt-3.5-turbo',
): Promise<string> {
  try {
    // console.log('Sending message to GPT:', [
    //   ...context,
    //   {
    //     role: 'user', content: message
    //   },
    // ]);
    const response = await openai.createChatCompletion({
      model,
      messages: [...context, {
        role: 'user', content: message
      }],
      max_tokens: 800,
      n: 1,
      stop: null,
      temperature: 0.2,
    });

    return (
      response.data.choices?.[0]?.message?.content ||
      JSON.stringify(response.data, null, 2)
    );
  } catch (error) {
    console.error(
      'Error while chatting with GPT:',
      error?.response?.data || error.message,
    );
    return 'Sorry, I could not process your request.';
  }
}

export default openai;
