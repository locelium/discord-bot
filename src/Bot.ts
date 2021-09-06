import { Intents } from 'discord.js';
import { Client } from '@typeit/discord';
import { Logger } from 'winston';
import winston = require('winston');

class Bot {
  private token: string;
  private prefix: string;
  private owner: string;

  private client: Client;
  private logger: Logger;

  constructor() {
    this.token = process.env.DISCORD_BOT_TOKEN || '';
    this.prefix = process.env.BOT_PREFIX || '%';
    this.owner = process.env.DISCORD_BOT_OWNER || '';

    this.client = new Client({
      intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
      classes: [`${__dirname}/*Discord.ts`, `${__dirname}/*Discord.js`],
      silent: true
    });

    this.logger = winston.createLogger({
      level: 'info',
      transports: [new winston.transports.Console()],
      format: winston.format.combine(
        winston.format.label({
          label: 'Bot'
        }),
        winston.format.timestamp({
          format: 'MM-DD-YYYY HH:mm:ss'
        }),
        winston.format.printf(
          info =>
            `${info.level.toUpperCase()} ${[info.timestamp]} - ${info.message}`
        )
      )
    });
  }

  async start(): Promise<void> {
    this.client.once('ready', async () => {
      await this.client.clearSlashes();
      await this.client.initSlashes();
    });

    await this.client.login(this.token);
    this.client.on('ready', async () => {
      await this.client.user?.setPresence({
        activities: [
          {
            name: 'mining helium...',
            type: 'PLAYING'
          }
        ]
      });
    });
    this.logger.info('Discord bot has logged in.');
  }
}

export default Bot;
