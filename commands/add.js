// !add
// command name
// { command, syntax, versions, description, examples }

const fs = require('fs')
const path = require('path')
const config = require('../assets/config')
var commandsHelp = require('../assets/commandsHelp')

const states = {}

function buildCurrentState (state) {
  var text = ''
  switch (state.curState) {
    case 5:
      text += ''
      // fallsthrough
    case 4:
      text = 'Description: ' + state.description + '\n' + text
      // fallsthrough
    case 3:
      text = 'Syntaxe: ' + state.syntax + '\n' + text
      // fallsthrough
    case 2:
      text = 'Version: ' + state.version + '\n' + text
      // fallsthrough
    case 1:
      text = 'Commande: **' + state.command + '**\n' + text
  }
  text = 'Avancement actuel :\n' + text
  return text
}

module.exports = async message => {
  var channel = message.channel

  if (message.content === config.prefix + 'add' && message.member.roles.has('422778720835731457')) {
    states[message.author.id] = {
      curState: 0,
      curMessage: await channel.send("Processus d'ajout de commande... Tapez `exit` à tout moment pour annuler. Commencez par écrire le nom de la commande (sans le `/`)"),
      syntax: '',
      version: '',
      description: '',
      examples: [],
      command: '',
      video: {
        author: '',
        url: ''
      }
    }
  }

  var state = states[message.author.id]

  if (!state) return

  if (state.curState === 0) return state.curState++

  if (message.content === 'exit') {
    state.curMessage.delete()
    delete states[message.author.id]
    channel.send('Opération terminée')
    console.log('Opération terminée')
    return
  }

  state.curMessage.delete()

  if (state.curState === 5 && message.content === 'end') {
    var command = {
      command: state.command,
      description: state.description,
      syntax: state.syntax,
      version: state.version,
      examples: state.examples
    }
    state.curMessage.delete()
    commandsHelp.push(command)
    fs.writeFileSync(path.join(__dirname, '..', 'assets', 'commandsHelp.json'), JSON.stringify(commandsHelp, null, '\t'))
    delete require.cache[require.resolve('../assets/commandsHelp')]
    delete states[message.author.id]
    channel.send('Opération terminée')
    console.log('Saved commandsHelp.json.')
    return
  }

  switch (state.curState) {
    case 1:
      state.command = message.content
      state.curMessage = await channel.send(buildCurrentState(state) + '\nAjoutez maintenant la/les version(s) comme `1.12`, `1.13`, `1.8-1.12` (plage de versions), `*` (toutes les versions), `Bedrock` (Version non-Java seulement)')
      break
    case 2:
      state.version = message.content
      state.curMessage = await channel.send(buildCurrentState(state) + '\nAjoutez maintenant la syntaxe de la commande comme `/tellraw <players> <json message>` ou `/execute <...>`')
      break
    case 3:
      state.syntax = message.content
      state.curMessage = await channel.send(buildCurrentState(state) + '\nAjoutez maintenant une description à la commande.')
      break
    case 4:
      state.description = message.content
      state.curMessage = await channel.send(buildCurrentState(state) + '\nAjoutez maintenant des examples. Première ligne : commande (sans stylisation), deuxième ligne : description de la commande. Tapez `end` lorsque vous avez terminez.')
      break
    case 5:
      state.examples.push(message.content.split('\n'))
      state.curMessage = await channel.send(buildCurrentState(state) + '\nAjoutez maintenant des examples. Première ligne : commande (sans stylisation), deuxième ligne : description de la commande. Tapez `end` lorsque vous avez terminez.')
      break
  }

  state.curState = Math.min(state.curState + 1, 5)
}
