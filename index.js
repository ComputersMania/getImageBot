const Telegraf = require('telegraf')

let bot = new Telegraf(process.env.BOT_TOKEN)

//bot.telegram.setWebHook(process.env.URI + ':' + process.env.WEBHOOK)

//bot.telegram.startWebHook(process.env.WEBHOOK, process.env.PORT)


console.log(process.env.PORT)
console.warn(typeof process.env.PORT)
