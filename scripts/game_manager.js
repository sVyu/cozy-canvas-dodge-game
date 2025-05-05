import { mainScript } from './main_script.js';

const GameManager = async () => {
  for (let i = 0; i < 3; ++i) {
    // mainScript for 1 round
    const passedTime = await mainScript();

    // EnterToContinue
    await new Promise((resolve) => {
      const EnterkeyCheck = (e) => {
        if (e.keyCode == 13) {
          window.removeEventListener('keydown', EnterkeyCheck, false);
          resolve();
        }
      };
      window.addEventListener('keydown', EnterkeyCheck, false);
    });
  }
};

GameManager();
