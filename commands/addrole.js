// const Discord = require('discord.js')
const fs = require('fs')
const path = require('path')
const config = require('../assets/config')

module.exports = message => {
  if (!message.member.hasPermission('ADMINISTRATOR')) {
    console.log(message.author.username + ' has insufficent permissions')
    return message.channel.send("Vous n'avez pas les permissions nécessaires pour utiliser cette commande.")
  }

  var channel = message.channel
  var guildRoles = channel.guild.roles

  var arg = message.content.substring((config.prefix + 'addrole ').length)

  var role = guildRoles.find(r => r.name.toLowerCase() === arg.toLowerCase())

  if (config.autorole.includes(arg.toLowerCase()) || !role) {
    return channel.send("Rôle inexistant ou déjà ajouté à l'autorole")
  }

  config.autorole.push(arg.toLowerCase())
  fs.writeFile(path.join(__dirname, '..', 'assets', 'config.json'), JSON.stringify(config, null, '\t'), err => {
    if (err) {
      console.error('addrole : could not add role ' + arg + ' due to fs error.', err)
      return message.channel.send("Une erreur s'est produite lors de l'ajout du rôle dans la liste des autorole")
    }
    console.log('Role added to autorole: ' + arg)
    message.channel.send('Rôle ajouté avec succès')
  })
}
