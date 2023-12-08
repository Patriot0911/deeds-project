import { ApplicationCommandOptionType, ChatInputCommandInteraction } from "discord.js";
import deedClient from "../classes/deedClient";
import { pool } from "../utils/helpers/mysql-helpers";
import { TCommandInfo } from "../types";

export default async function callBack(
    client: deedClient,
    interaction: ChatInputCommandInteraction
) {
    const options = interaction.options;
    await pool.execute(`
        Delete From deedsdb.users_progressions Where deedId = ${options.getNumber('deedid')};
    `);
    await pool.execute(`
        Delete From deedsdb.deeds Where id = ${options.getNumber('deedid')};
    `);

    await interaction.reply({
        ephemeral: true,
        content: 'Successfully'
    });
};

export const commandInfo: TCommandInfo = {
    name: 'removedeed',
    description: 'Remove deed',
    enabled: true,
    admin: true,
    options: [
        {
            name: 'deedid',
            description: 'Display deed name',
            type: ApplicationCommandOptionType.Number,
            required: true
        }
    ]
};