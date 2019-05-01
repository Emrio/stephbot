// const Discord = require('discord.js')
const config = require('../assets/config')

module.exports = message => {
  var channel = message.channel
  var guildRoles = channel.guild.roles

  var arg = message.content.substring((config.prefix + 'autorole ').length)

  var role = guildRoles.find(r => r.name.toLowerCase() === arg.toLowerCase())
  var member = message.member

  if (!config.autorole.includes(arg.toLowerCase()) || !role) {
    return channel.send("Rôle inconnue ou non disponible pour l'autorole.")
  }

  if (member.roles.has(role.id)) {
    member.removeRole(role)
      .then(() => {
        console.log('Removed role ' + arg + ' to ' + message.author.username)
        channel.send('Votre rôle ' + arg + ' a été retiré avec succès !')
      })
      .catch(err => {
        console.error(err)
        channel.send("Une erreur s'est produite lors de la rétraction du rôle.")
      })
  } else {
    member.addRole(role)
      .then(() => {
        console.log('Added role ' + arg + ' to ' + message.author.username)
        channel.send('Votre rôle ' + arg + ' a été ajouté avec succès !')
      })
      .catch(err => {
        console.error(err)
        channel.send("Une erreur s'est produite lors de l'ajout du rôle.")
      })
  }
}
