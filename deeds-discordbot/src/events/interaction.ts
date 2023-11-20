import { interactionsList } from '../utils/interaction-callbacks';
import deedClient from '../classes/deedClient';
import { TEventInfo } from '../types';
import {
    Events,
    Interaction
} from 'discord.js';

export const eventInfo: TEventInfo = {
    name: Events.InteractionCreate,
    once: false,
    enabled: true
};

export default async function callBack(
    interaction: Interaction
) {
    if(!interaction || !interaction.member)
        return;
    const client = interaction.client as deedClient;
    if(!Object.keys(interactionsList).includes(interaction.type.toString()))
        return;
    interactionsList[interaction.type as keyof typeof interactionsList](interaction as any, client);
};
