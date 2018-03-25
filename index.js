const Telegraf = require('telegraf')

let bot = new Telegraf(process.env.BOT_TOKEN)

console.log('The webhook is at ' + process.env.URI + process.env.WEBHOOK)

bot.telegram.setWebhook(process.env.URI + process.env.WEBHOOK)

require('http')
  .createServer( bot.webhookCallback(process.env.WEBHOOK) )
  .listen(process.env.PORT)

//bot.use( ctx => {
//  console.log(ctx.update.message.text)
//})

bot.command('/get', ctx => {
  let target = ctx.update.message.text.substr(5)
  console.log(target)
  ctx.reply( 'You are searching for ' + target )
})
