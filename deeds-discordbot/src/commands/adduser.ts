import { ApplicationCommandOptionType, ChatInputCommandInteraction } from "discord.js";
import { createMySQLDeedsUser, deleteMySQLUsers, getMySQLUsers, getMysqlConnection } from "../utils/helpers/mysql-helpers";
import deedClient from "../classes/deedClient";
import { createDeedsManager } from "../utils/helpers/helpers";
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
    const selectedUsers = await getMySQLUsers(
        {
            discordId: user.id
        }
    );
    if(selectedUsers && selectedUsers.length > 0) {
        if(options.getBoolean('deletable')) {
            await deleteMySQLUsers(user.id);
        } else {
            await interaction.reply({
                ephemeral: true,
                content: 'This user is already in db'
            });
            await connection.end();
            return;
        }
    };
    const userMember = interaction.guild.members.cache.get(user.id);
    if(!userMember)
        return;
    const userData = await createMySQLDeedsUser(userMember);
    if(!userData)
        return;
    const userManager = await createDeedsManager(user, userData.insertId);
    await connection.end();
    if(userManager) {
        await interaction.channel?.send({
            ...userManager
        });
        await interaction.reply({
            ephemeral: true,
            content: 'Succesfully!'
        });
        return;
    };
    await interaction.reply({
        ephemeral: true,
        content: 'Deeds Error'
    });
};

export const commandInfo: TCommandInfo = {
    name: 'adduser',
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
            name: 'deletable',
            description: 'Delete if exists',
            type: ApplicationCommandOptionType.Boolean,
            required: false
        }
    ]
};