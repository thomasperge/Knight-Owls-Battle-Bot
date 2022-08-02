const BATTLE = require('../modules/battle.js');
const PLAYER = require('../modules/player.js');
const CONFIGCOOLDOWN = require('../config.json')
const { bold, inlineCode, userMention, codeBlock, underscore, ButtonBuilder, EmbedBuilder } = require('@discordjs/builders');
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
    console.log(allMember)

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

        var randomOwl = Math.floor(Math.random() * owlAmout )

        if(owlAmout == 0) stats = `**No Knight Owl**`
        if(owlAmout >= 1){
            if(randomOwl == 0) {
                stats = `**Knight Owl #${player.slot.owl1.hashtagNumber}**`
                allOwl.push({hashtag: player.slot.owl1.hashtagNumber, attack: player.slot.owl1.attack, defense: player.slot.owl1.defense, health: player.slot.owl1.health})
            };
            if(randomOwl == 1) {
                stats = `**Knight Owl #${player.slot.owl2.hashtagNumber}**`
                allOwl.push({hashtag: player.slot.owl2.hashtagNumber, attack: player.slot.owl2.attack, defense: player.slot.owl2.defense, health: player.slot.owl2.health})
            };
            if(randomOwl == 2) {
                stats = `**Knight Owl #${player.slot.owl3.hashtagNumber}**`
                allOwl.push({hashtag: player.slot.owl3.hashtagNumber, attack: player.slot.owl3.attack, defense: player.slot.owl3.defense, health: player.slot.owl3.health})
            };
            if(randomOwl == 3) {
                stats = `**Knight Owl #${player.slot.owl4.hashtagNumber}**`
                allOwl.push({hashtag: player.slot.owl4.hashtagNumber, attack: player.slot.owl4.attack, defense: player.slot.owl4.defense, health: player.slot.owl4.health})
            };
            if(randomOwl >= 4) {
                stats = `**Knight Owl #${player.slot.owl5.hashtagNumber}**`
                allOwl.push({hashtag: player.slot.owl5.hashtagNumber, attack: player.slot.owl5.attack, defense: player.slot.owl5.defense, health: player.slot.owl5.health})
            };
        };

        statsPlayer += `<@${user}> with ${stats}\n`
    };

    // ======== EMBED ROUND ========
    var initialEmbed = new MessageEmbed()
        .setColor('#99a8e0')
        .setTitle(`🏹 Battle by ${user.username.toUpperCase()}`)
        .setDescription(`${allPlayerAccept} have been chosen !\n\n${inlineCode("📊")} **List of Owls** :\n${statsPlayer}\n${inlineCode("🪧")} Stand at the ready !\n`)
        .setTimestamp();


    function defenseRound(roundNumber, message){
        var defenseEmbed = new MessageEmbed()
            .setColor('#1e4dff')
            .setTitle(`ROUND ${roundNumber} - Owls defend 🛡️`)
            .setDescription(`${message}`)
            .setTimestamp();
        return defenseEmbed
    };


    function attackRound(roundNumber, message){
        var attackEmbed = new MessageEmbed()
            .setColor('#e6b70d')
            .setTitle(`ROUND ${roundNumber} - Owls fight 🏹`)
            .setDescription(`${message}`)
            .setTimestamp();
        return attackEmbed
    };


    function statusRound(messageBoss, messageUser){
        var statusEmbed = new MessageEmbed()
            .setColor('#000000')
            .setTitle(`STATUS UPDATE ❤️`)
            .setDescription(`${inlineCode("📊")} **Boss Stats** :\n${messageBoss}\n${inlineCode("📊")} **Owl Stats** :\n${messageUser}`)
            .setTimestamp();
        return statusEmbed
    };

    // === Battle Player vs Boss === 
    // === Variable Declaration ===
    var allBossDisplay = ``
    var allBoss = battle.ennemi


    // === Function Stats Boss ===
    function bossStats(allBoss){
        var stats = []

        var eagleAttack = 0
        var eagleDefense = 0
        var eagleHealth = 0
        var eagleCAttack = 0
        var eagleCDefense = 0
        var eagleCHealth = 0
        var eagleKAttack = 0
        var eagleKDefense = 0
        var eagleKHealth = 0
        var eagleGAttack = 0
        var eagleGDefense = 0
        var eagleGHealth = 0

        for (let pas = 1; pas < allBoss.eagle + 1; pas++) {
            if(allBoss.eagle > 0){
                eagleAttack = Math.floor(Math.random() * 11 * allBoss.eagle) + 8
                eagleDefense = Math.floor(Math.random() * 3 * allBoss.eagle) + 1
                eagleHealth = Math.floor(Math.random() * 16 * allBoss.eagle) + 8
                stats.push({name: `Eagle ${pas}`, eagleNumber: pas, attack: eagleAttack, defense: eagleDefense, health: eagleHealth})
            };
        }
        
        for (let pas = 1; pas < allBoss.eagleCaptain + 1; pas++) {
            if(allBoss.eagleCaptain > 0){
                eagleCAttack = Math.floor(Math.random() * 14 * allBoss.eagle) + 10
                eagleCDefense = Math.floor(Math.random() * 6 * allBoss.eagle) + 3
                eagleCHealth = Math.floor(Math.random() * 22 * allBoss.eagle) + 15
                stats.push({name: `Eagle Captain ${pas}`, eagleCaptainNumber: pas, attack: eagleCAttack, defense: eagleCDefense, health: eagleCHealth})
            };
        }
        for (let pas = 1; pas < allBoss.eagleKing + 1; pas++) {
            if(allBoss.eagleKing > 0){
                eagleKAttack = Math.floor(Math.random() * 19 * allBoss.eagle) + 14
                eagleKDefense = Math.floor(Math.random() * 9 * allBoss.eagle) + 6
                eagleKHealth = Math.floor(Math.random() * 27 * allBoss.eagle) + 21
                stats.push({name: `King Eagle ${pas}`, eagleKingNumber: pas, attack: eagleKAttack, defense: eagleKDefense, health: eagleKHealth})
            };
        }
        for (let pas = 1; pas < allBoss.eagleGod + 1; pas++) {
            if(allBoss.eagleGod > 0){
                eagleGAttack = Math.floor(Math.random() * 25 * allBoss.eagle) + 17
                eagleGDefense = Math.floor(Math.random() * 15 * allBoss.eagle) + 8
                eagleGHealth = Math.floor(Math.random() * 37 * allBoss.eagle) + 26
                stats.push({name: `Eagle God ${pas}`, eagleGodNumber: pas, attack: eagleGAttack, defense: eagleGDefense, health: eagleGHealth})
            };
        }
        return stats
    }

    // <=== DISPLAY BOSS ===>
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
    
    var statsOwl = ``
    for(const owl of allOwl){
        if(owl.hashtag == -1){
            statsOwl += ``
        } else statsOwl += `**Knight Owl #${owl.hashtag}** - ${inlineCode("🔥")} ${owl.attack} ,${inlineCode("🛡️")} ${owl.defense} ,${inlineCode("❤️")} ${owl.health}`
    }
    if(statsOwl.length == 0 || statsOwl == '' || statsOwl == ' ' || statsOwl == undefined) statsOwl += `No Knight Owl`

    // == Embed waiting screen after 10s ==
    var embedWaiting = new MessageEmbed()
        .setColor('#9f5fff')
        .setTitle(`⌛ Starting the battle in 10 seconds...`)
        .setDescription(`🦅 **${underscore("Eagle Stats")}** :\n${allBossDisplay}\n🦉 **${underscore("Owls Stats")}** :\n${statsOwl}`)
        .setTimestamp();

    const messageHandle = await message.channel.send({embeds: [initialEmbed]});

    // === Loop Battle ===
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    (async () => {
        var roundLoop = 0
        var round = 0
        var allBossStats = bossStats(allBoss)
        var messageEmbed = ``

        // <=== Embed Function ===>
        function owlDefend(){
            for(const owl of allOwl){
                var randomBoss = Math.floor(Math.random() * allBossStats.length);
                var damage = Math.floor(Math.random() * (allBossStats[randomBoss].attack - owl.defense));

                owl.health -= damage

                if(owl.health <= 0){
                    messageEmbed += `${inlineCode("☠️")} **Knigth Owl #${owl.hashtag}** died by **${allBossStats[randomBoss].name}** (${inlineCode("🔥")} ${inlineCode(damage)})\n`
                    allOwl.splice(allOwl.indexOf(owl.hashtag), 1);
                } else {
                    messageEmbed += `**Knigth Owl #${owl.hashtag}** loses ${inlineCode(damage)} ${inlineCode("❤️")} from **${allBossStats[randomBoss].name}**\n`
                }
            };
            return messageEmbed
        };


        function owlAttack(){
            for(const owl of allOwl){

                var damageOwl = Math.floor(Math.random() * owl.attack);
                var randomBoss = Math.floor(Math.random() * allBossStats.length);

                allBossStats[randomBoss].health -= damageOwl

                console.log(allOwl.length)
                
                if(allBossStats[randomBoss].health <= 0){
                    messageEmbed += `${inlineCode("☠️")} **Knigth Owl #${owl.hashtag}** kills **${allBossStats[randomBoss].name}**\n`
                    allBossStats.splice(allBossStats.indexOf(allBossStats[randomBoss].name), 1);
                } else {
                    messageEmbed += `**Knigth Owl #${owl.hashtag}** deals ${inlineCode(damageOwl)} ${inlineCode("🔥")} to **${allBossStats[randomBoss].name}**\n`
                }
            }
            if(allOwl.length == 0 || allOwl.length == undefined){
                messageEmbed += `${inlineCode("☠️")} **All the owls are dead**, none can attack`
            }
        return messageEmbed
        };

        function status(){
            var messageBossStaus = ``
            var messageUserStatus = ``
            for(const bossStatus of allBossStats){
                messageBossStaus += `**${bossStatus.name}** (${inlineCode("❤️")} ${inlineCode(bossStatus.health)})\n`
            }

            for(const owl of allOwl){
                messageUserStatus += `**Knigth Owl #${owl.hashtag}** (${inlineCode("❤️")} ${inlineCode(owl.health)})\n`
            }

            if(messageUserStatus.length == 0 || messageUserStatus == '' || messageUserStatus == ' ' || messageUserStatus == undefined) messageUserStatus = `All the owls are dead`
            
            return [messageBossStaus, messageUserStatus]
        };

        function checkWinner(allOwl, allBossStats){
            if(allOwl.length == 0){
                return 'eagle'
            }
            if(allBossStats.length == 0){
                return 'player'
            }
            return 'nowinner'
        }

        await sleep(CONFIGCOOLDOWN.cooldows);
        messageHandle.edit({embeds:[embedWaiting]});
        await sleep(CONFIGCOOLDOWN.cooldows);

        while(checkWinner(allOwl, allBossStats) == 'nowinner') {

            if(roundLoop == 0){
                // == Owl Defend ==
                roundLoop = 1
                round += 1
                messageEmbed = ``
                messageHandle.edit({embeds:[defenseRound(round, owlDefend())]});
            }

            await sleep(CONFIGCOOLDOWN.cooldows);

            if(roundLoop == 1){
                // == Owl Attack ==
                roundLoop = 2
                round += 1
                messageEmbed = ``
                messageHandle.edit({embeds:[attackRound(round, owlAttack())]});
            }

            await sleep(CONFIGCOOLDOWN.cooldows);

            if(roundLoop == 2){
                // == Owl & Boss Status ==
                roundLoop = 0
                messageEmbed = ``
                messageHandle.edit({embeds:[statusRound(status()[0], status()[1])]});
            }

            await sleep(CONFIGCOOLDOWN.cooldows);
        };

        // === Check Winer ===
        if(checkWinner(allOwl, allBossStats) == 'eagle'){
            var eagleWinnerEmbed = new MessageEmbed()
                .setColor('#e60d0d')
                .setTitle(`📜 DEFEAT`)
                .setDescription(`${inlineCode("☠️")} **All the owls are dead**\n\n${inlineCode("📊")} **STATS** :\n${inlineCode("🧮")} Round : ${inlineCode(round)}\n${inlineCode("👥")} Total Player : ${inlineCode(allMember.length)}\n${inlineCode("🦅")} Total Eagle : ${inlineCode(allBossStats.length)}`)
                .setTimestamp();
            messageHandle.edit({embeds:[eagleWinnerEmbed]});
        };

        if(checkWinner(allOwl, allBossStats) == 'player'){
            var healthOwlRest = ``
            for(const owl of allOwl){
                if(owl.health <= 0) owl.health = 0
                healthOwlRest += `**Knight Owl #${owl.hashtag}** (${inlineCode("❤️")} : ${inlineCode(owl.health)})`
            }

            var playerWinnerEmbed = new MessageEmbed()
                .setColor('#0de61b')
                .setTitle(`📜 VICTORY`)
                .setDescription(`${inlineCode("🪧")} **The owls have defeated the enemy**\n\n${inlineCode("📊")} **STATS** :\n${inlineCode("🧮")} Round : ${inlineCode(round)}\n${inlineCode("👥")} Total Player : ${inlineCode(allMember.length)}\n${inlineCode("🦅")} Total Eagle : ${inlineCode(allBossStats.length)}`)
                .setTimestamp();
            messageHandle.edit({embeds:[playerWinnerEmbed]});
        };
    })();
};

module.exports.info = {
    names: ['battlestart', 'battles', 'bs', 'startbattle'],
};
