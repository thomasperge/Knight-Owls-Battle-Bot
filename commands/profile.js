const PLAYER = require('../modules/player.js')
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

module.exports.run = async (client, message, args) => {
    var user = message.author
    var player = await PLAYER.findOne({ userId: user.id})
    if(!player) return message.reply(`${inlineCode("🪧")} You are not a player`);

    var allOwl = ``
    var allItem = ``
    var admin = ``

    function status(owlStatus){
        if(owlStatus == 1) return 'Ready to fight'
        if(owlStatus == 2) return 'Dead, at rest'
        if(owlStatus == 3) return 'In combat'
    };

    function checkAdmin(user){
        if(user == "564050802566627358" || user == "369531783471038474" || user == "792916125784342578" || user == "162596374163095552" || user == "162595815670546433") return true
        return false
    };

    if(checkAdmin(user.id)) admin = `(admin)`

    // == Item(s) ==
    if(player.loot.eagleHead > 0) allItem += `**Eagle Head : ** ${player.loot.eagleHead}\n`
    if(player.loot.eagleWing > 0) allItem += `**Eagle Wing : ** ${player.loot.eagleWing}\n`
    if(player.loot.eagleTalon > 0) allItem += `**Eagle Talon : ** ${player.loot.eagleTalon}\n`

    if(allItem.length == 0 || allItem == '' || allItem == ' ' || allItem == undefined) allItem = "You don't have any items"

    // == Owl(s) ==
    if(player.slot.owl1.hashtagNumber != -1) allOwl += `Owl #${player.slot.owl1.hashtagNumber} (${status(player.slot.owl1.status)})\n`
    if(player.slot.owl2.hashtagNumber != -1) allOwl += `Owl #${player.slot.owl2.hashtagNumber} (${status(player.slot.owl2.status)})\n`
    if(player.slot.owl3.hashtagNumber != -1) allOwl += `Owl #${player.slot.owl3.hashtagNumber} (${status(player.slot.owl3.status)})\n`
    if(player.slot.owl4.hashtagNumber != -1) allOwl += `Owl #${player.slot.owl4.hashtagNumber} (${status(player.slot.owl4.status)})\n`
    if(player.slot.owl5.hashtagNumber != -1) allOwl += `Owl #${player.slot.owl5.hashtagNumber} (${status(player.slot.owl5.status)})\n`

    if(allOwl.length == 0 || allOwl == '' || allOwl == ' ' || allOwl == undefined) allOwl = `You have no owls`

    var messageEmbed = new MessageEmbed()
        .setColor('#ed00ff')
        .setTitle(`${user.username} profile 👥`)
        .setDescription(`**Pseudo :** ${user.username} ${admin}\n\n⚔️ **Knight Owls** :\n${allOwl}\n📦 **Your item(s) :**\n${allItem}`)
        .setTimestamp();
    return message.reply({embeds: [messageEmbed]})
};

module.exports.info = {
  names: ['profile', 'p', 'inventory', 'profil', 'pseudo'],
};
