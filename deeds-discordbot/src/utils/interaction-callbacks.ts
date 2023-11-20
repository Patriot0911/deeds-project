import {
    ChatInputCommandInteraction,
    CacheType,
    AnySelectMenuInteraction,
    ButtonInteraction,
    ComponentType,
    MessageComponentInteraction,
    InteractionType
} from 'discord.js';
import deedClient from "../classes/deedClient";
import * as interTools from './helpers/interaction-helpers';

const interactionCommandCallback = async (interaction: ChatInputCommandInteraction<CacheType>, client: deedClient) => {
    const commandData = client.getCommand(interaction.commandName);
    if(!client.commandsList.includes(interaction.commandName) || !commandData) {
        console.log(`[Interaction] No Command Found [${interaction.commandName}]`);
        await interTools.replyActionError(interaction);
        return;
    }
    if(interTools.checkAdmin(commandData, interaction)) {
        await interTools.replyPermissionError(interaction);
        return;
    }
    if(!interaction)
        return;
    commandData.default(client, interaction);
};
const interactionButtonCallback = async (interaction: ButtonInteraction, client: deedClient) => {
    const iData = interaction.customId.split('|');
    const buttonsCallback = client.buttons.get(iData[0]);
    if(!buttonsCallback) {
        await interTools.replyActionError(interaction);
        return;
    }
    if(!interaction)
        return;
    buttonsCallback.default(client, interaction);
};
const getComponentInteraction = (interaction: MessageComponentInteraction<CacheType>, client: deedClient) => {
    const componentType = interaction.isAnySelectMenu() ? ComponentType.StringSelect : interaction.componentType;
    if(!Object.keys(interactionsComponentsList).includes(componentType.toString()))
        return;
    const componentListType = componentType as keyof typeof interactionsComponentsList;
    const callBack = interactionsComponentsList[componentListType];
    callBack(interaction as any, client);
};
const interactionSelectorCallback = async (interaction: AnySelectMenuInteraction, client: deedClient) => {
    const iData = interaction.customId.split('|');
    const selectorCallback = client.selectors.get(iData[0]);
    if(!selectorCallback) {
        await interTools.replyActionError(interaction);
        return;
    }
    if(!interaction)
        return;
    selectorCallback.default(client, interaction);
};

const interactionsComponentsList = {
    [ComponentType.Button]: interactionButtonCallback,
    [ComponentType.StringSelect]: interactionSelectorCallback
};
export const interactionsList = {
    [InteractionType.ApplicationCommand]: interactionCommandCallback,
    [InteractionType.MessageComponent]: getComponentInteraction
};