import { Message } from 'discord.js';

abstract class Command {
  name: string;
  aliases: string[];

  constructor(name: string, aliases?: string[]) {
    this.name = name;
    this.aliases = aliases || [];
  }

  abstract execute(message: Message): Promise<boolean>;

  get handles(): string[] {
    return [...this.handles, this.name];
  }
}

export default Command;
