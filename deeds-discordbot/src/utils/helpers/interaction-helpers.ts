import { Interaction, GuildMember } from "discord.js";
import { isAdmin } from "./helpers";
import { TCommand } from "../../types";

export const replyPermissionError = async  (interaction: Interaction): Promise<void> => {
    if(interaction.isRepliable()) {
        await interaction.reply({
            content: '> Permission Error!\n > This action requieres Admin`s permission.',
            ephemeral: true
        });
    }
};
export const replyActionError = async (interaction: Interaction): Promise<void> => {
    if(interaction.isRepliable()) {
        await interaction.reply({
            content: '> Action Error!\n > For more information, contact an administrator',
            ephemeral: true
        });
    }
};
export const checkAdmin = (commandData: TCommand, interaction: Interaction): boolean | undefined =>
commandData.commandInfo.admin && !isAdmin(interaction.member as GuildMember);
