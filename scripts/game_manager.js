import { mainScript } from './main_script.js';

const GameManager = async () => {
  for (let i = 0; i < 3; ++i) {
    const passedTime = await mainScript();
  }
};

GameManager();
