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
    let args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
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