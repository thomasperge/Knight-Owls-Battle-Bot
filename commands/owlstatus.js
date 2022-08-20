const Discord = require('discord.js');
const PLAYER = require('../modules/player.js');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

// Config Cooldown :
const shuffleTime = 15000;
var cooldownOwl1 = new Discord.Collection();
var cooldownOwl2 = new Discord.Collection();
var cooldownOwl3 = new Discord.Collection();
var cooldownOwl4 = new Discord.Collection();
var cooldownOwl5 = new Discord.Collection();

module.exports.run = async (client, message, args) => {
    var user = message.author

    var player = await PLAYER.findOne({ userId: user.id })
    if(!player) return message.reply(`${inlineCode("🪧")} you are not a player...`)
    else {

        function cooldownStatusOwl(owlStatus, owlCooldown, cooldown){
            
        }

        function statusMessage(){
            var owlStatus = ``

            if(player.slot.owl1.hashtagNumber != -1){
                if(player.slot.owl1.status == 1) owlStatus += `**Owl #${player.slot.owl1.hashtagNumber}** - Ready to fight\n`
                
                if(player.slot.owl1.status == 2){
                    if(player.slot.owl1.cooldown == 1){
                        cooldownOwl1.set(message.author.id, new Date().getTime());
                        player.slot.owl1.cooldown = 2
                    };

                    if(player.slot.owl1.cooldown == 2){
                        if (cooldownOwl1.get(message.author.id) && new Date().getTime() - cooldownOwl1.get(message.author.id) < shuffleTime) {
                            owlStatus += `**Owl #${player.slot.owl1.hashtagNumber}** - Healing... (${inlineCode(Math.ceil((shuffleTime - (new Date().getTime() - cooldownOwl1.get(message.author.id))) / 1000))})\n`
                        } else {
                            player.slot.owl1.cooldown = 3
                        };
                    };

                    if(player.slot.owl1.cooldown == 3){
                        owlStatus += `**Owl #${player.slot.owl1.hashtagNumber}** - Ready to Fight\n`
                        player.slot.owl1.status = 1
                    };
                };
                if(player.slot.owl1.status == 3) owlStatus += `**Owl #${player.slot.owl1.hashtagNumber}** - In combat\n`
            };

            if(player.slot.owl2.hashtagNumber != -1){
                if(player.slot.owl2.status == 1) owlStatus += `**Owl #${player.slot.owl2.hashtagNumber}** - Ready to fight\n`
                
                if(player.slot.owl2.status == 2){
                    if(player.slot.owl2.cooldown == 1){
                        cooldownOwl2.set(message.author.id, new Date().getTime());
                        player.slot.owl2.cooldown = 2
                    };

                    if(player.slot.owl2.cooldown == 2){
                        if (cooldownOwl2.get(message.author.id) && new Date().getTime() - cooldownOwl2.get(message.author.id) < shuffleTime) {
                            owlStatus += `**Owl #${player.slot.owl2.hashtagNumber}** - Healing... (${inlineCode(Math.ceil((shuffleTime - (new Date().getTime() - cooldownOwl2.get(message.author.id))) / 1000))})\n`
                        } else {
                            player.slot.owl2.cooldown = 3
                        };
                    };

                    if(player.slot.owl2.cooldown == 3){
                        owlStatus += `**Owl #${player.slot.owl2.hashtagNumber}** - Ready to Fight\n`
                        player.slot.owl2.status = 1
                    };
                };
                if(player.slot.owl2.status == 3) owlStatus += `**Owl #${player.slot.owl2.hashtagNumber}** - In combat\n`
            };

            if(player.slot.owl3.hashtagNumber != -1){
                if(player.slot.owl3.status == 1) owlStatus += `**Owl #${player.slot.owl3.hashtagNumber}** - Ready to fight\n`
                
                if(player.slot.owl3.status == 2){
                    if(player.slot.owl3.cooldown == 1){
                        cooldownOwl3.set(message.author.id, new Date().getTime());
                        player.slot.owl3.cooldown = 2
                    };

                    if(player.slot.owl3.cooldown == 2){
                        if (cooldownOwl3.get(message.author.id) && new Date().getTime() - cooldownOwl3.get(message.author.id) < shuffleTime) {
                            owlStatus += `**Owl #${player.slot.owl3.hashtagNumber}** - Healing... (${inlineCode(Math.ceil((shuffleTime - (new Date().getTime() - cooldownOwl3.get(message.author.id))) / 1000))})\n`
                        } else {
                            player.slot.owl3.cooldown = 3
                        };
                    };

                    if(player.slot.owl3.cooldown == 3){
                        owlStatus += `**Owl #${player.slot.owl3.hashtagNumber}** - Ready to Fight\n`
                        player.slot.owl3.status = 1
                    };
                };
                if(player.slot.owl3.status == 3) owlStatus += `**Owl #${player.slot.owl3.hashtagNumber}** - In combat\n`
            };

            if(player.slot.owl4.hashtagNumber != -1){
                if(player.slot.owl4.status == 1) owlStatus += `**Owl #${player.slot.owl4.hashtagNumber}** - Ready to fight\n`
                
                if(player.slot.owl4.status == 2){
                    if(player.slot.owl4.cooldown == 1){
                        cooldownOwl4.set(message.author.id, new Date().getTime());
                        player.slot.owl4.cooldown = 2
                    };

                    if(player.slot.owl4.cooldown == 2){
                        if (cooldownOwl4.get(message.author.id) && new Date().getTime() - cooldownOwl4.get(message.author.id) < shuffleTime) {
                            owlStatus += `**Owl #${player.slot.owl4.hashtagNumber}** - Healing... (${inlineCode(Math.ceil((shuffleTime - (new Date().getTime() - cooldownOwl4.get(message.author.id))) / 1000))})\n`
                        } else {
                            player.slot.owl4.cooldown = 3
                        };
                    };

                    if(player.slot.owl4.cooldown == 3){
                        owlStatus += `**Owl #${player.slot.owl4.hashtagNumber}** - Ready to Fight\n`
                        player.slot.owl4.status = 1
                    };
                };
                if(player.slot.owl4.status == 3) owlStatus += `**Owl #${player.slot.owl4.hashtagNumber}** - In combat\n`
            };

            if(player.slot.owl5.hashtagNumber != -1){
                if(player.slot.owl5.status == 1) owlStatus += `**Owl #${player.slot.owl5.hashtagNumber}** - Ready to fight\n`
                
                if(player.slot.owl5.status == 2){
                    if(player.slot.owl5.cooldown == 1){
                        cooldownOwl5.set(message.author.id, new Date().getTime());
                        player.slot.owl5.cooldown = 2
                    };

                    if(player.slot.owl5.cooldown == 2){
                        if (cooldownOwl5.get(message.author.id) && new Date().getTime() - cooldownOwl5.get(message.author.id) < shuffleTime) {
                            owlStatus += `**Owl #${player.slot.owl5.hashtagNumber}** - Healing... (${inlineCode(Math.ceil((shuffleTime - (new Date().getTime() - cooldownOwl5.get(message.author.id))) / 1000))})\n`
                        } else {
                            player.slot.owl5.cooldown = 3
                        };
                    };

                    if(player.slot.owl5.cooldown == 3){
                        owlStatus += `**Owl #${player.slot.owl5.hashtagNumber}** - Ready to Fight\n`
                        player.slot.owl5.status = 1
                    };
                };
                if(player.slot.owl5.status == 3) owlStatus += `**Owl #${player.slot.owl5.hashtagNumber}** - In combat\n`
            };
            
            if(owlStatus == '' || owlStatus == ' ' || owlStatus.length == 0 || owlStatus == undefined) owlStatus = `You don't have any owls...`
            
            return owlStatus
        };
        player.save()


        var statusEmbed = new MessageEmbed()
            .setColor('#9f5fff')
            .setTitle(`Your owl stats 📊`)
            .setDescription(`${inlineCode("🪧")} Here are the statuses of your registered owls :\n\n${statusMessage()}`)
            .setTimestamp();

        //  === CoolDowns: 3s ===
        // if (cooldownPlayers.get(message.author.id) && new Date().getTime() - cooldownPlayers.get(message.author.id) < shuffleTime) {
        //     message.reply({ embeds: [statusEmbed] })
        //     return;
        // }
        // cooldownPlayers.set(message.author.id, new Date().getTime());

        // if(player.slot.owl1.status != 3){
        //     player.slot.owl1.status = 1
        // };
        // if(player.slot.owl2.status != 3){
        //     player.slot.owl2.status = 1
        // };
        // if(player.slot.owl3.status != 3){
        //     player.slot.owl3.status = 1
        // };
        // if(player.slot.owl4.status != 3){
        //     player.slot.owl4.status = 1
        // };
        // if(player.slot.owl5.status != 3){
        //     player.slot.owl5.status = 1
        // };
        // // player.save()
        message.reply({ embeds: [statusEmbed] })

    };
};

module.exports.info = {
  names: ['owlstatus', 'owl', 'status'],
};
