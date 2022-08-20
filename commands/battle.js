const Discord = require('discord.js');
const BATTLE = require('../modules/battle.js');
const CONFIGEAGLE = require('../config/configEagle.json')
const { bold, inlineCode, codeBlock, ButtonBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    var user = message.author
    var userneeded = args[0]
    var ennemie = args[1]

    if(user.id == "564050802566627358" || user.id == "369531783471038474" || user.id == "792916125784342578" || user.id == "162596374163095552" || user.id == "162595815670546433"){
            
        function ennemiReturn(ennemieInput, ennemiNeeded){
            var ennemiArray = ennemieInput.split(',')
            for(const allEnnemi of ennemiArray){
                var ennemiName = allEnnemi.substr(0, allEnnemi.length - 3)
                var ennemilevel = allEnnemi.substr(-2, 1)
                if(ennemiName == ennemiNeeded) return [true, ennemiName, ennemilevel]
            };
            return [false, 'undefined', 0]
        };


        if(isNaN(userneeded) || userneeded == undefined || userneeded == ' ' || userneeded == '') return message.reply(`${inlineCode("🪧")} Wrong command, use : ${inlineCode("!battle <# of players needed> <enemies>")}`)
        if(ennemie == undefined || ennemie == ' ') return message.reply(`${inlineCode("🪧")} Wrong command, use : ${inlineCode("!battle <# of players needed> <enemies>")}`)

        var battle = await BATTLE.findOne({ battleCreatorID : user.id })

        battle.maxUser = userneeded

        var ennemiDisplay = ``
        var ennemiStats = ``

        if(ennemiReturn(ennemie, 'eagle')[0]){
            var numberEagle = ennemiReturn(ennemie, 'eagle')[2]

            ennemiDisplay += `[${numberEagle}] Eagle(s), `
            ennemiStats += `**Eagle** - ${inlineCode("ATK: ")} ${CONFIGEAGLE.eagle.attackMin + ' - ' + CONFIGEAGLE.eagle.attackMax}, ${inlineCode("DEF: ")} ${CONFIGEAGLE.eagle.defenseMin + ' - ' + CONFIGEAGLE.eagle.defenseMax}, ${inlineCode("HP: ")} ${CONFIGEAGLE.eagle.healthMin + ' - ' + CONFIGEAGLE.eagle.healthMax}\n`
        }
        if(ennemiReturn(ennemie, 'eagle_captain')[0]){
            var numberEagleC = ennemiReturn(ennemie, 'eagle_captain')[2]

            ennemiDisplay += `[${numberEagleC}] Captain Eagle(s), `
            ennemiStats += `**Eagle Captain** - ${inlineCode("ATK: ")} ${CONFIGEAGLE.captainEagle.attackMin + ' - ' + CONFIGEAGLE.captainEagle.attackMax}, ${inlineCode("DEF: ")} ${CONFIGEAGLE.captainEagle.defenseMin + ' - ' + CONFIGEAGLE.captainEagle.defenseMax}, ${inlineCode("HP: ")} ${CONFIGEAGLE.captainEagle.healthMin + ' - ' + CONFIGEAGLE.captainEagle.healthMax}\n`
        }
        if(ennemiReturn(ennemie, 'eagle_king')[0]){
            var numberEagleK = ennemiReturn(ennemie, 'eagle_king')[2]

            ennemiDisplay += `[${numberEagleK}] King Eagle(s), `
            ennemiStats += `**Eagle King** - ${inlineCode("ATK: ")} ${CONFIGEAGLE.kingEagle.attackMin + ' - ' + CONFIGEAGLE.kingEagle.attackMax}, ${inlineCode("DEF: ")} ${CONFIGEAGLE.kingEagle.defenseMin + ' - ' + CONFIGEAGLE.kingEagle.defenseMax}, ${inlineCode("HP: ")} ${CONFIGEAGLE.kingEagle.healthMin + ' - ' + CONFIGEAGLE.kingEagle.healthMax}\n`
        }
        if(ennemiReturn(ennemie, 'eagle_god')[0]){
            var numberEagleG = ennemiReturn(ennemie, 'eagle_god')[2]

            ennemiDisplay += `[${numberEagleG}] God Eagle(s), `
            ennemiStats += `**Eagle God** - ${inlineCode("ATK: ")} ${CONFIGEAGLE.godEagle.attackMin + ' - ' + CONFIGEAGLE.godEagle.attackMax}, ${inlineCode("DEF: ")} ${CONFIGEAGLE.godEagle.defenseMin + ' - ' + CONFIGEAGLE.godEagle.defenseMax}, ${inlineCode("HP: ")} ${CONFIGEAGLE.godEagle.healthMin + ' - ' + CONFIGEAGLE.godEagle.healthMax}\n`
        }

        var eagleAmout = ennemiReturn(ennemie, 'eagle')[2]
        var eagleCaptainAmout = ennemiReturn(ennemie, 'eagle_captain')[2]
        var eagleKingAmout = ennemiReturn(ennemie, 'eagle_king')[2]
        var eagleGodAmout = ennemiReturn(ennemie, 'eagle_god')[2]

        battle.ennemi.eagle = 0
        battle.ennemi.eagleCaptain = 0
        battle.ennemi.eagleKing = 0
        battle.ennemi.eagleGod = 0
        battle.battleMember = []

        if(eagleAmout >= 1) battle.ennemi.eagle = eagleAmout
        if(eagleCaptainAmout >= 1) battle.ennemi.eagleCaptain = eagleCaptainAmout
        if(eagleKingAmout >= 1) battle.ennemi.eagleKing = eagleKingAmout
        if(eagleGodAmout >= 1) battle.ennemi.eagleGod = eagleGodAmout

        var statusEmbed = new MessageEmbed()
            .setColor('#9f5fff')
            .setTitle(`⌛ Waiting for players...`)
            .setDescription(`Calling all owls ! ${inlineCode(ennemiDisplay.substr(0, ennemiDisplay.length - 2))} are approching and we need ${inlineCode(`[${userneeded}] owls`)} to defend.\nReact with ${inlineCode("⚔️")} to endlist your owl!\n\n${ennemiStats}`)
            .setTimestamp();
        message.reply({ embeds: [statusEmbed] }).then(msg=>{
            msg.react("⚔️")
        })

        client.on('messageReactionAdd', async (reaction, userReact) => {
            if(!userReact.bot){
                battle.battleMember.push(userReact.id)
                battle.save()
            }
        });

        client.on('messageReactionRemove', async (reaction, userReact) => {
            battle.battleMember.splice(battle.battleMember.indexOf(userReact.id), 1);
            battle.save()
        });
    } else return message.reply(`${inlineCode("🪧")} You don't have the permission to create a battle`)
};

module.exports.info = {
    names: ['battle'],
};
