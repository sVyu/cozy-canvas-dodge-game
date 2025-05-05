import { mainScript } from './main_script.js';

const GameManager = async () => {
  const $PressEnterToContinue = document.querySelector('#pressEnterToContinue');

  for (let i = 0; i < 100; ++i) {
    // mainScript for 1 round
    const passedTime = await mainScript();
    // EnterToContinue
    await new Promise((resolve) => {
      $PressEnterToContinue.classList.toggle('show');
      const EnterkeyCheck = (e) => {
        if (e.keyCode == 13) {
          window.removeEventListener('keydown', EnterkeyCheck, false);
          $PressEnterToContinue.classList.toggle('show');
          resolve();
        }
      };
      window.addEventListener('keydown', EnterkeyCheck, false);
    });
  }
};

GameManager();
