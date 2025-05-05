import { mainScript } from './main_script.js';

const GameManager = async () => {
  const $PressEnterToContinue = document.querySelector('#pressEnterToContinue');
  const $maxScore = document.getElementById('maxScore');
  let maxScore = 0;
  $maxScore.innerHTML = `max score<br/> ${maxScore.toFixed(3)}`;

  for (let i = 0; i < 100; ++i) {
    // mainScript for 1 round
    const score = await mainScript();
    maxScore = Math.max(maxScore, score);
    $maxScore.innerHTML = `max score<br/> ${maxScore.toFixed(3)}`;

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
