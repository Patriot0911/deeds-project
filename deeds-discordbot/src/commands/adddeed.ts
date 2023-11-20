import { ApplicationCommandOptionType, ChatInputCommandInteraction } from "discord.js";
import deedClient from "../classes/deedClient";
import { createMySQLDeed, getMySQLUsers, getMysqlConnection } from "../utils/helpers/mysql-helpers";
import { IUser, TCommandInfo } from "../types";

export default async function callBack(
    client: deedClient,
    interaction: ChatInputCommandInteraction
) {
    const options = interaction.options;
    const deedName = options.getString('deedname');
    const deedGoal = options.getNumber('goal');
    if(!deedName || !deedGoal)
        return;
    const connection = await getMysqlConnection();
    const deedData = await createMySQLDeed(deedName, deedGoal);
    const usersData = await getMySQLUsers();
    if(usersData.length > 0) {
        const usersValues = geNewUserValues(usersData, deedData.insertId);
        await connection.execute(`
            Insert into deedsdb.users_progressions (deedId, userId, progress)
                Values ${usersValues}
        `);
    };
    await connection.end();
    await interaction.reply({
        ephemeral: true,
        content: 'Successfully'
    });
};

export const commandInfo: TCommandInfo = {
    name: 'adddeed',
    description: 'Add deed',
    enabled: true,
    admin: true,
    options: [
        {
            name: 'deedname',
            description: 'Display deed name',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'goal',
            description: 'Deed`s Goal',
            type: ApplicationCommandOptionType.Number,
            required: true
        }
    ]
};

const geNewUserValues = (usersList: IUser[], deedId: number, oldDeedsValue = '', index = 0): any => {
    if(index == usersList.length)
        return oldDeedsValue;
    const deedsValue = oldDeedsValue + `
        ( ${deedId}, ${usersList[index].id}, 0 )${index === usersList.length-1 ? ';' : ','}
    `;
    return geNewUserValues(usersList, deedId, deedsValue, index+1);
};