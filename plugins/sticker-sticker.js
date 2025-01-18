import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'

let handler = async (m, { conn, args, usedPrefix, command, text }) => {
let stiker = false
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let autor = await conn.getName(who)
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || q.mediaType || ''

if (!/webp|image|video/g.test(mime) && !text) return m.reply(`*⚠️ 𝑹𝑬𝑺𝑷𝑶𝑵𝑫𝑬 𝑨 𝑼𝑵𝑨 𝑰𝑴𝑨𝑮𝑬𝑵 𝑶 𝑽𝑰𝑫𝑬𝑶 𝑪𝑶𝑵 ${usedPrefix + command}*`)
if (/video/g.test(mime)) if ((q.msg || q).seconds > 10) return m.reply('*⚠️ 𝑬𝑳 VÍ𝑫𝑬𝑶 𝑵𝑶 𝑷𝑼𝑬𝑫𝑬 𝑫𝑼𝑹𝑨𝑹 𝑴𝑨𝑺 𝑫𝑬 7 𝑺𝑬𝑮𝑼𝑵𝑫𝑶𝑺*')

if (/webp|image|video/g.test(mime)) {
let img = await q.download?.()
let out
stiker = await sticker(img, false, global.packname, global.author)
await conn.reply(m.chat, `_𝑪𝒂𝒍𝒎𝒂 𝒄𝒓𝒂𝒄𝒌 𝒆𝒔𝒕𝒐𝒚 𝒉𝒂𝒄𝒊𝒆𝒏𝒅𝒐 𝒕𝒖 𝒔𝒕𝒊𝒄𝒌𝒆𝒓 👏_\n\n_*Recuerda los stickersgif son de 6 segundos*_\n\n_*by DiabloBot-MD*_`, m)

if (!stiker) {
if (/webp/g.test(mime)) out = await webp2png(img)
else if (/image/g.test(mime)) out = await uploadImage(img)
else if (/video/g.test(mime)) out = await uploadFile(img)
if (typeof out !== 'string') out = await uploadImage(img)
stiker = await sticker(false, out, global.packname, global.author)

if (!stiker) errorMessage = 'ERROR'
}} else if (args[0]) {
if (isUrl(args[0])) stiker = await sticker(false, args[0], global.packname, global.author)
else return m.reply('*⚠️ EL ENLACE / URL / LINK NO ES VÁLIDO*')}

if (stiker) {
conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
} else {
console.log(stiker)
}}

handler.command = /^(s(tickers?)?(image|video|gif|img)?)$/i
export default handler

const isUrl = (text) => {
return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))}