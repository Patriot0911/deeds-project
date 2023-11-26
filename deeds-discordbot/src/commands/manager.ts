import { ApplicationCommandOptionType, ChatInputCommandInteraction, GuildMember } from "discord.js";
import { getMySQLUsers } from "../utils/helpers/mysql-helpers";
import deedClient from "../classes/deedClient";
import { createDeedsManager, isAdmin } from "../utils/helpers/helpers";
import { TCommandInfo } from "../types";

export default async function callBack(
    client: deedClient,
    interaction: ChatInputCommandInteraction
) {
    const options = interaction.options;
    const user = options.getUser('user');

    if(user && !isAdmin(interaction.member as GuildMember))
        return await interaction.reply({
            ephemeral: true,
            content: 'You can`t dispatch this manager (Is not owner)'
        });
    const target = user ? user : interaction.user;
    const usersData = await getMySQLUsers({
        discordId: target.id
    });
    if(!usersData || usersData.length < 1)
        return await interaction.reply({
            ephemeral: true,
            content: 'User data Error'
        });
    const userManager = await createDeedsManager(target, usersData[0].id);
    if(userManager) {
        await interaction.channel?.send({
            ...userManager
        });
        return await interaction.reply({
            ephemeral: true,
            content: 'Succesfully!'
        });
    };
    return await interaction.reply({
        ephemeral: true,
        content: 'Deeds Error'
    });
};

export const commandInfo: TCommandInfo = {
    name: 'manager',
    description: 'Dispatch user`s manager',
    enabled: true,
    admin: false,
    options: [
        {
            name: 'user',
            description: 'User',
            type: ApplicationCommandOptionType.User,
            required: false
        }
    ]
};