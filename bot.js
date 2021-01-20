const { Client, MessageEmbed } = require('discord.js');
const config = require("./config.json");
const texts = require("./texts.json");
const client = new Client();
let embed = null;

client.on('ready', () => {
    console.log(`Active (${client.user.tag})`);
});

client.on('message', message => {
    if (!message.guild) return; //no commands in DMs
    if (message.author.bot) return; //dont react to other bot's messages
    let args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cntnt = message.content.slice(config.prefix.length).slice(command.length).trim();
    let isMod = message.member.roles.cache.has(config.modID); //check if the user has a moderator role

    //commands
    if (command === "dobrodosli" && isMod) {
        message.delete();
        embed = new MessageEmbed()
            .setThumbnail(config.icon)
            .setTitle(texts.dobrodosli.title)
            .setDescription(texts.dobrodosli.description)
            .setColor(config.color);
        message.channel.send(embed);
    }

    if (command === "aplikacija" && isMod) {
        message.delete();
        embed = new MessageEmbed()
            .setThumbnail(config.icon)
            .setTitle(texts.aplikacija.title)
            .setDescription(texts.aplikacija.description)
            .setColor(config.color);
        message.channel.send(embed);
    }

    if (command === "pravila" && isMod) {
        message.delete();
        embed = new MessageEmbed()
            .setThumbnail(config.icon)
            .setTitle(texts.pravila.title)
            .setDescription(texts.pravila.description)
            .setFooter(texts.pravila.footer)
            .setColor(config.color);
        message.channel.send(embed);
    }

    if (command === "role" && isMod) {
        message.delete();
        embed = new MessageEmbed()
            .setThumbnail(config.icon)
            .setTitle(texts.role.title)
            .setDescription(texts.role.description)
            .setColor(config.color);
        message.channel.send(embed);
    }

    if (command === "media" && isMod) {
        message.delete();
        embed = new MessageEmbed()
            .setThumbnail(texts.media.twitch.icon)
            .setTitle(texts.media.twitch.title)
            .setDescription(texts.media.twitch.description)
            .setURL(texts.media.twitch.url)
            .setColor(texts.media.twitch.color);
        message.channel.send(embed);
        embed = new MessageEmbed()
            .setThumbnail(texts.media.instagram.icon)
            .setTitle(texts.media.instagram.title)
            .setDescription(texts.media.instagram.description)
            .setURL(texts.media.instagram.url)
            .setColor(texts.media.instagram.color);
        message.channel.send(embed);
        embed = new MessageEmbed()
            .setThumbnail(texts.media.youtube.icon)
            .setTitle(texts.media.youtube.title)
            .setDescription(texts.media.youtube.description)
            .setURL(texts.media.youtube.url)
            .setColor(texts.media.youtube.color);
        message.channel.send(embed);
        embed = new MessageEmbed()
            .setThumbnail(texts.media.challengermode.icon)
            .setTitle(texts.media.challengermode.title)
            .setDescription(texts.media.challengermode.description)
            .setURL(texts.media.challengermode.url)
            .setColor(texts.media.challengermode.color);
        message.channel.send(embed);
        embed = new MessageEmbed()
            .setThumbnail(texts.media.trovo.icon)
            .setTitle(texts.media.trovo.title)
            .setDescription(texts.media.trovo.description)
            .setURL(texts.media.trovo.url)
            .setColor(texts.media.trovo.color);
        message.channel.send(embed);
    }

    if (command === "embed" && isMod) {
        const channeltxt = cntnt.split(" ");
        const channel = message.member.guild.channels.cache.get(channeltxt[0].slice(2, 20));
        const embedtxt = cntnt.slice(channeltxt[0].length);
        embed = JSON.parse(embedtxt);
        channel.send({ embed: embed });
    }

    //eval part for the developer to test code from discord
    function clean(text) {
        if (typeof (text) === "string")
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;
    }

    if (command === "eval" && message.author.id === config.ownerID) {
        try {
            const code = args.join(" ");
            let evaled = eval(code);

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

            message.channel.send(clean(evaled), { code: "xl" });
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    }
});

client.login(config.token);