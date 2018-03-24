const Telegraf = require('telegraf')

let bot = new Telegraf(process.env.BOT_TOKEN)

console.log('The webhook is at ' + process.env.URI + '/' + process.env.WEBHOOK)

bot.telegram.setWebhook(process.env.URI + '/' + process.env.WEBHOOK)

require('http')
  .createServer( bot.webhookCallback(process.env.WEBHOOK) )
  .listen(process.env.PORT)
