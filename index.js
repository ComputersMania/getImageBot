const Telegraf = require('telegraf')

let bot = new Telegraf(process.env.BOT_TOKEN)

if (process.env.NODE_ENV == 'production'){
  bot.telegram.setWebhook(process.env.URI + process.env.WEBHOOK)
  console.log('The webhook is at ' + process.env.URI + process.env.WEBHOOK)

  require('http')
  .createServer( bot.webhookCallback(process.env.WEBHOOK) )
  .listen(process.env.PORT)

} else {
  bot.telegram.setWebhook()
  bot.startPolling()
}

// Google api integration section
const {google} = require('googleapis')
const customsearch = google.customsearch('v1')
const {promisify} = require('util')

const listPromise = promisify(customsearch.cse.list)

if (process.env.SAFE) {
  var safe = process.env.SAFE
} else {
  var safe = 'off'
}

let getImage = async (query) => {
  console.log('Search started')
  res = await listPromise({
    key: process.env.GOOGLE_API_KEY,
    q: query,
    cx: process.env.CSE_CX,
    imgSize: 'huge',
    num: '1',
    safe: safe,
    searchType: 'image'
  }).catch( err => {throw(err)} )
  console.log('Image found at ' + res.data.items[0].link)
  return res.data.items[0].link
}

bot.command('/get', ctx => {
  let target = ctx.update.message.text.substr(5)
  console.log(ctx.from.username + ' searched ' + target)
  getImage(target).then( image => {
    ctx.replyWithPhoto(image, {
      reply_to_message_id: ctx.message.message_id
    }).catch( (err) => {
      console.error(err)
      ctx.reply(image, {
        reply_to_message_id: ctx.message.message_id
      })
    })
  })
})
