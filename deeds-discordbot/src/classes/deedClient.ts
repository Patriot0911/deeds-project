import {
    Client,
    Collection
} from 'discord.js';
import {
    commandParserController,
    eventParserController,
    folderParser
} from '../utils/helpers/parsers';
import postGuildCommands from '../utils/guild-commands';
import {
    ICommandPayload,
    TButton,
    TCommand,
    TEvent,
    TCustomClientProps,
    TSelector
} from '../types';

export default class deedClient extends Client {

    public commandsList: String[];
    public commands: Collection<String, TCommand>;
    public buttons: Collection<String, TButton>;
    public selectors: Collection<String, TSelector>;

    constructor(options: TCustomClientProps) {
        super(options);

        this.commandsList = [];
        this.commands = new Collection();
        this.selectors = new Collection();
        this.buttons = new Collection();

        this.loadAll();
    };

    public loadAll() {
        this.loadCommands();
        this.loadEvents();
        this.loadSelectors();
        this.loadButtons();
    };

    private async loadCommands(): Promise<void>{
        const commandsRequest: ICommandPayload[] = [];
        await folderParser('commands',
            (fileContent: TCommand) => {
                const commandInfo = commandParserController(this, fileContent);
                if(commandInfo) {
                    commandsRequest.push(commandInfo);
                }
            }
        );
        if((await postGuildCommands(commandsRequest)) === undefined) {
            console.log('[Parser] Error accured in Command Parser');
            this.destroy();
            return;
        };
    };
    private loadSelectors(): void {
        folderParser('selectors',
            (fileContent: TSelector) => this.selectors.set(fileContent.info.name, fileContent)
        );
    };
    private loadEvents(): void {
        folderParser('events',
            (fileContent: TEvent) => eventParserController(this, fileContent)
        );
    };
    private loadButtons(): void {
        folderParser('buttons',
            (fileContent: TButton) => this.buttons.set(fileContent.info.name, fileContent)
        );
    };

    public getCommand(name: string) {
        const command = this.commands.get(name);
        if(command === undefined) {
            console.log('[Collection`s Error] No Command Found');
            return undefined;
        }
        return command;
    };
};