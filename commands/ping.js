const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
  message.reply('Pong !')
}

module.exports.info = {
  names: ['ping'],
};
