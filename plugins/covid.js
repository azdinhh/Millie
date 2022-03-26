let fetch = require('node-fetch')
let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `uhm.. the country?\n\nexample:\n${usedPrefix + command} morocco`
  let res = await fetch(global.API('https://covid19.mathdro.id', '/api/countries/' + (text)))
  if (!res.ok) throw await `${res.status} ${res.statusText}`
  let json = await res.json()
  if (json.confirmed) m.reply(`
الدولة : ${text}
الحالات المؤكدة : ${json.confirmed.value}
المشكوك بها 😂 : ${json.recovered.value}
الوفيات : ${json.deaths.value}
آخر تحديث : ${json.lastUpdate}
\n\n@الغربي`.trim())
  else throw json
}
handler.help = ['covid'].map(v => v + ' <country>')
handler.tags = ['internet']
handler.command = /^(corona|covid|covid19|كوفيد)$/i
//susu
module.exports = handler
