const Discord = require('discord.js')
const config = require('./assets/config')
const handlers = require('./commands')

const Bot = new Discord.Client()

Bot.on('ready', () => {
  console.log('[StephBot] (🔔) I am ready!')
  Bot.user.setActivity(config.presence.text, { type: config.presence.type })
})

Bot.on('guildMemberAdd', member => {
  console.log('[StephBot] (🆕) New member joined : ' + member.user.username)
  var guild = member.guild
  var role = guild.roles.find(r => r.name === config.memberRole)
  member.addRole(role).catch(console.error)
})

Bot.on('error', err => {
  if (err.error.code === 'ENOTFOUND' || err.error.code === 'ETIMEDOUT' || err.error.code === 'ECONNRESET') {
    return console.warn('[StephBot] (🌐) Connection perdue...')
  }
  console.error('Outch, we got an error!')
  console.error(err)
})

Bot.on('message', message => {
  console.log(message.content)

  if (!message || message.author.bot) return

  handlers.add(message)

  if (!message.content.startsWith(config.prefix)) return

  var command = message.content.substring(config.prefix.length).split(' ')[0]

  return command !== 'add' && handlers[command] ? handlers[command](message) : null
})

Bot.login(config.token)
