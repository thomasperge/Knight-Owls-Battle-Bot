const Discord = require('discord.js');
const PLAYER = require('../modules/player.js');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

// Config Cooldown :
const shuffleTime = 15000;
var cooldownPlayers = new Discord.Collection();

module.exports.run = async (client, message, args) => {
    var user = message.author
    
    var player = await PLAYER.findOne({ userId: user.id })
    if(!player) return message.reply(`${inlineCode("🪧")} you are not a player...`)
    else {

        function status(owl){
            var messageStatus = ``

            if(owl.status == 1){
                messageStatus = `Ready to fight`
            };
            if(owl.status == 2){
                messageStatus = `Dead, at rest! ()`
            };
            if(owl.status == 3){
                messageStatus = `In combat`
            };

            return messageStatus
        };

        function statusMessage(){
            var owlStatus = ``
            if(player.slot.owl1.hashtagNumber != -1){
                owlStatus += `**Owl #${player.slot.owl1.hashtagNumber}** - ${status(player.slot.owl1)}\n`
            };
            if(player.slot.owl2.hashtagNumber != -1){
                owlStatus += `**Owl #${player.slot.owl2.hashtagNumber}** - ${status(player.slot.owl2)}\n`
            };
            if(player.slot.owl3.hashtagNumber != -1){
                owlStatus += `**Owl #${player.slot.owl3.hashtagNumber}** - ${status(player.slot.owl3)}\n`
            };
            if(player.slot.owl4.hashtagNumber != -1){
                owlStatus += `**Owl #${player.slot.owl4.hashtagNumber}** - ${status(player.slot.owl4)}\n`
            };
            if(player.slot.owl5.hashtagNumber != -1){
                owlStatus += `**Owl #${player.slot.owl5.hashtagNumber}** - ${status(player.slot.owl5)}\n`
            };
            if(owlStatus == '' || owlStatus == ' ' || owlStatus.length == 0 || owlStatus == undefined) owlStatus = `You don't have any owls...`
            return owlStatus
        };

        var statusEmbed = new MessageEmbed()
            .setColor('#9f5fff')
            .setTitle(`Your owl stats 📊`)
            .setDescription(`${inlineCode("🪧")} Here are the statues of your registered owls :\n\n${statusMessage()}`)
            .setTimestamp();

        //  === CoolDowns: 3s ===
        if (cooldownPlayers.get(message.author.id) && new Date().getTime() - cooldownPlayers.get(message.author.id) < shuffleTime) {
            message.reply({ embeds: [statusEmbed] })
            return;
        }
        cooldownPlayers.set(message.author.id, new Date().getTime());

        if(player.slot.owl1.status != 3){
            player.slot.owl1.status = 1
        };
        if(player.slot.owl2.status != 3){
            player.slot.owl2.status = 1
        };
        if(player.slot.owl3.status != 3){
            player.slot.owl3.status = 1
        };
        if(player.slot.owl4.status != 3){
            player.slot.owl4.status = 1
        };
        if(player.slot.owl5.status != 3){
            player.slot.owl5.status = 1
        };
        player.save()
        message.reply({ embeds: [statusEmbed] })

    };
};

module.exports.info = {
  names: ['owlstatus', 'owl', 'status'],
};
