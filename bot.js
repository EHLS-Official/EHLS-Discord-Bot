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
    if (message.content.substring(0, config.prefix.length) !== config.prefix) return; //match the prefix
    let args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cntnt = message.content.slice(config.prefix.length).slice(command.length).trim();
    let isMod = message.member.roles.cache.has(config.modID); //check if the user has a moderator role

    //commands
    if (command === "help" && isMod) {
        embed = new MessageEmbed()
            .setThumbnail(config.icon)
            .setTitle(texts.help.title)
            .setDescription(texts.help.description)
            .setColor(config.color);
        message.channel.send(embed);
    }

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

    if (command === "donacije" && isMod) {
        message.delete();
        embed = new MessageEmbed()
            .setTitle(texts.donacije.title)
            .setDescription(texts.donacije.description)
            .setColor(config.color);
        message.channel.send(embed);
    }

    if (command === "media" && isMod) {
        message.delete();
        const medias = ["youtube", "twitter", "facebook", "instagram", "challengermode"];
        medias.forEach(m => {
            embed = new MessageEmbed()
                .setThumbnail(eval(`texts.media.${m}.icon`))
                .setTitle(eval(`texts.media.${m}.title`))
                .setDescription(eval(`texts.media.${m}.description`))
                .setURL(eval(`texts.media.${m}.url`))
                .setColor(eval(`texts.media.${m}.color`));
            message.channel.send(embed);
        });
    }

    if (command === "oturniru" && isMod) {
        message.delete();
        const embeds = ["first", "second", "third", "fourth", "fifth", "sixth"];
        embeds.forEach(m => {
            embed = new MessageEmbed()
                .setTitle(eval(`texts.oturniru.${m}.title`))
                .setDescription(eval(`texts.oturniru.${m}.description`))
                .setColor(config.color);
            message.channel.send(embed);
        });
    }

    if (command === "embed" && isMod) {
        const channeltxt = cntnt.split(" ");
        const channel = message.member.guild.channels.cache.get(channeltxt[0].slice(2, 20));
        const embedtxt = cntnt.slice(channeltxt[0].length);
        embed = JSON.parse(embedtxt);
        channel.send({ embed: embed });
    }

    if (command === "everyone" && isMod) {
        const channeltxt = cntnt.split(" ");
        const channel = message.member.guild.channels.cache.get(channeltxt[0].slice(2, 20));
        channel.send("@everyone");
    }

    if (command === "poll" && isMod) {
        embed = new MessageEmbed();
        message.delete().then(() => {
            message.channel.send(embed).then(e => {
                e.edit(embed
                    .setTitle(`Poll`)
                    .setColor('#00FF00')
                    .setDescription(message.content.slice(5)));
                e.react('👍').then(() => { e.react('👎') });
            });
        });
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