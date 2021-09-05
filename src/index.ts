import * as dotenv from 'dotenv';
import Bot from './Bot';

(async () => {
  dotenv.config();

  const bot: Bot = new Bot();
  await bot.start();
})();
