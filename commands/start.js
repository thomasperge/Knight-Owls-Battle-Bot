const PLAYER = require('../modules/player.js')
const BATTLE = require('../modules/battle.js');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { inlineCode } = require('@discordjs/builders')

module.exports.run = async (client, message, args) => {
    var user = message.author

    var playerCreateEmbed = new MessageEmbed()
        .setColor('#9f5fff')
        .setTitle(`✅ ${user.username}'s Account`)
        .setTimestamp();

    // ======= PLAYER DATA =======
    PLAYER.findOne({ userId: user.id },
        (err, economie) => {
            if (err) console.log(err)
            if (!economie) {
                var playerSchema = new PLAYER({
                    userId: user.id,
                    pseudo: user.username,
                    slot: {
                        owl1: {
                            hashtagNumber: -1,
                            health: 0,
                            defense: 0,
                            eva: 0,
                            attack: 0,
                        }, 
                        owl2: {
                            hashtagNumber: -1,
                            health: 0,
                            defense: 0,
                            eva: 0,
                            attack: 0,
                        },
                        owl3: {
                            hashtagNumber: -1,
                            health: 0,
                            defense: 0,
                            eva: 0,
                            attack: 0,
                        }, 
                        owl4: {
                            hashtagNumber: -1,
                            health: 0,
                            defense: 0,
                            eva: 0,
                            attack: 0,
                        }, 
                        owl5: {
                            hashtagNumber: -1,
                            health: 0,
                            defense: 0,
                            eva: 0,
                            attack: 0,
                        }, 
                    },
                })
                playerSchema.save()

                playerCreateEmbed.addField(`${inlineCode("✅")} New player !`,`📜 Have you become the greatest master of owls!\n`);
                message.reply({ embeds: [playerCreateEmbed] })

            } else {
                message.reply(`${inlineCode("🪧")} You are already a player... !`);
            };
        }
    );

    if(user.id == "564050802566627358" || user.id == "369531783471038474"){
        console.log(user.id)
        BATTLE.findOne({ battleCreatorID: user.id },
            (err, battle) => {
                if (err) console.log(err)
                if (!battle) {
                    var battleSchema = new BATTLE({
                        battleCreatorID: user.id,
                        battleMember: [],
                        maxUser: 0,
                        ennemi : {
                            eagle: 0,
                            eagleCaptain: 0,
                            eagleKing: 0,
                            eagleGod: 0
                        }
                    })
                    battleSchema.save()
                }
            }
        );
    }

};

module.exports.info = {
    names: ['create', 'start', 'account', 'newaccount', 'begin'],
};
