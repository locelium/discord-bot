import { Message } from 'discord.js';
import Command from '../Command';

class PingCommand extends Command {
  constructor() {
    super('ping');
  }

  async execute(message: Message): Promise<boolean> {
    await message.channel.send({ content: 'pong' });
    return true;
  }
}

export default PingCommand;
