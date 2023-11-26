import { ChatInputCommandInteraction, TextChannel } from "discord.js";
import deedClient from "../classes/deedClient";
import { createAvatarUploader } from "../utils/helpers/helpers";
import { TCommandInfo } from "../types";

export default async function callBack(
    client: deedClient,
    interaction: ChatInputCommandInteraction
) {
    const avatarManager = createAvatarUploader();
    await (interaction.channel as TextChannel).send({
        ...avatarManager
    });
    await interaction.reply({
        ephemeral: true,
        content: 'Dispatched Successfully'
    });
};

export const commandInfo: TCommandInfo = {
    name: 'updateavatar',
    description: 'Update Avatar if it`s outdated',
    enabled: true,
    admin: true
};