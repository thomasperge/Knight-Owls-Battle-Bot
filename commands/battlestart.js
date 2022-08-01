const BATTLE = require('../modules/battle.js');
const PLAYER = require('../modules/player.js');
const { bold, inlineCode, userMention, codeBlock, ButtonBuilder, EmbedBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    var user = message.author

    var battle = await BATTLE.findOne({ battleCreatorID : user.id })
    if(!battle) return message.reply(`${inlineCode("🪧")} No battle has been created...`)


    function randomUserTaken(){
        var allPlayerTaken = []
        var maxPlayer = battle.maxUser
        var count = 1
        while(count <= maxPlayer){
            var randomUser = Math.floor(Math.random() * battle.battleMember.length)
            // == Si player are already taken ==
            if(allPlayerTaken.includes(battle.battleMember[randomUser])){
                count += 1
            } else {
                if(battle.battleMember[randomUser] != undefined){
                    allPlayerTaken.push(`${battle.battleMember[randomUser]}`)
                    count += 1
                } else count += 1
            };
        };
        return allPlayerTaken
    };

    // == Initializ All Member Array from randomUserTaken() ==
    var allMember = randomUserTaken()


    // == Verif if user taken is an Player ==
    for(const userArray of allMember){
        var player = await PLAYER.findOne({ userId : userArray })
        if(!player){
            allMember.splice(allMember.indexOf(userArray), 1);
        };
    };

    // == Display / Mention : All Player & Stats Player ==
    var allPlayerAccept = ``
    var statsPlayer = ``
    var allOwl = []

    for(const user of allMember){
        allPlayerAccept += `<@${user}> `
        var stats = ``

        var player = await PLAYER.findOne({ userId : user })
        var owlAmout = 0

        if(player.slot.owl1.hashtagNumber != -1) owlAmout += 1
        if(player.slot.owl2.hashtagNumber != -1) owlAmout += 1
        if(player.slot.owl3.hashtagNumber != -1) owlAmout += 1
        if(player.slot.owl4.hashtagNumber != -1) owlAmout += 1
        if(player.slot.owl5.hashtagNumber != -1) owlAmout += 1

        var randomOwl = Math.floor(Math.random() * owlAmout ) + 1

        if(owlAmout == 0 || randomOwl == 0) stats = `**No Knight Owl**`
        if(randomOwl == 1) {
            stats = `**Knight Owl #${player.slot.owl1.hashtagNumber}**`
            allOwl.push({hashtag: player.slot.owl1.hashtagNumber, attack: player.slot.owl1.attack, defense: player.slot.owl1.defense, health: player.slot.owl1.health})
        };
        if(randomOwl == 2) {
            stats = `**Knight Owl #${player.slot.owl2.hashtagNumber}**`
            allOwl.push({hashtag: player.slot.owl2.hashtagNumber, attack: player.slot.owl2.attack, defense: player.slot.owl2.defense, health: player.slot.owl2.health})
        };
        if(randomOwl == 3) {
            stats = `**Knight Owl #${player.slot.owl3.hashtagNumber}**`
            allOwl.push({hashtag: player.slot.owl3.hashtagNumber, attack: player.slot.owl3.attack, defense: player.slot.owl3.defense, health: player.slot.owl3.health})
        };
        if(randomOwl == 4) {
            stats = `**Knight Owl #${player.slot.owl4.hashtagNumber}**`
            allOwl.push({hashtag: player.slot.owl4.hashtagNumber, attack: player.slot.owl4.attack, defense: player.slot.owl4.defense, health: player.slot.owl4.health})
        };
        if(randomOwl >= 5) {
            stats = `**Knight Owl #${player.slot.owl5.hashtagNumber}**`
            allOwl.push({hashtag: player.slot.owl5.hashtagNumber, attack: player.slot.owl5.attack, defense: player.slot.owl5.defense, health: player.slot.owl5.health})
        };


        statsPlayer += `<@${user}> with ${stats}\n`
    };

    // == Initial Embed ==
    var initialEmbed = new MessageEmbed()
        .setColor('#e6b70d')
        .setTitle(`🏹 Battle by ${user.username.toUpperCase()}`)
        .setDescription(`${allPlayerAccept} have been chosen !\n${inlineCode("🪧")} Stand at the ready !\n\n${statsPlayer}`)
        .setTimestamp();


    async function battleFunction(initialEmbed, allBoss, allOwl){
        // == Display First Waiting screen Embed ==
        var allBossDisplay = ``

        if(allBoss.eagle > 0) {
            allBossDisplay += `**x${allBoss.eagle} Eagle** - ${inlineCode("🔥")} 8 - ${11 * allBoss.eagle} ,${inlineCode("🛡️")} 1 - ${3 * allBoss.eagle} ,${inlineCode("❤️")} 8 - ${16 * allBoss.eagle} \n`
        }
        if(allBoss.eagleCaptain > 0) {
            allBossDisplay += `**x${allBoss.eagleCaptain} Eagle Captain** - ${inlineCode("🔥")} 10 - ${14 * allBoss.eagleCaptain} ,${inlineCode("🛡️")} 3 - ${6 * allBoss.eagleCaptain} ,${inlineCode("❤️")} 15 - ${22 * allBoss.eagleCaptain} \n`
        }
        if(allBoss.eagleKing > 0) {
            allBossDisplay += `**x${allBoss.eagleKing} Eagle King** - ${inlineCode("🔥")} 14 - ${19 * allBoss.eagleKing} ,${inlineCode("🛡️")} 6 - ${9 * allBoss.eagleKing} ,${inlineCode("❤️")} 21 - ${27 * allBoss.eagleKing} \n`
        }
        if(allBoss.eagleGod > 0) {
            allBossDisplay += `**x${allBoss.eagleGod} Eagle God** - ${inlineCode("🔥")} 17 - ${25 * allBoss.eagleGod} ,${inlineCode("🛡️")} 8 - ${15 * allBoss.eagleGod} ,${inlineCode("❤️")} 26 - ${37 * allBoss.eagleGod} \n`
        }

        // == Embed edit after 7s ==
        var embed2 = new MessageEmbed()
            .setColor('#9f5fff')
            .setTitle(`⌛ Starting the battle in 10 seconds...`)
            .setDescription(`${allBossDisplay}`)
            .setTimestamp();

        const oldEmbed = initialEmbed;
        const messageHandle = await message.channel.send({embeds: [oldEmbed]});
        const newEmbed = embed2;


        setTimeout(function(){ 
            messageHandle.edit({embeds:[newEmbed]});
        }, 2500);

    }


    battleFunction(initialEmbed, battle.ennemi, allOwl)
    
};

module.exports.info = {
    names: ['battlestart', 'battles', 'bs', 'startbattle'],
};
