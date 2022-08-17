const Discord = require('discord.js');
const PLAYER = require('../modules/player.js')
const OWLCONFIG = require('../config/configOwl.json')
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { bold, inlineCode, codeBlock } = require('@discordjs/builders');

module.exports.run = async (client, message, args) => {
  var user = message.author
  var userInput = message.mentions.users.first();
  var hashtag = args[1]

  function hastagAlreadyTaken(player, hashtag){
    for(const allPlayer of player){
      if(allPlayer.slot.owl1.hashtagNumber == parseInt(hashtag)) return true
      if(allPlayer.slot.owl2.hashtagNumber == parseInt(hashtag)) return true
      if(allPlayer.slot.owl3.hashtagNumber == parseInt(hashtag)) return true
      if(allPlayer.slot.owl4.hashtagNumber == parseInt(hashtag)) return true
      if(allPlayer.slot.owl5.hashtagNumber == parseInt(hashtag)) return true
      return false
    };
  };

  if((hashtag == undefined || hashtag == '' || hashtag == ' ' || isNaN(hashtag)) && parseInt(hashtag) >= 0 && parseInt(hashtag) <= 1999) return message.reply(`${inlineCode("🪧")} Wrong command, use : ${inlineCode("!registerowl <@user> #")}`)
  else if(userInput == undefined || userInput == ' ' || userInput == '') return message.reply(`${inlineCode("🪧")} Wrong command, use : ${inlineCode("!registerowl <@user> #")}`)
  else {
    let ALLPLAYER = await PLAYER.find();

    if(hastagAlreadyTaken(ALLPLAYER, hashtag) == false){
      let player = await PLAYER.findOne({ userId: userInput.id });

      function addOwl(player, owlSlot, hashtag){
        owlSlot.hashtagNumber = parseInt(hashtag)
        owlSlot.status = 1,
        owlSlot.health = OWLCONFIG.allOwl[parseInt(hashtag) - 1].health
        owlSlot.defenseLow = OWLCONFIG.allOwl[parseInt(hashtag) - 1].health
        owlSlot.defenseLow = OWLCONFIG.allOwl[parseInt(hashtag) - 1].health
        owlSlot.eva = Math.floor(Math.random() * 20) + 1
        owlSlot.attack = Math.floor(Math.random() * 12) + 3
        
        player.save()
        
        var unregisterEmbed = new MessageEmbed()
          .setColor('#9f5fff')
          .setTitle(`✅ Success`)
          .setDescription(`You've successfully registered **Knight Owl #${hashtag}** to ${inlineCode("@" + userInput.username)}`)
          .setTimestamp();
        message.reply({ embeds: [unregisterEmbed] })
      };

      if(!player) return message.reply(`${inlineCode("🪧")} the player mentioned is not a player...`)
      else {
        if(player.slot.owl1.hashtagNumber == -1){
          return addOwl(player, player.slot.owl1, hashtag)
        }
        if(player.slot.owl2.hashtagNumber == -1){
          return addOwl(player, player.slot.owl2, hashtag) 
        }
        if(player.slot.owl3.hashtagNumber == -1){
          return addOwl(player, player.slot.owl3, hashtag) 
        }
        if(player.slot.owl4.hashtagNumber == -1){
          return addOwl(player, player.slot.owl4, hashtag) 
        }
        if(player.slot.owl5.hashtagNumber == -1){
          return addOwl(player, player.slot.owl5, hashtag) 
        } else return message.reply(`${inlineCode("🪧")} You already have 5 owls registered...`)
      }
    } else return message.reply(`${inlineCode("🪧")} This owl is already in use...`)
  }
};

module.exports.info = {
  names: ['registerowl', 'ro', 'registero', 'rowl', 'newowl', 'register', 'owlregister', 'registero', 'owlr'],
};
