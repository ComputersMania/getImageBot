const Telegraf = require('telegraf')

let bot = new Telegraf(process.env.BOT_TOKEN)

bot.telegram.setWebhook(process.env.URI + ':' + process.env.PORT + process.env.WEBHOOK)

require('http')
  .createServer( bot.webhookCallback(process.env.WEBHOOK) )
  .listen(process.env.PORT)
