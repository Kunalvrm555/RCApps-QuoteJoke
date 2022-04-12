import {
	IAppAccessors,
	IConfigurationExtend,
	IHttp,
	ILogger,
	IModify,
	IPersistence,
	IRead,
} from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { UIKitBlockInteractionContext } from '@rocket.chat/apps-engine/definition/uikit';
import { QuoteJokeCommand } from './commands/QuoteJokeCommand';

export class QuoteJokeApp extends App {
	constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
		super(info, logger, accessors);
	}
	public async executeBlockActionHandler(
		context: UIKitBlockInteractionContext,
		read: IRead,
		http: IHttp,
		persistence: IPersistence,
		modify: IModify,
	) {
		const data = context.getInteractionData();
		console.log(data.value);
		const { room } = context.getInteractionData();
		if (data.value === 'quote') {
			console.log('quote verified');
            const quoteResponse = await http.get('https://api.quotable.io/random');
			const quoteSender = modify.getCreator().startMessage().setText(`*${quoteResponse.data.content}*\n~_${quoteResponse.data.author}_`);
			if (room) {
				quoteSender.setRoom(room);
			}
			await modify.getCreator().finish(quoteSender);
		} else if (data.value === 'joke') {
			console.log('joke verified');
            const jokeResponse = await http.get('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single');
			const jokeSender = modify.getCreator().startMessage().setText(`${jokeResponse.data.joke}`);
            if (room) {
				jokeSender.setRoom(room);
			}
			await modify.getCreator().finish(jokeSender);
		}
        
	}

	protected async extendConfiguration(configuration: IConfigurationExtend): Promise<void> {
		const quotejokeCommand: QuoteJokeCommand = new QuoteJokeCommand();
		await configuration.slashCommands.provideSlashCommand(quotejokeCommand);
	}
}
