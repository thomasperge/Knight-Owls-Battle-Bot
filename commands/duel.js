const BATTLE = require('../modules/battle.js');
const PLAYER = require('../modules/player.js');
const CONFIGCOOLDOWN = require('../config.json')
const CONFIGEAGLE = require('../config/configEagle.json')
const { bold, inlineCode, userMention, codeBlock, underscore, ButtonBuilder, EmbedBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { numStr } = require('../functionNumber/fixedNumer.js');

module.exports.run = async (client, message, args) => {
    var user = message.author
    var userDuel = message.mentions.users.first();

    if(userDuel == undefined || userDuel == '' || userDuel ==' ') return message.reply(`${inlineCode("🪧")} undefined fighter, type: ${inlineCode("!duel <@user>")}`)
    if(user.id == userDuel.id) return message.reply(`${inlineCode("🪧")} It's not good to cheat...`)

    async function verifUserInput(){
        var playerInput = await PLAYER.findOne({ userId : userDuel.id })
        if(!playerInput) return false
        else return true
    };

    async function verifUser(){
        var player = await PLAYER.findOne({ userId : user.id })
        if(!player) return false
        else return true
    };

    // == Owl Status Function ==
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

    if(verifUserInput() && verifUser()){

        var playerInput = await PLAYER.findOne({ userId : userDuel.id })
        var player = await PLAYER.findOne({ userId : user.id })

        // <=== Get Random Owl of Player 1 ===>
        var owlAmoutPlayer = 0
        var statsPlayer = ``

        if(player.slot.owl1.hashtagNumber != -1 && player.slot.owl1.status == 1) owlAmoutPlayer += 1
        if(player.slot.owl2.hashtagNumber != -1 && player.slot.owl2.status == 1) owlAmoutPlayer += 1
        if(player.slot.owl3.hashtagNumber != -1 && player.slot.owl3.status == 1) owlAmoutPlayer += 1
        if(player.slot.owl4.hashtagNumber != -1 && player.slot.owl4.status == 1) owlAmoutPlayer += 1
        if(player.slot.owl5.hashtagNumber != -1 && player.slot.owl5.status == 1) owlAmoutPlayer += 1

        var randomOwlPlayer = Math.floor(Math.random() * owlAmoutPlayer)
        var owlUser = []

        if(owlAmoutPlayer == 0) statsPlayer = `**No Knight Owl**`
        if(owlAmoutPlayer >= 1){

            if(randomOwlPlayer == 0) {
                owlStatus(player, player.slot.owl1, 'battle')
                statsPlayer = `<@${user.id}> takes his **Knight Owl #${player.slot.owl1.hashtagNumber}**\n`
                owlUser.push({hashtag: player.slot.owl1.hashtagNumber, attackHigh: player.slot.owl1.attackHigh, attackLow: player.slot.owl1.attackLow, defenseHigh: player.slot.owl1.defenseHigh, defenseLow: player.slot.owl1.defenseLow, health: player.slot.owl1.health, eva: player.slot.owl1.eva})
            };
            if(randomOwlPlayer == 1) {
                owlStatus(player, player.slot.owl2, 'battle')
                statsPlayer = `<@${user.id}> takes his **Knight Owl #${player.slot.owl2.hashtagNumber}**\n`
                owlUser.push({hashtag: player.slot.owl2.hashtagNumber, attackHigh: player.slot.owl2.attackHigh, attackLow: player.slot.owl2.attackLow, defenseHigh: player.slot.owl2.defenseHigh, defenseLow: player.slot.owl2.defenseLow, health: player.slot.owl2.health, eva: player.slot.owl2.eva})
            };
            if(randomOwlPlayer == 2) {
                owlStatus(player, player.slot.owl3, 'battle')
                statsPlayer = `<@${user.id}> takes his **Knight Owl #${player.slot.owl3.hashtagNumber}**\n`
                owlUser.push({hashtag: player.slot.owl3.hashtagNumber, attackHigh: player.slot.owl3.attackHigh, attackLow: player.slot.owl3.attackLow, defenseHigh: player.slot.owl3.defenseHigh, defenseLow: player.slot.owl3.defenseLow, health: player.slot.owl3.health, eva: player.slot.owl3.eva})
            };
            if(randomOwlPlayer == 3) {
                owlStatus(player, player.slot.owl4, 'battle')
                statsPlayer = `<@${user.id}> takes his **Knight Owl #${player.slot.owl4.hashtagNumber}**\n`
                owlUser.push({hashtag: player.slot.owl4.hashtagNumber, attackHigh: player.slot.owl4.attackHigh, attackLow: player.slot.owl4.attackLow, defenseHigh: player.slot.owl4.defenseHigh, defenseLow: player.slot.owl4.defenseLow, health: player.slot.owl4.health, eva: player.slot.owl4.eva})
            };
            if(randomOwlPlayer >= 4) {
                owlStatus(player, player.slot.owl5, 'battle')
                statsPlayer = `<@${user.id}> takes his **Knight Owl #${player.slot.owl5.hashtagNumber}**\n`
                owlUser.push({hashtag: player.slot.owl5.hashtagNumber, attackHigh: player.slot.owl5.attackHigh, attackLow: player.slot.owl5.attackLow, defenseHigh: player.slot.owl5.defenseHigh, defenseLow: player.slot.owl5.defenseLow, health: player.slot.owl5.health, eva: player.slot.owl5.eva})
            };
        };


        // <=== Get Random Owl of Player Input ===>
        var owlAmoutPlayerInput = 0
        var statsPlayerInput = ``

        if(playerInput.slot.owl1.hashtagNumber != -1 && playerInput.slot.owl1.status == 1) owlAmoutPlayerInput += 1
        if(playerInput.slot.owl2.hashtagNumber != -1 && playerInput.slot.owl2.status == 1) owlAmoutPlayerInput += 1
        if(playerInput.slot.owl3.hashtagNumber != -1 && playerInput.slot.owl3.status == 1) owlAmoutPlayerInput += 1
        if(playerInput.slot.owl4.hashtagNumber != -1 && playerInput.slot.owl4.status == 1) owlAmoutPlayerInput += 1
        if(playerInput.slot.owl5.hashtagNumber != -1 && playerInput.slot.owl5.status == 1) owlAmoutPlayerInput += 1

        var randomOwlPlayerInput = Math.floor(Math.random() * owlAmoutPlayerInput)
        var owlUserInput = []

        if(owlAmoutPlayerInput == 0) statsPlayerInput = `**No Knight Owl**`
        if(owlAmoutPlayerInput >= 1){

            if(randomOwlPlayerInput == 0) {
                owlStatus(playerInput, playerInput.slot.owl1, 'battle')
                statsPlayerInput = `<@${userDuel.id}> takes his **Knight Owl #${playerInput.slot.owl1.hashtagNumber}**`
                owlUserInput.push({hashtag: playerInput.slot.owl1.hashtagNumber, attackHigh: playerInput.slot.owl1.attackHigh, attackLow: playerInput.slot.owl1.attackLow, defenseHigh: playerInput.slot.owl1.defenseHigh, defenseLow: playerInput.slot.owl1.defenseLow, health: playerInput.slot.owl1.health, eva: playerInput.slot.owl1.eva})
            };
            if(randomOwlPlayerInput == 1) {
                owlStatus(playerInput, playerInput.slot.owl2, 'battle')
                statsPlayerInput = `<@${userDuel.id}> takes his **Knight Owl #${playerInput.slot.owl2.hashtagNumber}**`
                owlUserInput.push({hashtag: playerInput.slot.owl2.hashtagNumber, attackHigh: playerInput.slot.owl2.attackHigh, attackLow: playerInput.slot.owl2.attackLow, defenseHigh: playerInput.slot.owl2.defenseHigh, defenseLow: playerInput.slot.owl2.defenseLow, health: playerInput.slot.owl2.health, eva: playerInput.slot.owl2.eva})
            };
            if(randomOwlPlayerInput == 2) {
                owlStatus(playerInput, playerInput.slot.owl3, 'battle')
                statsPlayerInput = `<@${userDuel.id}> takes his **Knight Owl #${playerInput.slot.owl3.hashtagNumber}**`
                owlUserInput.push({hashtag: playerInput.slot.owl3.hashtagNumber, attackHigh: playerInput.slot.owl3.attackHigh, attackLow: playerInput.slot.owl3.attackLow, defenseHigh: playerInput.slot.owl3.defenseHigh, defenseLow: playerInput.slot.owl3.defenseLow, health: playerInput.slot.owl3.health, eva: playerInput.slot.owl3.eva})
            };
            if(randomOwlPlayerInput == 3) {
                owlStatus(playerInput, playerInput.slot.owl4, 'battle')
                statsPlayerInput = `<@${userDuel.id}> takes his **Knight Owl #${playerInput.slot.owl4.hashtagNumber}**`
                owlUserInput.push({hashtag: playerInput.slot.owl4.hashtagNumber, attackHigh: playerInput.slot.owl4.attackHigh, attackLow: playerInput.slot.owl4.attackLow, defenseHigh: playerInput.slot.owl4.defenseHigh, defenseLow: playerInput.slot.owl4.defenseLow, health: playerInput.slot.owl4.health, eva: playerInput.slot.owl4.eva})
            };
            if(randomOwlPlayerInput >= 4) {
                owlStatus(playerInput, playerInput.slot.owl5, 'battle')
                statsPlayerInput = `<@${userDuel.id}> takes his **Knight Owl #${playerInput.slot.owl5.hashtagNumber}**`
                owlUserInput.push({hashtag: playerInput.slot.owl5.hashtagNumber, attackHigh: playerInput.slot.owl5.attackHigh, attackLow: playerInput.slot.owl5.attackLow, defenseHigh: playerInput.slot.owl5.defenseHigh, defenseLow: playerInput.slot.owl5.defenseLow, health: playerInput.slot.owl5.health, eva: playerInput.slot.owl5.eva})
            };
        };

        if(owlUser.length == 0) return message.reply(`${inlineCode("🪧")} You have no owls ready!`)
        if(owlUserInput.length == 0) return message.reply(`${inlineCode("🪧")} The player mentioned has no owls ready!`)


        // ======== EMBED ROUND ========
        var initialEmbed = new MessageEmbed()
            .setColor('#99a8e0')
            .setTitle(`🏹 Battle by ${user.username.toUpperCase()}`)
            .setDescription(`<@${user.id}> vs <@${userDuel.id}>\n\n${inlineCode("📊")} **List of Owls** :\n${statsPlayer}${statsPlayerInput}\n${inlineCode("🪧")} Stand at the ready !\n`)
            .setTimestamp();


        function defenseRound(roundNumber, message){
            var defenseEmbed = new MessageEmbed()
                .setColor('#ed11dd')
                .setTitle(`ROUND ${roundNumber} - Owls #${owlUser[0].hashtag} fight 🏹`)
                .setDescription(`${message}`)
                .setTimestamp();
            return defenseEmbed
        };
    
        function attackRound(roundNumber, message){
            var attackEmbed = new MessageEmbed()
                .setColor('#ed11dd')
                .setTitle(`ROUND ${roundNumber} - Owls #${owlUserInput[0].hashtag} fight 🏹`)
                .setDescription(`${message}`)
                .setTimestamp();
            return attackEmbed
        };
    
        function statusRound(messageStatus){
            var statusEmbed = new MessageEmbed()
                .setColor('#000000')
                .setTitle(`STATUS UPDATE ❤️`)
                .setDescription(`${messageStatus}`)
                .setTimestamp();
            return statusEmbed
        };


        // == Embed waiting screen after 10s ==
        var embedWaiting = new MessageEmbed()
            .setColor('#9f5fff')
            .setTitle(`⌛ Starting the battle in 10 seconds...`)
            .setDescription(`⚔️ <@${user.id}> VS <@${userDuel.id}>\n\n🎽 Stats <@${user.id}> with **Knigth Owl #${owlUser[0].hashtag}**:\n${inlineCode('🔥')} ${inlineCode(owlUser[0].attackLow + ' - ' + owlUser[0].attackHigh)} - ${inlineCode('🛡️')} ${inlineCode(owlUser[0].defenseLow + ' - ' + owlUser[0].defenseHigh)} - ${inlineCode('❤️')} ${inlineCode(owlUser[0].health)}\n🎽 Stats <@${userDuel.id}> with **Knigth Owl #${owlUserInput[0].hashtag}**:\n${inlineCode('🔥')} ${inlineCode(owlUserInput[0].attackLow + ' - ' + owlUserInput[0].attackHigh)} - ${inlineCode('🛡️')} ${inlineCode(owlUserInput[0].defenseLow + ' - ' + owlUserInput[0].defenseHigh)} - ${inlineCode('❤️')} ${inlineCode(owlUserInput[0].health)}`)
            .setTimestamp();

        message.channel.send({embeds: [initialEmbed]});


        // === Loop Battle ===
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        (async () => {
            var roundLoop = 0
            var round = 0
            var messageEmbed = ``
            var dead = ``

            // <=== Owl User Attack ===>
            function owlUserAttack(){
                if(owlUser[0].health <= 0) messageEmbed = `**Knigth Owl #${owlUser[0].hashtag}** is dead and can't attack`
                else {
                    var atackUser = (Math.random() * owlUser[0].attackHigh) + owlUser[0].attackLow
                    var defendUserInput = (Math.random() * owlUserInput[0].defenseHigh) + owlUserInput[0].defenseLow
                    
                    var randomEva = Math.random() * 100

                    if(owlUserInput[0].eva >= randomEva){
                        messageEmbed = `**Knigth Owl #${owlUserInput[0].hashtag}** dodges the attack of **Knigth Owl #${owlUser[0].hashtag}**`
                    } else {
                        var damage = atackUser
                        if(damage <= 0) damage = 0

                        owlUserInput[0].health -= damage

                        if(owlUserInput[0].health <= 0){
                            dead += `**Knigth Owl #${owlUserInput[0].hashtag}** dead\n`

                            messageEmbed += `${inlineCode("☠️")} **Knigth Owl #${owlUserInput[0].hashtag}** died by **Knigth Owl #${owlUser[0].hashtag}** (${inlineCode(numStr(damage) + "🔥")})\n`
                        } else {
                            messageEmbed += `**Knigth Owl #${owlUserInput[0].hashtag}** loses ${inlineCode(numStr(damage) + "❤️")} from **Knigth Owl #${owlUser[0].hashtag}**\n`
                        }
                    }
                }
                return messageEmbed
            };


            function owlUserInputAttack(){
                if(owlUserInput[0].health <= 0) messageEmbed = `**Knigth Owl #${owlUserInput[0].hashtag}** is dead and can't attack`
                else {
                    var atackUserInput = (Math.random() * owlUserInput[0].attackHigh) + owlUserInput[0].attackLow
                    var defendUser = (Math.random() * owlUser[0].defenseHigh) + owlUser[0].defenseLow
                    
                    var randomEva = Math.random() * 100

                    if(owlUser[0].eva >= randomEva){
                        messageEmbed = `**Knigth Owl #${owlUser[0].hashtag}** dodges the attack of **Knigth Owl #${owlUserInput[0].hashtag}**`
                    } else {
                        var damage = atackUserInput
                        if(damage <= 0) damage = 0
                        owlUser[0].health -= damage

                        if(owlUser[0].health <= 0){
                            dead += `**Knigth Owl #${owlUser[0].hashtag}** dead\n`

                            messageEmbed += `${inlineCode("☠️")} **Knigth Owl #${owlUser[0].hashtag}** died by **Knigth Owl #${owlUserInput[0].hashtag}** (${inlineCode(numStr(damage) + "🔥")})\n`
                        } else {
                            messageEmbed += `**Knigth Owl #${owlUser[0].hashtag}** loses ${inlineCode(numStr(damage) + "❤️")} from **Knigth Owl #${owlUserInput[0].hashtag}**\n`
                        }
                    }
                }
                return messageEmbed
            };

            function status(){
                var messageStatus = ``
                if(owlUser[0].health <= 0) owlUser[0].health = 0
                if(owlUserInput[0].health <= 0) owlUserInput[0].health = 0
                
                if(owlUser[0].health <= 0) messageStatus += `**Knigth owl #${owlUser[0].hashtag}** ${inlineCode("0❤️")} (dead)\n`
                else messageStatus += `**Knigth owl #${owlUser[0].hashtag}** : ${inlineCode("❤️" + numStr(owlUser[0].health))}\n`

                if(owlUserInput[0].health <= 0) messageStatus += `**Knigth owl #${owlUserInput[0].hashtag}** ${inlineCode("0❤️")} (dead)\n`
                else messageStatus += `**Knigth owl #${owlUserInput[0].hashtag}** : ${inlineCode("❤️" + numStr(owlUserInput[0].health))}\n`

                return messageStatus
            };

            function checkWinner(owlUser, owlUserInput){
                if(owlUser[0].health <= 0 || owlUser.length == 0){
                    return 'userinput'
                }
                if(owlUserInput[0].health == 0 || owlUserInput.length == 0){
                    return 'user'
                }
                return 'nowinner'
            };

            await sleep(CONFIGCOOLDOWN.cooldows);
            message.channel.send({embeds:[embedWaiting]});
            await sleep(CONFIGCOOLDOWN.cooldows);

            while(checkWinner(owlUser, owlUserInput) == 'nowinner') {

                if(roundLoop == 0){
                    // == Owl Defend ==
                    roundLoop = 1
                    round += 1
                    messageEmbed = ``
                    message.channel.send({embeds:[defenseRound(round, owlUserAttack())]});
                }

                await sleep(CONFIGCOOLDOWN.cooldows);

                if(roundLoop == 1){
                    // == Owl Attack ==
                    roundLoop = 2
                    round += 1
                    messageEmbed = ``
                    message.channel.send({embeds:[attackRound(round, owlUserInputAttack())]});
                }

                await sleep(CONFIGCOOLDOWN.cooldows);

                if(roundLoop == 2){
                    // == Owl & Boss Status ==
                    roundLoop = 0
                    messageEmbed = ``
                    message.channel.send({embeds:[statusRound(status())]});
                }

                await sleep(CONFIGCOOLDOWN.cooldows);
            

                // === Check Winer ===
                if(checkWinner(owlUser, owlUserInput) == 'userinput'){

                    if(randomOwlPlayerInput == 0) owlStatus(playerInput, playerInput.slot.owl1, 'fight') 
                    if(randomOwlPlayerInput == 1) owlStatus(playerInput, playerInput.slot.owl2, 'fight')
                    if(randomOwlPlayerInput == 2) owlStatus(playerInput, playerInput.slot.owl3, 'fight')
                    if(randomOwlPlayerInput == 3) owlStatus(playerInput, playerInput.slot.owl4, 'fight')
                    if(randomOwlPlayerInput >= 4) owlStatus(playerInput, playerInput.slot.owl5, 'fight')

                    if(randomOwlPlayer == 0) owlStatus(player, player.slot.owl1, 'dead') 
                    if(randomOwlPlayer == 1) owlStatus(player, player.slot.owl2, 'dead')
                    if(randomOwlPlayer == 2) owlStatus(player, player.slot.owl3, 'dead')
                    if(randomOwlPlayer == 3) owlStatus(player, player.slot.owl4, 'dead')
                    if(randomOwlPlayer >= 4) owlStatus(player, player.slot.owl5, 'dead')

                    var userInputWin = new MessageEmbed()
                        .setColor('#e60d0d')
                        .setTitle(`📜 DEFEAT`)
                        .setDescription(`${inlineCode("☠️")} **<@${userDuel.id}>** WIN with **Knigth Owl #${owlUserInput[0].hashtag}**\n\n${inlineCode("📊")} **STATS** :\n${inlineCode("🧮")} Round : ${inlineCode(round)}\n${inlineCode("👥")} Total Player : ${inlineCode("2")}`)
                        .setTimestamp();
                    return message.channel.send({embeds:[userInputWin]});
                };

                if(checkWinner(owlUser, owlUserInput) == 'user'){
                    if(randomOwlPlayer == 0) owlStatus(player, player.slot.owl1, 'figth') 
                    if(randomOwlPlayer == 1) owlStatus(player, player.slot.owl2, 'figth')
                    if(randomOwlPlayer == 2) owlStatus(player, player.slot.owl3, 'figth')
                    if(randomOwlPlayer == 3) owlStatus(player, player.slot.owl4, 'figth')
                    if(randomOwlPlayer >= 4) owlStatus(player, player.slot.owl5, 'figth')

                    if(randomOwlPlayerInput == 0) owlStatus(playerInput, playerInput.slot.owl1, 'dead') 
                    if(randomOwlPlayerInput == 1) owlStatus(playerInput, playerInput.slot.owl2, 'dead')
                    if(randomOwlPlayerInput == 2) owlStatus(playerInput, playerInput.slot.owl3, 'dead')
                    if(randomOwlPlayerInput == 3) owlStatus(playerInput, playerInput.slot.owl4, 'dead')
                    if(randomOwlPlayerInput >= 4) owlStatus(playerInput, playerInput.slot.owl5, 'dead')

                    var userWin = new MessageEmbed()
                        .setColor('#0de61b')
                        .setTitle(`📜 VICTORY`)
                        .setDescription(`${inlineCode("🪧")} **Your owls have defeated the enemy <@${userDuel.id}>**\n\n${inlineCode("📊")} **STATS** :\n${inlineCode("🧮")} Round : ${inlineCode(round)}\n${inlineCode("👥")} Total Player : ${inlineCode("2")}`)
                        .setTimestamp();
                    return message.channel.send({embeds:[userWin]});
                };
            };
        })();
    } else return message.reply(`${inlineCode("🪧")} <@${userDuel}> is not a player`)
};

module.exports.info = {
    names: ['duel', 'figth', 'd', 'combat', 'f', 'spar'],
};
