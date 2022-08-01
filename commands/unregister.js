const Discord = require('discord.js');
const PLAYER = require('../modules/player.js')
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

module.exports.run = async (client, message, args) => {
    var user = message.author
    var userInput = message.mentions.users.first();
    var hashtag = args[1]

    if((hashtag == undefined || hashtag == '' || hashtag == ' ' || isNaN(hashtag)) && parseInt(hashtag) >= 0 && parseInt(hashtag) <= 1999) return message.reply(`${inlineCode("🪧")} Wrong command, use : ${inlineCode("!unregisterowl <@user> #")}`)
    else if(userInput == undefined || userInput == ' ' || userInput == '') return message.reply(`${inlineCode("🪧")} Wrong command, use : ${inlineCode("!unregisterowl <@user> #")}`)
    else {

        var player = await PLAYER.findOne({ userId: userInput.id })
        if(!player) return message.reply(`${inlineCode("🪧")} the player mentioned is not a player...`)
        else {

            function deleteHashtag(player, owl, id){

                console.log(owl)

                owl.hashtagNumber = -1
                owl.health = 0
                owl.defense = 0
                owl.eva = 0
                owl.attack = 0

                player.save()

                var unregisterEmbed = new MessageEmbed()
                    .setColor('#9f5fff')
                    .setTitle(`✅ Success`)
                    .setDescription(`You've removed the owl with the id **${id}** to the member **${inlineCode("@" + userInput.username)}**`)
                    .setTimestamp();
                message.reply({ embeds: [unregisterEmbed] })
            };

            if(player.slot.owl1.hashtagNumber == hashtag){
                return deleteHashtag(player, player.slot.owl1, hashtag)
            };
            if(player.slot.owl2.hashtagNumber == hashtag){
                return deleteHashtag(player, player.slot.owl2, hashtag)
            };
            if(player.slot.owl3.hashtagNumber == hashtag){
                return deleteHashtag(player, player.slot.owl3, hashtag)
            };
            if(player.slot.owl4.hashtagNumber == hashtag){
                return deleteHashtag(player, player.slot.owl4, hashtag)
            };
            if(player.slot.owl5.hashtagNumber == hashtag){
                return deleteHashtag(player, player.slot.owl5, hashtag)
            };
            return message.reply(`${inlineCode("🪧")} This player does not have the owl id : ${inlineCode(hashtag)}`)
        };
    };
};

module.exports.info = {
    names: ['unregisterowl', 'unregister', 'unr', 'unregister'],
};
