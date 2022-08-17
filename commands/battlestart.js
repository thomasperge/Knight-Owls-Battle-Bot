const BATTLE = require('../modules/battle.js');
const PLAYER = require('../modules/player.js');
const CONFIGCOOLDOWN = require('../config.json')
const CONFIGEAGLE = require('../config/configEagle.json')
const { bold, inlineCode, userMention, codeBlock, underscore, ButtonBuilder, EmbedBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    var user = message.author

    if(user.id == "564050802566627358" || user.id == "369531783471038474" || user.id == "792916125784342578" || user.id == "162596374163095552" || user.id == "162595815670546433"){

        var battle = await BATTLE.findOne({ battleCreatorID : user.id })
        if(!battle) return message.reply(`${inlineCode("🪧")} No battle has been created...`)
        if(battle.battleMember.length == 0) return message.reply(`${inlineCode("🪧")} No battle has been created...`)
        if(battle.maxUser == 0) return message.reply(`${inlineCode("🪧")} No battle has been created...`)

        function randomUserTaken(){
            var allPlayerTaken = []
            var maxPlayer = battle.maxUser
            var count = 1
            if(battle.battleMember.length <= maxPlayer){
                allPlayerTaken = battle.battleMember
                return allPlayerTaken
            } else {
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
            }
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


        function owlStatus(player, owlTaken, doing){
            if(doing == 'battle'){
                owlTaken.status = 3
                player.save()
            };
            if(doing == 'dead'){
                owlTaken.status = 2
                player.save()
            };
            if(doing == 'fight'){
                owlTaken.status = 1
                player.save()
            }
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

            if(player.slot.owl1.hashtagNumber != -1 && player.slot.owl1.status == 1) owlAmout += 1
            if(player.slot.owl2.hashtagNumber != -1 && player.slot.owl2.status == 1) owlAmout += 1
            if(player.slot.owl3.hashtagNumber != -1 && player.slot.owl3.status == 1) owlAmout += 1
            if(player.slot.owl4.hashtagNumber != -1 && player.slot.owl4.status == 1) owlAmout += 1
            if(player.slot.owl5.hashtagNumber != -1 && player.slot.owl5.status == 1) owlAmout += 1

            var randomOwl = Math.floor(Math.random() * owlAmout )

            if(owlAmout == 0) stats = `**No Knigth Owl**`
            if(owlAmout >= 1){

                if(randomOwl == 0) {
                    owlStatus(player, player.slot.owl1, 'battle')
                    stats = `**Knigth Owl #${player.slot.owl1.hashtagNumber}**`
                    allOwl.push({hashtag: player.slot.owl1.hashtagNumber, attack: player.slot.owl1.attackHigh, attackLow: player.slot.owl1.attackLow, defense: player.slot.owl1.defenseHigh, defenseLow: player.slot.owl1.defenseLow, health: player.slot.owl1.health})
                };
                if(randomOwl == 1) {
                    owlStatus(player, player.slot.owl2, 'battle')
                    stats = `**Knigth Owl #${player.slot.owl2.hashtagNumber}**`
                    allOwl.push({hashtag: player.slot.owl2.hashtagNumber, attack: player.slot.owl2.attackHigh, attackLow: player.slot.owl2.attackLow, defense: player.slot.owl2.defenseHigh, defenseLow: player.slot.owl2.defenseLow, health: player.slot.owl2.health})
                };
                if(randomOwl == 2) {
                    owlStatus(player, player.slot.owl3, 'battle')
                    stats = `**Knigth Owl #${player.slot.owl3.hashtagNumber}**`
                    allOwl.push({hashtag: player.slot.owl3.hashtagNumber, attack: player.slot.owl3.attackHigh, attackLow: player.slot.owl3.attackLow, defense: player.slot.owl3.defenseHigh, defenseLow: player.slot.owl3.defenseLow, health: player.slot.owl3.health})
                };
                if(randomOwl == 3) {
                    owlStatus(player, player.slot.owl4, 'battle')
                    stats = `**Knigth Owl #${player.slot.owl4.hashtagNumber}**`
                    allOwl.push({hashtag: player.slot.owl4.hashtagNumber, attack: player.slot.owl4.attackHigh, attackLow: player.slot.owl4.attackLow, defense: player.slot.owl4.defenseHigh, defenseLow: player.slot.owl4.defenseLow, health: player.slot.owl4.health})
                };
                if(randomOwl >= 4) {
                    owlStatus(player, player.slot.owl5, 'battle')
                    stats = `**Knigth Owl #${player.slot.owl5.hashtagNumber}**`
                    allOwl.push({hashtag: player.slot.owl5.hashtagNumber, attack: player.slot.owl5.attackHigh, attackLow: player.slot.owl5.attackLow, defense: player.slot.owl5.defenseHigh, defenseLow: player.slot.owl5.defenseLow, health: player.slot.owl5.health})
                };
            };

            statsPlayer += `<@${user}> with ${stats}\n`
        };

        // ======== EMBED ROUND ========
        var initialEmbed = new MessageEmbed()
            .setColor('#99a8e0')
            .setTitle(`🏹 Battle by ${user.username.toUpperCase()}`)
            .setDescription(`${allPlayerAccept} have been chosen !\n\n${inlineCode("📊")} **List of Owls** :\n${statsPlayer}\n${inlineCode("🪧")} Stand at the ready!\n`)
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
            // if(messageBoss.length == 0)
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
                    eagleAttack = Math.floor(Math.random() * CONFIGEAGLE.eagle.attackMax) + CONFIGEAGLE.eagle.attackMin
                    eagleDefense = Math.floor(Math.random() * CONFIGEAGLE.eagle.defenseMax) + CONFIGEAGLE.eagle.defenseMin
                    eagleHealth = Math.floor(Math.random() * CONFIGEAGLE.eagle.healthMax) + CONFIGEAGLE.eagle.healthMin
                    stats.push({name: `Eagle ${pas}`, eagleNumber: pas, attack: eagleAttack, defense: eagleDefense, health: eagleHealth})
                };
            }
            
            for (let pas = 1; pas < allBoss.eagleCaptain + 1; pas++) {
                if(allBoss.eagleCaptain > 0){
                    eagleCAttack = Math.floor(Math.random() * CONFIGEAGLE.captainEagle.attackMax) + CONFIGEAGLE.captainEagle.attackMin
                    eagleCDefense = Math.floor(Math.random() * CONFIGEAGLE.captainEagle.defenseMax) + CONFIGEAGLE.captainEagle.defenseMin
                    eagleCHealth = Math.floor(Math.random() * CONFIGEAGLE.captainEagle.healthMax) + CONFIGEAGLE.captainEagle.healthMin
                    stats.push({name: `Eagle Captain ${pas}`, eagleCaptainNumber: pas, attack: eagleCAttack, defense: eagleCDefense, health: eagleCHealth})
                };
            }
            for (let pas = 1; pas < allBoss.eagleKing + 1; pas++) {
                if(allBoss.eagleKing > 0){
                    eagleKAttack = Math.floor(Math.random() * CONFIGEAGLE.kingEagle.attackMax) + CONFIGEAGLE.kingEagle.attackMin
                    eagleKDefense = Math.floor(Math.random() * CONFIGEAGLE.kingEagle.defenseMax) + CONFIGEAGLE.kingEagle.defenseMin
                    eagleKHealth = Math.floor(Math.random() * CONFIGEAGLE.kingEagle.healthMax) + CONFIGEAGLE.kingEagle.healthMin
                    stats.push({name: `King Eagle ${pas}`, eagleKingNumber: pas, attack: eagleKAttack, defense: eagleKDefense, health: eagleKHealth})
                };
            }
            for (let pas = 1; pas < allBoss.eagleGod + 1; pas++) {
                if(allBoss.eagleGod > 0){
                    eagleGAttack = Math.floor(Math.random() * CONFIGEAGLE.godEagle.attackMax) + CONFIGEAGLE.godEagle.attackMin
                    eagleGDefense = Math.floor(Math.random() * CONFIGEAGLE.godEagle.defenseMax) + CONFIGEAGLE.godEagle.defenseMin
                    eagleGHealth = Math.floor(Math.random() * CONFIGEAGLE.godEagle.healthMax) + CONFIGEAGLE.godEagle.healthMin
                    stats.push({name: `Eagle God ${pas}`, eagleGodNumber: pas, attack: eagleGAttack, defense: eagleGDefense, health: eagleGHealth})
                };
            }
            return stats
        }

        // <=== DISPLAY BOSS ===>
        if(allBoss.eagle > 0) {
            allBossDisplay += `**x${allBoss.eagle} Eagle** - ${inlineCode("🔥")} ${CONFIGEAGLE.eagle.attackMax + " - " + CONFIGEAGLE.eagle.attackMin} ,${inlineCode("🛡️")} ${CONFIGEAGLE.eagle.defenseMax + " - " + CONFIGEAGLE.eagle.defenseMin} ,${inlineCode("❤️")} ${CONFIGEAGLE.eagle.healthMax + " - " + CONFIGEAGLE.eagle.healthMin}\n`
        }
        if(allBoss.eagleCaptain > 0) {
            allBossDisplay += `**x${allBoss.eagleCaptain} Eagle Captain** - ${inlineCode("🔥")} ${CONFIGEAGLE.captainEagle.attackMax + " - " + CONFIGEAGLE.captainEagle.attackMin} ,${inlineCode("🛡️")} ${CONFIGEAGLE.captainEagle.defenseMax + " - " + CONFIGEAGLE.captainEagle.defenseMin} ,${inlineCode("❤️")} ${CONFIGEAGLE.captainEagle.healthMax + " - " + CONFIGEAGLE.captainEagle.healthMin}\n`
        }
        if(allBoss.eagleKing > 0) {
            allBossDisplay += `**x${allBoss.eagleKing} Eagle King** - ${inlineCode("🔥")} ${CONFIGEAGLE.kingEagle.attackMax + " - " + CONFIGEAGLE.kingEagle.attackMin} ,${inlineCode("🛡️")} ${CONFIGEAGLE.kingEagle.defenseMax + " - " + CONFIGEAGLE.kingEagle.defenseMin} ,${inlineCode("❤️")} ${CONFIGEAGLE.kingEagle.healthMax + " - " + CONFIGEAGLE.kingEagle.healthMin}\n`
        }
        if(allBoss.eagleGod > 0) {
            allBossDisplay += `**x${allBoss.eagleGod} Eagle God** - ${inlineCode("🔥")} ${CONFIGEAGLE.godEagle.attackMax + " - " + CONFIGEAGLE.godEagle.attackMin} ,${inlineCode("🛡️")} ${CONFIGEAGLE.godEagle.defenseMax + " - " + CONFIGEAGLE.godEagle.defenseMin} ,${inlineCode("❤️")} ${CONFIGEAGLE.godEagle.healthMax + " - " + CONFIGEAGLE.godEagle.healthMin}\n`
        }
        
        var statsOwl = ``

        for(const owl of allOwl){
            if(owl.hashtag == -1){
                statsOwl += ``
            } else {
                statsOwl += `**Knigth Owl #${owl.hashtag}** - ${inlineCode(owl.attackHigh + " - " + owl.attackLow + "🔥")}, ${inlineCode(owl.defenseHigh + " - " + owl.defenseLow + "🛡️")}, ${inlineCode(owl.health + "❤️")}\n`
            }
        }
        if(statsOwl.length == 0 || statsOwl == '' || statsOwl == ' ' || statsOwl == undefined) statsOwl += `No Knigth Owl`

        // == Embed waiting screen after 10s ==
        var embedWaiting = new MessageEmbed()
            .setColor('#9f5fff')
            .setTitle(`⌛ Starting the battle in 10 seconds...`)
            .setDescription(`🦅 **${underscore("Eagle Stats")}** :\n${allBossDisplay}\n🦉 **${underscore("Owls Stats")}** :\n${statsOwl}`)
            .setTimestamp();

        // const messageHandle = await message.channel.send({embeds: [initialEmbed]});
        message.channel.send({embeds: [initialEmbed]});

        // === Loop Battle ===
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        (async () => {
            var roundLoop = 0
            var round = 0
            var allBossStats = bossStats(allBoss)
            var messageEmbed = ``
            var bossDead = ``
            var owlDead = ``

            // <=== Embed Function ===>
            function owlDefend(){
                for(const owl of allOwl){
                    var randomBoss = Math.floor(Math.random() * allBossStats.length);
                    var damage = Math.floor(Math.random() * (allBossStats[randomBoss].attack - ((Math.random() * owl.defenseHigh) + owl.defenseLow)));
                    owl.health -= damage

                    if(owl.health <= 0){
                        bossDead += `**Knigth Owl #${owl.hashtag}** dead\n`

                        messageEmbed += `${inlineCode("☠️")} **Knigth Owl #${owl.hashtag}** died by **${allBossStats[randomBoss].name}** (${inlineCode(damage + "🔥")})\n`
                        allOwl.splice(allOwl.indexOf(owl.hashtag), 1);
                    } else {
                        messageEmbed += `**Knigth Owl #${owl.hashtag}** loses ${inlineCode(damage + "❤️")} from **${allBossStats[randomBoss].name}**\n`
                    }
                };
                return messageEmbed
            };


            function owlAttack(){
                for(const owl of allOwl){

                    var damageOwl = Math.floor(Math.random() * owl.attackHigh) + owl.attackLow
                    var randomBoss = Math.floor(Math.random() * allBossStats.length);

                    allBossStats[randomBoss].health -= damageOwl

                    if(allBossStats[randomBoss].health <= 0){
                        owlDead += `**${allBossStats[randomBoss].name}** dead\n`

                        messageEmbed += `${inlineCode("☠️")} **Knigth Owl #${owl.hashtag}** kills **${allBossStats[randomBoss].name}**\n`
                        allBossStats.splice(allBossStats.indexOf(allBossStats[randomBoss].name), 1);
                    } else {
                        messageEmbed += `**Knigth Owl #${owl.hashtag}** deals ${inlineCode(damageOwl + "🔥")} to **${allBossStats[randomBoss].name}**\n`
                    }
                }
                if(allOwl.length == 0 || allOwl.length == undefined){
                    messageEmbed += `${inlineCode("☠️")} **All the owls are dead**, none can attack`
                }
            return messageEmbed
            };

            function status(){
                var messageBossStatus = ``
                var messageUserStatus = ``
                
                for(const bossStatus of allBossStats){
                    if(bossStatus.health <= 0){
                        bossStatus.health = 0
                        messageBossStatus += `**${bossStatus.name}** ${inlineCode(bossStatus.health + "❤️")} (dead)\n`
                    } else messageBossStatus += `**${bossStatus.name}** ${inlineCode(bossStatus.health + "❤️")}\n`
                }

                for(const owl of allOwl){
                    if(owl.health <= 0){
                        owl.health = 0
                        messageUserStatus += `**${owl.name}** ${inlineCode(owl.health + "❤️")} (dead)\n`
                    } else messageUserStatus += `**Knigth Owl #${owl.hashtag}** ${inlineCode(owl.health + "❤️")}\n`
                }

                if(messageUserStatus.length == 0 || messageUserStatus == '' || messageUserStatus == ' ' || messageUserStatus == undefined) messageUserStatus = `All the owls are dead`
                
                messageBossStatus += bossDead
                messageUserStatus += owlDead

                return [messageBossStatus, messageUserStatus]
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
            // messageHandle.edit({embeds:[embedWaiting]});
            message.channel.send({embeds:[embedWaiting]});
            await sleep(CONFIGCOOLDOWN.cooldows);

            while(checkWinner(allOwl, allBossStats) == 'nowinner') {

                if(roundLoop == 0){
                    // == Owl Defend ==
                    roundLoop = 1
                    round += 1
                    messageEmbed = ``
                    // messageHandle.edit({embeds:[defenseRound(round, owlDefend())]});
                    message.channel.send({embeds:[defenseRound(round, owlDefend())]});
                }

                await sleep(CONFIGCOOLDOWN.cooldows);

                if(roundLoop == 1){
                    // == Owl Attack ==
                    roundLoop = 2
                    round += 1
                    messageEmbed = ``
                    // messageHandle.edit({embeds:[attackRound(round, owlAttack())]});
                    message.channel.send({embeds:[attackRound(round, owlAttack())]});
                }

                await sleep(CONFIGCOOLDOWN.cooldows);

                if(roundLoop == 2){
                    // == Owl & Boss Status ==
                    roundLoop = 0
                    messageEmbed = ``
                    // messageHandle.edit({embeds:[statusRound(status()[0], status()[1])]});
                    message.channel.send({embeds:[statusRound(status()[0], status()[1])]});
                }

                await sleep(CONFIGCOOLDOWN.cooldows);
            };

            // === Check Winer ===
            if(checkWinner(allOwl, allBossStats) == 'eagle'){
                // == Status Owl ==
                for(const user of allMember){
                    var player = await PLAYER.findOne({ userId : user })
                    if(randomOwl == 0) owlStatus(player, player.slot.owl1, 'dead'); else owlStatus(player, player.slot.owl1, 'figth')
                    if(randomOwl == 1) owlStatus(player, player.slot.owl2, 'dead'); else owlStatus(player, player.slot.owl2, 'figth')
                    if(randomOwl == 2) owlStatus(player, player.slot.owl3, 'dead'); else owlStatus(player, player.slot.owl3, 'figth')
                    if(randomOwl == 3) owlStatus(player, player.slot.owl4, 'dead'); else owlStatus(player, player.slot.owl4, 'figth')
                    if(randomOwl >= 4) owlStatus(player, player.slot.owl5, 'dead'); else owlStatus(player, player.slot.owl5, 'figth')
                };

                var eagleWinnerEmbed = new MessageEmbed()
                    .setColor('#e60d0d')
                    .setTitle(`📜 DEFEAT`)
                    .setDescription(`${inlineCode("☠️")} **All the owls are dead**\n\n${inlineCode("📊")} **STATS** :\n${inlineCode("🧮")} Round : ${inlineCode(round)}\n${inlineCode("👥")} Total Player : ${inlineCode(allMember.length)}\n${inlineCode("🦅")} Total Eagle : ${inlineCode(allBossStats.length)}`)
                    .setTimestamp();
                // messageHandle.edit({embeds:[eagleWinnerEmbed]});
                message.channel.send({embeds:[eagleWinnerEmbed]});
            };

            if(checkWinner(allOwl, allBossStats) == 'player'){
                // == Status Owl ==
                for(const user of allMember){
                    var player = await PLAYER.findOne({ userId : user })
                    if(randomOwl == 0) owlStatus(player, player.slot.owl1, 'fight') 
                    if(randomOwl == 1) owlStatus(player, player.slot.owl2, 'fight')
                    if(randomOwl == 2) owlStatus(player, player.slot.owl3, 'fight')
                    if(randomOwl == 3) owlStatus(player, player.slot.owl4, 'fight')
                    if(randomOwl >= 4) owlStatus(player, player.slot.owl5, 'fight')
                }

                for(const owl of allOwl){
                    if(owl.health <= 0) owl.health = 0
                    healthOwlRest += `**Knigth Owl #${owl.hashtag}** (${inlineCode("❤️")} : ${inlineCode(owl.health)})`
                }

                var playerWinnerEmbed = new MessageEmbed()
                    .setColor('#0de61b')
                    .setTitle(`📜 VICTORY`)
                    .setDescription(`${inlineCode("🪧")} **The owls have defeated the enemy**\n\n${inlineCode("📊")} **STATS** :\n${inlineCode("🧮")} Round : ${inlineCode(round)}\n${inlineCode("👥")} Total Player : ${inlineCode(allMember.length)}\n${inlineCode("🦅")} Total live Eagle : ${inlineCode(allBossStats.length)}`)
                    .setTimestamp();
                // messageHandle.edit({embeds:[playerWinnerEmbed]});
                message.channel.send({embeds:[playerWinnerEmbed]});
            };
        })();
    } else return message.reply(`${inlineCode("🪧")} You don't have the permission to start a battle`)
};

module.exports.info = {
    names: ['battlestart', 'battles', 'bs', 'startbattle'],
};
