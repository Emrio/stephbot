const Discord = require('discord.js')

function buildEmbed (cmds) {
  var embed = new Discord.RichEmbed()
    .setAuthor('StephBot', 'https://cdn.discordapp.com/attachments/239784538077659137/558654818470592536/logo-YouTube2.png')
    .setColor('#394cd3')
    .setTitle("Fiche d'aide commande")

  for (var command of cmds) {
    var text = ''
    text += command.description + '\n'
    text += 'Version : **' + (command.version === '*' ? 'Toutes les versions' : command.version) + '**\n'
    text += 'Syntaxe :\n```\n' + command.syntax + '\n```\n\n'
    text += 'Ressources :\n'
    text += ' - Minecraft Wiki : [ Commande /' + command.command + '](https://minecraft.gamepedia.com/Commands/' + command.command + ')\n'
    text += command.video ? ' - Vidéo : [ Vidéo de ' + command.video.author + ' ](' + command.video.url + ')' : ''
    embed.addField(':arrow_right: **/' + command.command + '**', text)
    if (command.examples.length) {
      text = ''
      for (var example of command.examples) {
        text += example[1] + '\n```\n' + example[0] + '\n```\n'
      }
      embed.addField("<:crafting_table:422781431996219394> Examples d'utilisation", text)
    }
  }

  return embed
}

module.exports = message => {
  const commands = require('../assets/commandsHelp')

  var channel = message.channel

  var command = message.content.split(' ')[1]

  if (!command) return channel.send('Veuillez donner une commande en argument.')

  var filtered = commands.filter(cmd => cmd.command === command)

  if (!filtered.length) return channel.send('Veuillez donner en argument une commande de Minecraft (1.12 et 1.13)')
  channel.send(buildEmbed(filtered))
}
