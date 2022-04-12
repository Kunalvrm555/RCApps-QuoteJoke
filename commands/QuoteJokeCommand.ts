import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { ISlashCommand, SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands/index';
import { initiatorMessage } from '../lib/initiatorMessage';
export class QuoteJokeCommand implements ISlashCommand {
	public command = 'quotejoke';
	public i18nDescription = 'Fetch Joke or Quote from API according to user choice ';
	public providesPreview = false;
	public i18nParamsExample = '';
	public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persistence: IPersistence): Promise<void> {
		const sender = context.getSender(); // the user calling the slashcommand
		const room = context.getRoom(); // the current room

		const data = {
			room: room,
			sender: sender,
		};

		await initiatorMessage({ data, read, persistence, modify, http });
	}
}
