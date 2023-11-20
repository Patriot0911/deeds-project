import { EmbedBuilder, TextChannel, User } from 'discord.js';
import { EventEmitter } from 'events';
import deedClient from '../classes/deedClient';
import 'dotenv/config';

export const progressEvents = new EventEmitter();

const LOGCHANNELID = '1175178288105259018';

progressEvents.on('progressIncreased', async (user: User, client: deedClient, deedName: string) => {
    const channel = client.channels.cache.get(LOGCHANNELID) as TextChannel;
    const embed = new EmbedBuilder()
        .setTitle('Progress Increased!')
        .setDescription(`**${user} increased his _\`\`${deedName}\`\`_ progress!**`)
        .setColor('#75f542')
        .setTimestamp();
    await channel.send({
        embeds: [embed]
    });
});