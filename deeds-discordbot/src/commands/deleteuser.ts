import { ApplicationCommandOptionType, ChatInputCommandInteraction } from "discord.js";
import { deleteMySQLUsers, getMySQLUsers } from "../utils/helpers/mysql-helpers";
import deedClient from "../classes/deedClient";
import { TCommandInfo } from "../types";

export default async function callBack(
    client: deedClient,
    interaction: ChatInputCommandInteraction
) {
    const options = interaction.options;
    const user = options.getUser('user');

    if(!user || !interaction.guild)
        return;
    const selectedUsers = await getMySQLUsers(
        {
            discordId: user.id
        }
    );
    if(!selectedUsers || selectedUsers.length < 1)
        return await interaction.reply({
            ephemeral: true,
            content: 'User not found'
        });
    await deleteMySQLUsers(user.id);
    await interaction.reply({
        ephemeral: true,
        content: 'User deleted successfully :heart:'
    });
};

export const commandInfo: TCommandInfo = {
    name: 'deleteuser',
    description: 'delete user from db',
    enabled: true,
    admin: true,
    options: [
        {
            name: 'user',
            description: 'User',
            type: ApplicationCommandOptionType.User,
            required: true
        }
    ]
};