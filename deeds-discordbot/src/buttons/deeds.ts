import {  ButtonInteraction } from "discord.js";
import deedClient from "../classes/deedClient";
import { IDeed, TButtonInfo } from "../types";
import { getMySQLDeedProgress, getMySQLDeeds, getMysqlConnection, updateMySQLUserProgress } from "../utils/helpers/mysql-helpers";
import { progressEvents } from "../utils/progress-event";

export const info: TButtonInfo = {
    name: 'deeds'
};

export default async function callBack(
    client: deedClient,
    interaction: ButtonInteraction
) {
    const [, deedId, userId] = interaction.customId.split('|');
    const incrementCount = 1;

    const deedData = await getMySQLDeeds(deedId);
    if(!deedData) {
        await interaction.reply({
            ephemeral: true,
            content: 'Not valid Deed Id'
        });
        return;
    };
    const deedProgress = await getMySQLDeedProgress(userId, deedId);
    if(!deedProgress) {
        await interaction.reply({
            ephemeral: true,
            content: 'Something went wrong. No User Progress found.'
        });
        return;
    };
    if(deedProgress.progress >= deedData[0].goal) {
        await interaction.reply({
            ephemeral: true,
            content: 'You have already reached the goal'
        });
        if(deedProgress.progress > deedData[0].goal) {
            await updateMySQLUserProgress(userId, deedId, deedData[0].goal);
        };
        return;
    };
    await updateMySQLUserProgress(userId, deedId, incrementCount, true);
    progressEvents.emit(
        'progressIncreased',
        interaction.user,
        client,
        deedData[0].deedName,
        {
            old: deedProgress.progress,
            new: deedProgress.progress + incrementCount
        }
    );
    await interaction.reply({
        ephemeral: true,
        content: 'Successfully!'
    });
};