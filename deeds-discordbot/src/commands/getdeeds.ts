import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import deedClient from "../classes/deedClient";
import { getMySQLDeeds } from "../utils/helpers/mysql-helpers";
import { IDeed, TCommandInfo } from "../types";

export default async function callBack(
    client: deedClient,
    interaction: ChatInputCommandInteraction
) {
    const selectedDeeds = await getMySQLDeeds();
    if(!selectedDeeds || selectedDeeds.length < 1) {
        await interaction.reply({
            ephemeral: true,
            content: 'No deeds detected'
        });
        return;
    };
    const deedsList = getDeedsListString(selectedDeeds);
    const deedsEmbed = new EmbedBuilder()
        .setTitle('Deeds List')
        .setColor('#4287f5')
        .setDescription(deedsList)
        .setTimestamp();
    await interaction.reply({
        ephemeral: true,
        embeds: [deedsEmbed]
    });
};

const getDeedsListString = (selectedDeeds: IDeed[], deedsList = '', index = 0): string => {
    if(selectedDeeds.length === index)
        return deedsList;
    const deed = selectedDeeds[index];
    const deedLine = `* [\`\`${deed.id}\`\`] **${deed.deedName}** | *Goal:* ${deed.goal}\n`;
    return getDeedsListString(selectedDeeds, deedsList + deedLine, index+1);
};

export const commandInfo: TCommandInfo = {
    name: 'getdeeds',
    description: 'Get all Deeds',
    enabled: true,
    admin: false
};