const Discord = require('discord.js');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const PLAYER = require('../modules/player.js');

module.exports.run = async (client, message, args) => {
    var user = message.author
    
    var player = await PLAYER.findOne({ userId: user.id })
    if(!player) return message.reply(`${inlineCode("🪧")} the player mentioned is not a player...`)
    else {
        var owlStatus = ``

        if(player.slot.owl1.hashtagNumber != -1){
            owlStatus += `**Owl #${player.slot.owl1.hashtagNumber}** - Ready to fight\n`
        };
        if(player.slot.owl2.hashtagNumber != -1){
            owlStatus += `**Owl #${player.slot.owl2.hashtagNumber}** - Ready to fight\n`
        };
        if(player.slot.owl3.hashtagNumber != -1){
            owlStatus += `**Owl #${player.slot.owl3.hashtagNumber}** - Ready to fight\n`
        };
        if(player.slot.owl4.hashtagNumber != -1){
            owlStatus += `**Owl #${player.slot.owl4.hashtagNumber}** - Ready to fight\n`
        };
        if(player.slot.owl5.hashtagNumber != -1){
            owlStatus += `**Owl #${player.slot.owl5.hashtagNumber}** - Ready to fight\n`
        };

        if(owlStatus == '' || owlStatus == ' ' || owlStatus.length == 0 || owlStatus == undefined) owlStatus = `You don't have any owls...`

        var statusEmbed = new MessageEmbed()
            .setColor('#9f5fff')
            .setTitle(`Your owl stats 📊`)
            .setDescription(`Here are the statues of your registered owls :\n\n${owlStatus}`)
            .setTimestamp();
        message.reply({ embeds: [statusEmbed] })
    }
        
};

module.exports.info = {
  names: ['owlstatus', 'owl', 'status'],
};
