import { ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuInteraction } from "discord.js";
import deedClient from "../classes/deedClient";
import { TButtonInfo } from "../types";

export const info: TButtonInfo = {
    name: 'deeds'
};

export default async function callBack(
    client: deedClient,
    interaction: StringSelectMenuInteraction
) {
    const customIdArgs = interaction.customId.split('|');
    const userId = customIdArgs[1];
    if(customIdArgs[2] !== interaction.user.id) {
        await interaction.reply({
            ephemeral: true,
            content: 'It`s not your manager!'
        });
        return;
    };
    const buttonsRow = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
        new ButtonBuilder({
            custom_id: `deeds|${interaction.values[0]}|${userId}`,
            style: ButtonStyle.Success,
            label: 'Increase',
            emoji: '✔️'
        })
    );
    await interaction.reply({
        ephemeral: true,
        components: [buttonsRow]
    });
};