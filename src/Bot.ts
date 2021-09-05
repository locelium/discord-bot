import { Client } from 'discord.js';
import { Logger } from 'winston';
import winston = require('winston');
import Command from './command/Command';
import PingCommand from './command/impl/PingCommand';

class Bot {
  private token?: string;
  private prefix: string;
  private owner?: string;

  private client: Client;
  private commands: Command[];
  private logger: Logger;

  constructor() {
    this.token = process.env.DISCORD_BOT_TOKEN;
    this.prefix = process.env.BOT_PREFIX || '%';
    this.owner = process.env.DISCORD_BOT_OWNER;

    this.client = new Client({ intents: 'GUILD_MESSAGES' });

    this.commands = [new PingCommand()];

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
    await this.client.login(this.token);

    this.logger.info('Discord bot has logged in.');
  }
}

export default Bot;
