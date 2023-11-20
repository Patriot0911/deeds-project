import deedClient from '../classes/deedClient';
import { TEventInfo } from '../types';
import {
    Events
} from 'discord.js';

export const eventInfo: TEventInfo = {
    name: Events.ClientReady,
    once: true,
    enabled: true
};

export default async function callBack(
    client: deedClient
) {
    console.clear();
    console.log(`[${client.user?.username}] is ready to battle!`);
};