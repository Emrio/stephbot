const Discord = require('discord.js')
const config = require('../assets/config')

module.exports = message => {
  var channel = message.channel

  var list = new Discord.RichEmbed()
    .setTitle('Liste des rôles auto-attribuables')
    .setAuthor('StephBot', channel.client.user.avatarURL, 'https://www.youtube.com/user/1948redkyll')
    .addField('Utilisez `!autorole <role>` pour vous attribuer ou retirer un des rôle ci-dessous', ' - **' + config.autorole.join('**\n - **') + '**')

  channel.send(list)
}
