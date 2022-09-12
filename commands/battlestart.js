const BATTLE = require('../modules/battle.js');
const PLAYER = require('../modules/player.js');
const CONFIGCOOLDOWN = require('../config.json')
const CONFIGEAGLE = require('../config/configEagle.json')
const { bold, inlineCode, userMention, codeBlock, underscore, ButtonBuilder, EmbedBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { numStr } = require('../functionNumber/fixedNumer.js');

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
                owlTaken.cooldown = 1
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
            var owlList = []

            if(player.slot.owl1.hashtagNumber != -1 && player.slot.owl1.status == 1) owlList.push("1")
            if(player.slot.owl2.hashtagNumber != -1 && player.slot.owl2.status == 1) owlList.push("2")
            if(player.slot.owl3.hashtagNumber != -1 && player.slot.owl3.status == 1) owlList.push("3")
            if(player.slot.owl4.hashtagNumber != -1 && player.slot.owl4.status == 1) owlList.push("4")
            if(player.slot.owl5.hashtagNumber != -1 && player.slot.owl5.status == 1) owlList.push("5")

            var randomOwl = Math.floor(Math.random() * owlList.length)

            if(owlList.length == 0) stats = `**No Knigth Owl**`
            if(owlList.length >= 1){

                if(owlList[randomOwl] == "1") {
                    owlStatus(player, player.slot.owl1, 'battle')
                    stats = `**Knigth Owl #${player.slot.owl1.hashtagNumber}** - ${'**ATK: **' + player.slot.owl1.attackLow + ' - ' + player.slot.owl1.attackHigh}, ${'**DEF: **' + player.slot.owl1.defenseLow + ' - ' + player.slot.owl1.defenseHigh}, ${'**EVA: **' + player.slot.owl1.eva + '%'}, ${'**HP: **' + player.slot.owl1.health}`
                    allOwl.push({idOwner: user, hashtag: player.slot.owl1.hashtagNumber, attackHigh: player.slot.owl1.attackHigh, attackLow: player.slot.owl1.attackLow, defenseHigh: player.slot.owl1.defenseHigh, defenseLow: player.slot.owl1.defenseLow, health: player.slot.owl1.health, eva: player.slot.owl1.eva})
                };
                if(owlList[randomOwl] == "2") {
                    owlStatus(player, player.slot.owl2, 'battle')
                    stats = `**Knigth Owl #${player.slot.owl2.hashtagNumber}** - ${'**ATK: **' + player.slot.owl2.attackLow + ' - ' + player.slot.owl2.attackHigh}, ${'**DEF: **' + player.slot.owl2.defenseLow + ' - ' + player.slot.owl2.defenseHigh}, ${'**EVA: **' + player.slot.owl2.eva + '%'}, ${'**HP: **' + player.slot.owl2.health}`
                    allOwl.push({idOwner: user, hashtag: player.slot.owl2.hashtagNumber, attackHigh: player.slot.owl2.attackHigh, attackLow: player.slot.owl2.attackLow, defenseHigh: player.slot.owl2.defenseHigh, defenseLow: player.slot.owl2.defenseLow, health: player.slot.owl2.health, eva: player.slot.owl2.eva})
                };
                if(owlList[randomOwl] == "3") {
                    owlStatus(player, player.slot.owl3, 'battle')
                    stats = `**Knigth Owl #${player.slot.owl3.hashtagNumber}** - ${'**ATK: **' + player.slot.owl3.attackLow + ' - ' + player.slot.owl3.attackHigh}, ${'**DEF: **' + player.slot.owl3.defenseLow + ' - ' + player.slot.owl3.defenseHigh}, ${'**EVA: **' + player.slot.owl3.eva + '%'}, ${'**HP: **' + player.slot.owl3.health}`
                    allOwl.push({idOwner: user, hashtag: player.slot.owl3.hashtagNumber, attackHigh: player.slot.owl3.attackHigh, attackLow: player.slot.owl3.attackLow, defenseHigh: player.slot.owl3.defenseHigh, defenseLow: player.slot.owl3.defenseLow, health: player.slot.owl3.health, eva: player.slot.owl3.eva})
                };
                if(owlList[randomOwl] == "4") {
                    owlStatus(player, player.slot.owl4, 'battle')
                    stats = `**Knigth Owl #${player.slot.owl4.hashtagNumber}** - ${'**ATK: **' + player.slot.owl4.attackLow + ' - ' + player.slot.owl4.attackHigh}, ${'**DEF: **' + player.slot.owl4.defenseLow + ' - ' + player.slot.owl4.defenseHigh}, ${'**EVA: **' + player.slot.owl4.eva + '%'}, ${'**HP: **' + player.slot.owl4.health}`
                    allOwl.push({idOwner: user, hashtag: player.slot.owl4.hashtagNumber, attackHigh: player.slot.owl4.attackHigh, attackLow: player.slot.owl4.attackLow, defenseHigh: player.slot.owl4.defenseHigh, defenseLow: player.slot.owl4.defenseLow, health: player.slot.owl4.health, eva: player.slot.owl4.eva})
                };
                if(owlList[randomOwl] >= "5") {
                    owlStatus(player, player.slot.owl5, 'battle')
                    stats = `**Knigth Owl #${player.slot.owl5.hashtagNumber}** - ${'**ATK: **' + player.slot.owl5.attackLow + ' - ' + player.slot.owl5.attackHigh}, ${'**DEF: **' + player.slot.owl5.defenseLow + ' - ' + player.slot.owl5.defenseHigh}, ${'**EVA: **' + player.slot.owl5.eva + '%'}, ${'**HP: **' + player.slot.owl5.health}`
                    allOwl.push({idOwner: user, hashtag: player.slot.owl5.hashtagNumber, attackHigh: player.slot.owl5.attackHigh, attackLow: player.slot.owl5.attackLow, defenseHigh: player.slot.owl5.defenseHigh, defenseLow: player.slot.owl5.defenseLow, health: player.slot.owl5.health, eva: player.slot.owl5.eva})
                };
            };

            statsPlayer += `<@${user}> with ${stats}\n`
        };

        // ======== EMBED ROUND ========
        var initialEmbed = new MessageEmbed()
            .setColor('#99a8e0')
            .setTitle(`BATTLE 🏹`)
            .setDescription(`${allPlayerAccept} have been chosen ! Stand at the ready!\n\n${statsPlayer}`)
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
                .setDescription(`${inlineCode("📊")} **Ennemy Stats** :\n${messageBoss}\n${inlineCode("📊")} **Owl Stats** :\n${messageUser}`)
                .setTimestamp();
            return statusEmbed
        };

        function randomStuff(){
            var randomStuff = Math.floor(Math.random() * 100)

            if(randomStuff <= 100) return [true, 'head']
            if(randomStuff <= 30) return [true, 'wing']
            if(randomStuff <= 40) return [true, 'talon']
            return [false, 'undefined']
        };

        // === Battle Player vs Boss === 
        // === Variable Declaration ===
        var allBoss = battle.ennemi


        // === Function Stats Boss ===
        function bossStats(allBoss){
            var stats = []
            var allBossDisplay = ``


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
                    eagleAttack = Math.floor(Math.random() * (CONFIGEAGLE.eagle.attackMax - CONFIGEAGLE.eagle.attackMin + 1)) + CONFIGEAGLE.eagle.attackMin
                    eagleDefense = Math.floor(Math.random() * (CONFIGEAGLE.eagle.defenseMax - CONFIGEAGLE.eagle.defenseMin + 1)) + CONFIGEAGLE.eagle.defenseMin
                    eagleHealth = Math.floor(Math.random() * (CONFIGEAGLE.eagle.healthMax - CONFIGEAGLE.eagle.healthMin + 1)) + CONFIGEAGLE.eagle.healthMin
                    stats.push({name: `Eagle ${pas}`, eagleNumber: pas, attack: eagleAttack, defense: eagleDefense, health: eagleHealth})
                    allBossDisplay += `**x${pas} Eagle** - ${'**ATK: **' + CONFIGEAGLE.eagle.attackMin + " - " + CONFIGEAGLE.eagle.attackMax}, ${'**DEF: **' + CONFIGEAGLE.eagle.defenseMin + " - " + CONFIGEAGLE.eagle.defenseMax}, ${'**HP: **' + eagleHealth}\n`
                };
            }
            
            for (let pas = 1; pas < allBoss.eagleCaptain + 1; pas++) {
                if(allBoss.eagleCaptain > 0){
                    eagleCAttack = Math.floor(Math.random() * CONFIGEAGLE.captainEagle.attackMax) + CONFIGEAGLE.captainEagle.attackMin
                    eagleCDefense = Math.floor(Math.random() * CONFIGEAGLE.captainEagle.defenseMax) + CONFIGEAGLE.captainEagle.defenseMin
                    eagleCHealth = Math.floor(Math.random() * CONFIGEAGLE.captainEagle.healthMax) + CONFIGEAGLE.captainEagle.healthMin
                    stats.push({name: `Eagle Captain ${pas}`, eagleCaptainNumber: pas, attack: eagleCAttack, defense: eagleCDefense, health: eagleCHealth})
                    allBossDisplay += `**x${pas} Eagle Captain** - ${'**ATK: **' + CONFIGEAGLE.captainEagle.attackMin + " - " + CONFIGEAGLE.captainEagle.attackMax}, ${'**DEF: **' + CONFIGEAGLE.captainEagle.defenseMin + " - " + CONFIGEAGLE.captainEagle.defenseMax}, ${'**HP: **' + eagleCHealth}\n`
                };
            }
            for (let pas = 1; pas < allBoss.eagleKing + 1; pas++) {
                if(allBoss.eagleKing > 0){
                    eagleKAttack = Math.floor(Math.random() * CONFIGEAGLE.kingEagle.attackMax) + CONFIGEAGLE.kingEagle.attackMin
                    eagleKDefense = Math.floor(Math.random() * CONFIGEAGLE.kingEagle.defenseMax) + CONFIGEAGLE.kingEagle.defenseMin
                    eagleKHealth = Math.floor(Math.random() * CONFIGEAGLE.kingEagle.healthMax) + CONFIGEAGLE.kingEagle.healthMin
                    stats.push({name: `King Eagle ${pas}`, eagleKingNumber: pas, attack: eagleKAttack, defense: eagleKDefense, health: eagleKHealth})
                    allBossDisplay += `**x${pas} Eagle King** - ${'**ATK: **' + CONFIGEAGLE.kingEagle.attackMin + " - " + CONFIGEAGLE.kingEagle.attackMax}, ${'**DEF: **' + CONFIGEAGLE.kingEagle.defenseMin + " - " + CONFIGEAGLE.kingEagle.defenseMax}, ${'**HP: **' + eagleKHealth}\n`
                };
            }
            for (let pas = 1; pas < allBoss.eagleGod + 1; pas++) {
                if(allBoss.eagleGod > 0){
                    eagleGAttack = Math.floor(Math.random() * CONFIGEAGLE.godEagle.attackMax) + CONFIGEAGLE.godEagle.attackMin
                    eagleGDefense = Math.floor(Math.random() * CONFIGEAGLE.godEagle.defenseMax) + CONFIGEAGLE.godEagle.defenseMin
                    eagleGHealth = Math.floor(Math.random() * CONFIGEAGLE.godEagle.healthMax) + CONFIGEAGLE.godEagle.healthMin
                    stats.push({name: `Eagle God ${pas}`, eagleGodNumber: pas, attack: eagleGAttack, defense: eagleGDefense, health: eagleGHealth})
                    allBossDisplay += `**x${pas} Eagle God** - ${'**ATK: **' + CONFIGEAGLE.godEagle.attackMin + " - " + CONFIGEAGLE.godEagle.attackMax}, ${'**DEF: **' + CONFIGEAGLE.godEagle.defenseMin + " - " + CONFIGEAGLE.godEagle.defenseMax}, ${'**HP: **' + eagleGHealth}\n`
                };
            }
            return [stats, allBossDisplay]
        };


        const allBossStatsDisplay = bossStats(allBoss)
        const allBossStats = allBossStatsDisplay[0]
        const allBossText = allBossStatsDisplay[1]


        // <=== DISPLAY BOSS ===>
        var statsOwl = ``

        for(const owl of allOwl){
            if(owl.hashtag == -1){
                statsOwl += ``
            } else {
                statsOwl += `**Knigth Owl #${owl.hashtag}** - ${'**ATK: **' + owl.attackLow + " - " + owl.attackHigh}, ${'**DEF: **' + owl.defenseLow + " - " + owl.defenseHigh}, ${'**HP: **' + owl.health}, ${'**EVA: **' + owl.eva + "%"}\n`
            }
        };

        if(statsOwl.length == 0 || statsOwl == '' || statsOwl == ' ' || statsOwl == undefined) statsOwl += `No Knigth Owl`

        // == Embed waiting screen after 10s ==
        var embedWaiting = new MessageEmbed()
            .setColor('#9f5fff')
            .setTitle(`Starting the battle in 10 seconds... ⌛`)
            .setDescription(`🦅 **${underscore("Eagle Stats")}** :\n${allBossText}\n🦉 **${underscore("Owls Stats")}** :\n${statsOwl}`)
            .setTimestamp();

        // const messageHandle = await message.channel.send({embeds: [initialEmbed]});
        message.channel.send({embeds: [initialEmbed]});

        console.log('HERE 0')
        // === Loop Battle ===
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        (async () => {
        console.log('HERE 1J')

            var roundLoop = 0
            var round = 0
            var messageEmbed = ``
            var bossDead = ``
            var owlDead = ``

            // <=== Embed Function ===>
            function owlDefend(){
                for(const owl of allOwl){
                    var randomBoss = Math.floor(Math.random() * allBossStats.length);

                    var randomDefense = Math.random() * (owl.defenseHigh - owl.defenseLow + 1) + owl.defenseLow
                    var damage = Math.random() * (allBossStats[randomBoss].attack - randomDefense);
                    var randomEva = Math.random() * 100
                    
                    if(damage <= 0) damage = 0

                    if(owl.eva >= randomEva){
                        messageEmbed = `<@${owl.idOwner}> dodges the attack of the **${allBossStats[randomBoss].name}**\n`
                    } else {
                        owl.health -= damage
                        
                        if(owl.health <= 0){
                            owlDead += `<@${owl.idOwner}> defeated\n`
                            
                            messageEmbed += `**${allBossStats[randomBoss].name}** deals ${inlineCode(numStr(damage))} damage to <@${owl.idOwner}> (**HP**: 0 - defeated)\n`
                            allOwl.splice(allOwl.indexOf(owl.hashtag), 1);
                        } else {
                            messageEmbed += `**${allBossStats[randomBoss].name}** deals ${inlineCode(numStr(damage))} damage to <@${owl.idOwner}> (Remaining **HP**: ${inlineCode(numStr(owl.health))})\n`
                        };
                    };
                };
                return messageEmbed
            };

            function owlAttack(){
                for(const owl of allOwl){

                    var damageOwl = (Math.random() * (owl.attackHigh - owl.attackLow + 1)) + owl.attackLow
                    var randomBoss = Math.floor(Math.random() * allBossStats.length);

                    if(damageOwl <= 0) damageOwl = 0

                    if(allBossStats[randomBoss] == undefined){
                        messageEmbed = `All the bosses have been killed!`
                    } else {
                        allBossStats[randomBoss].health -= damageOwl

                        if(allBossStats[randomBoss].health <= 0){
                            messageEmbed += `<@${owl.idOwner}> kills **${allBossStats[randomBoss].name}**\n`
                            allBossStats.splice(allBossStats.indexOf(allBossStats[randomBoss].name), 1);
                        } else {
                            messageEmbed += `<@${owl.idOwner}> deals ${inlineCode(numStr(damageOwl))} damage to **${allBossStats[randomBoss].name}** (Remaining **HP**: ${inlineCode(numStr(allBossStats[randomBoss].health))})\n`
                        }
                    }
                };

                if(allOwl.length == 0 || allOwl.length == undefined){
                    messageEmbed += `**All the owls are defeated**, none can attack`
                };

                return messageEmbed
            };

            function status(){
                var messageBossStatus = ``
                var messageUserStatus = ``
                
                for(const bossStatus of allBossStats){
                    if(bossStatus.health <= 0 || bossStatus == undefined){
                        bossStatus.health = 0
                        bossDead += `**${bossStatus.name}** (defeated)\n`
                    } else messageBossStatus += `**${bossStatus.name}** (**HP: **${inlineCode(numStr(bossStatus.health))})\n`
                };

                for(const owl of allOwl){
                    if(owl.health <= 0 || owl == undefined){
                        owl.health = 0
                        owlDead += `<@${owl.idOwner}> - **Knigth Owl #${owl.hashtag}** (defeated)\n`
                    } else messageUserStatus += `<@${owl.idOwner}> - **Knigth Owl #${owl.hashtag}** (HP: ${inlineCode(numStr(owl.health))})\n`
                };

                if(messageUserStatus.length == 0 || messageUserStatus == '' || messageUserStatus == ' ' || messageUserStatus == undefined) {
                    messageUserStatus = `All the owls are defeated`
                    owlDead = ``
                };

                if(allBossStats.length == 0 || allBossStats == undefined){
                    messageBossStatus = `All the bosses have been killed\n`
                    bossDead = ``
                };
                
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

            var healthOwlRest = ``

            // === Check Winer ===
            if(checkWinner(allOwl, allBossStats) == 'eagle'){
                // == Status Owl ==
                for(const user of allMember){
                    var player = await PLAYER.findOne({ userId : user })
                    if(owlList[randomOwl] == "1") owlStatus(player, player.slot.owl1, 'dead'); else owlStatus(player, player.slot.owl1, 'figth')
                    if(owlList[randomOwl] == "2") owlStatus(player, player.slot.owl2, 'dead'); else owlStatus(player, player.slot.owl2, 'figth')
                    if(owlList[randomOwl] == "3") owlStatus(player, player.slot.owl3, 'dead'); else owlStatus(player, player.slot.owl3, 'figth')
                    if(owlList[randomOwl] == "4") owlStatus(player, player.slot.owl4, 'dead'); else owlStatus(player, player.slot.owl4, 'figth')
                    if(owlList[randomOwl] == "5") owlStatus(player, player.slot.owl5, 'dead'); else owlStatus(player, player.slot.owl5, 'figth')
                };

                var messageBossStatus = ``

                for(const bossStatus of allBossStats){
                    if(bossStatus.health <= 0 || bossStatus == undefined){
                        bossStatus.health = 0
                        bossDead += `**${bossStatus.name}** (defeated)\n`
                    } else messageBossStatus += `**${bossStatus.name}** (**HP: **${inlineCode(numStr(bossStatus.health))})\n`
                };

                battle.battleMember = []
                battle.maxUser = 0
                battle.ennemi.eagle = 0
                battle.ennemi.eagleCaptain = 0
                battle.ennemi.eagleKing = 0
                battle.ennemi.eagleGod = 0
                battle.save()

                messageBossStatus += bossDead

                var eagleWinnerEmbed = new MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle(`DEFEAT 🏹`)
                    .setDescription(`The owls succumbed to the ennemy but were flown back to safety by the medics\nThe ennemy returns to their land victorious\n\n${messageBossStatus}`)
                    .setTimestamp();
                // messageHandle.edit({embeds:[eagleWinnerEmbed]});
                message.channel.send({embeds:[eagleWinnerEmbed]});
            };

            if(checkWinner(allOwl, allBossStats) == 'player'){
                // == Status Owl ==
                for(const user of allMember){
                    var player = await PLAYER.findOne({ userId : user })
                    if(owlList[randomOwl] == "1") owlStatus(player, player.slot.owl1, 'fight') 
                    if(owlList[randomOwl] == "2") owlStatus(player, player.slot.owl2, 'fight')
                    if(owlList[randomOwl] == "3") owlStatus(player, player.slot.owl3, 'fight')
                    if(owlList[randomOwl] == "4") owlStatus(player, player.slot.owl4, 'fight')
                    if(owlList[randomOwl] == "5") owlStatus(player, player.slot.owl5, 'fight')
                };

                for(const owl of allOwl){
                    if(owl.health <= 0) owl.health = 0
                    healthOwlRest += `**Knigth Owl #${owl.hashtag}** (${inlineCode("❤️")} : ${inlineCode(owl.health)})`
                    
                    // == Give Reward for Owl ==
                    var player = await PLAYER.findOne({userId: owl.idOwner})
                    const RANDOMSTUFFDATA = randomStuff(player)
                    var messageLoot = ``

                    if(RANDOMSTUFFDATA[0]){
                        if(RANDOMSTUFFDATA[1] == 'head'){
                            player.loot.eagleHead += 1
                            messageLoot = `${inlineCode('📦')} <@${owl.idOwner}> gets an **Eagle Head**\n`
                        };
                        if(RANDOMSTUFFDATA[1] == 'wing'){
                            player.loot.eagleWing += 1
                            messageLoot = `${inlineCode('📦')} <@${owl.idOwner}> gets an **Eagle Wing**\n`
                        };
                        if(RANDOMSTUFFDATA[1] == 'talon'){
                            player.loot.eagleTalon += 1
                            messageLoot = `${inlineCode('📦')} <@${owl.idOwner}> gets an **Eagle Talon**\n`
                        };
                    };
                    player.save()
                };

                var messageUserStatus = ``

                for(const owl of allOwl){
                    if(owl.health <= 0 || owl == undefined){
                        owl.health = 0
                        owlDead += `<@${owl.idOwner}> - **Knigth Owl #${owl.hashtag}** (defeated)\n`
                    } else messageUserStatus += `<@${owl.idOwner}> - **Knigth Owl #${owl.hashtag}** (HP: ${inlineCode(numStr(owl.health))})\n`
                };

                battle.battleMember = []
                battle.maxUser = 0
                battle.ennemi.eagle = 0
                battle.ennemi.eagleCaptain = 0
                battle.ennemi.eagleKing = 0
                battle.ennemi.eagleGod = 0
                battle.save()

                messageUserStatus += owlDead

                var playerWinnerEmbed = new MessageEmbed()
                    .setColor('#00ff00')
                    .setTitle(`VICTORY 🏹`)
                    .setDescription(`The owls successfully vanquished the ennemy\n\n${messageUserStatus}`)
                    .setTimestamp();
                // messageHandle.edit({embeds:[playerWinnerEmbed]});
                return message.channel.send({embeds:[playerWinnerEmbed]});
            };
        })();
    } else return message.reply(`${inlineCode("🪧")} You don't have the permission to start a battle`);
};

module.exports.info = {
    names: ['battlestart', 'battles', 'bs', 'startbattle'],
};
