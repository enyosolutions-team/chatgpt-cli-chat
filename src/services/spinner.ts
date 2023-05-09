import logUpdate from 'log-update';

const elegantSpinner = await import('elegant-spinner');

const frame = elegantSpinner();
export const spinner: {
  handle: NodeJS.Timeout | null;
  active: boolean;
  start: () => void;
  stop: () => void;
} = {
  handle: null,
  active: false,
  start: () => {
    spinner.active = true;
    spinner.handle = setInterval(() => {
      logUpdate(frame());
    }, 50);
  },
  stop: () => {
    spinner.active = false;
    clearInterval(spinner.handle);
    logUpdate.clear();
  },
};
