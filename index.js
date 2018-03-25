const Telegraf = require('telegraf')

let bot = new Telegraf(process.env.BOT_TOKEN)

console.log('The webhook is at ' + process.env.URI + process.env.WEBHOOK)

bot.telegram.setWebhook(process.env.URI + process.env.WEBHOOK)

require('http')
  .createServer( bot.webhookCallback(process.env.WEBHOOK) )
  .listen(process.env.PORT)

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
  res = await listPromise({
    key: process.env.GOOGLE_API_KEY,
    q: query,
    cx: process.env.CSE_CX,
    imgSize: 'huge',
    num: '1',
    safe: safe,
    searchType: 'image'
  })
  return res.data.items[0].link
}

bot.command('/get', ctx => {
  let target = ctx.update.message.text.substr(5)
  console.log('Searched ' + target)
  console.log(ctx.message)
  getImage(target).then( image => {
    ctx.replyWithPhoto(null, {
      photo: image
    })
    console.log('Replied')
  })
})
