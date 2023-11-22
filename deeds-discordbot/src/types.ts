import discord, {
    AnySelectMenuInteraction,
    ApplicationCommandOptionType,
    ButtonInteraction,
    ClientOptions,
    Interaction
} from 'discord.js';
import deedClient from './classes/deedClient';


export interface IDeedProgress {
    id: number;
    deedId: number;
    userId: number;
    progress: number;
};
export interface IDeed {
    id: number;
    deedName: string;
    goal: number;
};
export interface IUser {
    id: number;
    discordId: string;
    username: string;
    avatar: string;
};

export type TEventInfo = {
    name: string,
    once: boolean,
    enabled: boolean
};
export type TEvent = {
    eventInfo: TEventInfo;
    default: (client: deedClient, ...args: any[]) => void;
};

export type TCommandInfo = {
    name: string;
    description: string;
    enabled: boolean;
    admin?: boolean;
    options?: ICommandOptions[];
};
export type TCommand = {
    commandInfo: TCommandInfo;
    default: (client: deedClient, interaction: Interaction) => void;
};

export interface TButtonInfo {
    name: string;
};
export interface TButton {
    info: TButtonInfo;
    default: (client: deedClient, interaction: ButtonInteraction, ...args: any[]) => void;
}

export interface TSelectorInfo {
    name: string;
};
export interface TSelector {
    info: TSelectorInfo;
    default: (client: deedClient, interaction: AnySelectMenuInteraction, ...args: any[]) => void;
};

export interface ICommandPayload {
    name: string;
    description: string;
    options?: ICommandOptions[];
};
export interface ICommandOptions {
    name: string;
    description: string;
    type: ApplicationCommandOptionType;
    required: boolean,
    choices?: ICommandChoices[];
};
export interface ICommandChoices {
    name: string;
    value: string;
};

export interface IChannelsInfo {
    msgLogs: string;
    userLogs: string;
};

export type TCustomClientProps =  ClientOptions;

export interface IMySQLSearchParams {
    discordId?: string;
    userId?: number;
};
export interface progressCountData {
    old: number;
    new: number;
};

export type TMessageEventInfo = discord.Message | discord.PartialMessage;
export type TMemberEventInfo = discord.GuildMember | discord.PartialGuildMember;
