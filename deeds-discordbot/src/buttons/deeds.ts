import {  ButtonInteraction } from "discord.js";
import deedClient from "../classes/deedClient";
import { IDeed, TButtonInfo } from "../types";
import { getMysqlConnection } from "../utils/helpers/mysql-helpers";
import { progressEvents } from "../utils/progress-event";

export const info: TButtonInfo = {
    name: 'deeds'
};

export default async function callBack(
    client: deedClient,
    interaction: ButtonInteraction
) {
    const [, deedId, userId] = interaction.customId.split('|');
    const connection = await getMysqlConnection();
    const IncrementCount = 1;

    const [rawDeedData] = await connection.execute(`
        Select deedName From deedsdb.deeds
        Where id = ${deedId};
    `);
    const deedData = (rawDeedData as IDeed[]);
    if(deedData.length < 1) {
        await interaction.reply({
            ephemeral: true,
            content: 'Not valid Deed Id'
        });
        await connection.end();
        return;
    };
    await connection.execute(`
        UPDATE deedsdb.users_progressions
        SET progress = progress + ${IncrementCount}
        WHERE (userId = ${userId} AND deedId = ${deedId})
    `);
    await connection.end();
    progressEvents.emit(
        'progressIncreased',
        interaction.user,
        client,
        deedData[0].deedName
    );
    await interaction.reply({
        ephemeral: true,
        content: 'Successfully!'
    });
};