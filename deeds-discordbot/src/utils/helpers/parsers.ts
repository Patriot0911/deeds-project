import fs from 'node:fs/promises';
import { TCommand, TEvent } from '../../types';
import deedClient from '../../classes/deedClient';

export const folderParser = async (
    path: string,
    storeCallback: (content: any) => void
) => {
    const filesList = (await fs.readdir(`./src/${path}`))
    .filter(file => file.endsWith('.ts'));
    for(const file of filesList) {
        const filePath = `../../${path}/${file}`;
        const fileContent = await import(filePath);
        if(!fileContent)
            break;
        storeCallback(fileContent);
    };
};

export const eventParserController = (client: deedClient, fileContent: TEvent) => {
    const {
        default: callback,
        eventInfo
    } = fileContent;
    if (!eventInfo.enabled)
        return;
    if (eventInfo.once) {
        client.once(eventInfo.name, callback);
        return;
    }
    client.on(eventInfo.name, callback);
};

export const commandParserController = (client: deedClient, fileContent: TCommand) => {
    const {
        commandInfo
    } = fileContent;
    if (!fileContent.commandInfo || !fileContent.commandInfo.enabled)
        return;
    client.commandsList.push(commandInfo.name);
    client.commands.set(fileContent.commandInfo.name, fileContent);
    return fileContent.commandInfo;
};