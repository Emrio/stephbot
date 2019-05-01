const Discord = require('discord.js')
const config = require('../assets/config')

function buildHelp (commands) {
  var t = ''
  for (var cmd in commands) {
    t += ' - ** ' + cmd + '**: ' + commands[cmd] + '\n'
  }
  return t
}

module.exports = message => {
  var channel = message.channel

  var list = new Discord.RichEmbed()
    .setTitle('Liste des commandes')
    .setAuthor('StephBot', channel.client.user.avatarURL, 'https://www.youtube.com/user/1948redkyll')
    .addField('**Général 🎯**', buildHelp(config.cmdsDesc.everyone))
    .addField('**Vérifiés ✅**', buildHelp(config.cmdsDesc.verified))
    .addField('**Administrateurs 🛠**', buildHelp(config.cmdsDesc.admin))

  channel.send(list)
}
