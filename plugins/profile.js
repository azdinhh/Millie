let PhoneNumber = require('awesome-phonenumber')
let levelling = require('../lib/levelling')
let handler = async (m, { conn, usedPrefix }) => {
  let pp = './src/avatar_contact.png'
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  try {
    pp = await conn.getProfilePicture(who)
  } catch (e) {

  } finally {
    let about = (await conn.getStatus(who).catch(console.error) || {}).status || ''
    if (typeof global.db.data.users[who] == "undefined") {
      global.db.data.users[who] = {
        exp: 0,
        limit: 10,
        lastclaim: 0,
        registered: false,
        name: conn.getName(m.sender),
        age: -1,
        regTime: -1,
        afk: -1,
        afkReason: '',
        banned: false,
        level: 0,
        call: 0,
        role: 'Warrior V',
        autolevelup: false,
        pc: 0,
      }
    }
    let { name, limit, exp, lastclaim, registered, regTime, age, level, role, banned } = global.db.data.users[who]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let username = conn.getName(who)
    let math = max - xp
    let str = `
الاسم: ${username} ${registered ? '(' + name + ') ' : ''}(@${who.replace(/@.+/, '')})${about != 401 ? '\nInfo: ' + about : ''}
الرقم: ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
الرابط: https://wa.me/${who.split`@`[0]}${registered ? '\nUmur: ' + age : ''}
عضوية الاشتراك: ${prems.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender) ? 'Yes' : 'No'}
Re
التفعيل: ${registered ? 'Ya (' + new Date(regTime).toLocaleString() + ')' : 'Registered'}${lastclaim > 0 ? '\nLast Claim: ' + new Date(lastclaim).toLocaleString() : ''}
`.trim()
    let mentionedJid = [who]
    conn.sendFile(m.chat, pp, 'pp.jpg', banned ? 'if you get banned' : str, m, false, { contextInfo: { mentionedJid } })
  }
}
handler.help = ['profile [@user]']
handler.tags = ['tools']
handler.command = /^profile?$/i
module.exports = handler

