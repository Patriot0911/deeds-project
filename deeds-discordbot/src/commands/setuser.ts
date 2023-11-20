import { ApplicationCommandOptionType, ChatInputCommandInteraction, User } from "discord.js";
import deedClient from "../classes/deedClient";
import { getMysqlConnection } from "../utils/helpers/mysql-helpers";
import { TCommandInfo } from "../types";

export default async function callBack(
    client: deedClient,
    interaction: ChatInputCommandInteraction
) {
    const options = interaction.options;
    const user = options.getUser('user');

    if(!user || !interaction.guild)
        return;
    const connection = await getMysqlConnection();
    const [rawUsersId] = await connection.execute(`
        Select id From deedsdb.users Where (discordId = ${options.getUser('user')!.id});
    `);
    const userId = (rawUsersId as User[])[0].id;
    await connection.execute(`
        Update deedsdb.users_progressions
        SET progress = ${options.getNumber('value')}
        Where (deedId = ${options.getNumber('deedid')} AND userId = ${userId});
    `);
    connection.end();
    await interaction.reply({
        ephemeral: true,
        content: 'Succesfully!'
    });
};

export const commandInfo: TCommandInfo = {
    name: 'setuser',
    description: 'add user to deed`s db',
    enabled: true,
    admin: true,
    options: [
        {
            name: 'user',
            description: 'User',
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: 'deedid',
            description: 'Deed`s Id number',
            type: ApplicationCommandOptionType.Number,
            required: true
        },
        {
            name: 'value',
            description: 'Value to set',
            type: ApplicationCommandOptionType.Number,
            required: true
        }
    ]
};