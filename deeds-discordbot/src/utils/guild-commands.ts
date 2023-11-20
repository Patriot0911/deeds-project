import { REST, Routes } from "discord.js";
import { ICommandPayload } from "../types";

export default async function postGuildCommands(commands: ICommandPayload[]) {
    const rest = new REST().setToken(process.env.TOKEN!);
    try {
        const data = await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENTID as string,
                process.env.GUILDID as string
            ),
            {
                body: commands
            }
        );
        return data;
    } catch (err) {
        console.log(err);
        return undefined;
    }
};