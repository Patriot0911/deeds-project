import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    GatewayIntentBits,
    GuildMember,
    MessageActionRowComponentBuilder,
    MessageComponentInteraction,
    PermissionsBitField,
    StringSelectMenuBuilder,
    User
} from "discord.js";
import { getMySQLDeeds } from "./mysql-helpers";
import { IDeed } from "../../types";

export const botIntents: GatewayIntentBits[] = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.AutoModerationConfiguration,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.GuildWebhooks
];

export const isAdmin = (member: GuildMember) =>
    member.permissions.has(PermissionsBitField.Flags.Administrator);
export const getAvatar = (user: User) =>
`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;

export const updateComponent = (
    interaction: MessageComponentInteraction,
    updateFunc: (component: MessageActionRowComponentBuilder) => MessageActionRowComponentBuilder,
    customId?: string
) => {
    const indices = findComponentIndices(interaction, customId ? customId : interaction.customId);
    if (!indices)
        return [];
    const components = interaction.message.components;
    const actionRows = components.map(row => ActionRowBuilder.from(row));
    updateFunc(actionRows[indices.rowIndex].components[indices.componentIndex] as ButtonBuilder);
    return actionRows as ActionRowBuilder<MessageActionRowComponentBuilder>[];
};
export const findComponentIndices = (interaction: MessageComponentInteraction, customId: string) => {
    const components = interaction.message.components;
    for (let rowIndex = 0; rowIndex < components.length; ++rowIndex) {
        const componentsRow = components[rowIndex].components;
        const componentIndex = componentsRow.map((item, id) => {
            if(item.customId == customId)
                return id;
        })[0];
        if(componentIndex == undefined)
            continue;
        return {
            rowIndex,
            componentIndex
        };
    }
    return undefined;
};

export const createAvatarUploader = () => {
    const updateEmbed = new EmbedBuilder()
    .setTitle('Avatar Updater')
    .setDescription('Press the button under this message to upload your new avatar into DataBase')
    .setColor(`#4287f5`)
    const avatarUpdateButtonRow = new ActionRowBuilder<ButtonBuilder>();
    avatarUpdateButtonRow.addComponents(
        new ButtonBuilder(
            {
                style: ButtonStyle.Success,
                label: 'Update Avatar',
                emoji: '⬆️',
                customId: 'updateavatar'
            }
        )
    );
    return {
        embeds: [updateEmbed],
        components: [avatarUpdateButtonRow]
    }
};

export const createDeedsManager = async (user: User, userId: number) => {
    const deedsList = await getMySQLDeeds();
    if(!deedsList)
        return;
    const userEmbed = new EmbedBuilder()
    .setTitle('Deeds Manager')
    .setColor('#4287f5')
    .setDescription(`${user}, use selector to manage deeds`)
    const deedsSelectRow = new ActionRowBuilder<StringSelectMenuBuilder>();
    deedsSelectRow.addComponents(getDeedsSelector(userId, user.id, deedsList))
    return {
        embeds: [userEmbed],
        components: [deedsSelectRow]
    };
};

const getDeedsSelector = (userId: number, discordUserId: string, deeds: IDeed[]) => {
    const deedsSelector = new StringSelectMenuBuilder()
    .setCustomId(`deeds|${userId}|${discordUserId}`)
    .setPlaceholder('Choose a deed')
    .setOptions(
        deeds.map(deed => ({
            label: deed.deedName,
            value: deed.id.toString()
        }))
    );
    return deedsSelector;
};