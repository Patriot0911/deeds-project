import {  ButtonInteraction } from "discord.js";
import deedClient from "../classes/deedClient";
import { TButtonInfo } from "../types";
import { getMySQLUsers, updateMySQLUserAvatar } from "../utils/helpers/mysql-helpers";

export const info: TButtonInfo = {
    name: 'updateavatar'
};

export default async function callBack(
    client: deedClient,
    interaction: ButtonInteraction
) {
    const target = interaction.user;
    const UsersData = await getMySQLUsers({
        discordId: target.id
    });
    if(!UsersData || UsersData.length < 1)
        return await interaction.reply({
            ephemeral: true,
            content: 'User was not found'
        });
    await updateMySQLUserAvatar(target);
    await interaction.reply({
        ephemeral: true,
        content: 'Request sent successfully'
    });
};