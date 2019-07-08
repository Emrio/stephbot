// const Discord = require('discord.js')
const fs = require('fs')
const path = require('path')
const config = require('../assets/config')

module.exports = message => {
  if (!message.member.hasPermission('ADMINISTRATOR')) {
    console.log(message.author.username + ' has insufficent permissions')
    return message.channel.send("Vous n'avez pas les permissions nécessaires pour utiliser cette commande.")
  }

  var args = message.content.substring((config.prefix + 'presence ').length)

  var type = args.split(' ', 1)[0]
  var text = args.substring(type.length).trim()

  if (!(type && text)) {
    return message.channel.send('Vous devez spécifier à la fois un type de présence et un texte de présence')
  }

  if (!['watching', 'playing', 'streaming', 'listening'].includes(type)) {
    return message.channel.send('Type de présence incorrect. Les types de présences sont `watching`, `playing`, `streaming` et `listening`')
  }

  message.client.user.setPresence({ game: { name: text, type: type.toUpperCase() } })

  config.presence = { type: type.toUpperCase(), text: text }

  console.log('aaaabbbb')

  fs.writeFile(path.join(__dirname, '..', 'assets', 'config.json'), JSON.stringify(config, null, '\t'), err => {
    if (err) {
      console.error('Could not save presence information')
      return message.channel.send("Une erreur s'est produite lors de la mise à jour de la présence : impossible de sauvegarder")
    }
    console.log('aaaaa')
    console.log(`Presence changed to ${type} : ${text}`)
    message.channel.send('Présence mise à jour et sauvegardée !')
  })
}
