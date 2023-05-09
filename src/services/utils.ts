import prompt from 'prompt';
import { writeFileSync } from 'node:fs';

// eslint-disable-next-line
type GetUserInputFunction = (inputName?: string) => Promise<string>;

export const getUserInput: GetUserInputFunction = (inputName = 'input') =>
  new Promise((resolve) => {
    prompt.get([inputName], (err, result) => {
      if (err) {
        console.log('Error:', err);
        return;
      }
      resolve(result[inputName] as string);
    });
  });

export const promptForApiKey = async function (): Promise<string> {
  console.log('Please set OPEN_API_API_KEY environment variable.');
  const apiKey = await getUserInput();
  writeFileSync('.env', `OPEN_API_API_KEY=${apiKey}`, { encoding: 'utf-8' });
  console.log('Api saved to .env file. Please restart the app.');
  return apiKey;
};

export const checkForExitInput = (input?: string) => {
  if (typeof input === 'string' && input.toLowerCase() === 'exit') {
    console.log('Goodbye!');
    setTimeout(() => {
      process.exit(0);
    }, 500);
    return true;
  }
  return false;
};
