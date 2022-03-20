let handler = async (m, { conn, text, participants }) => {
    let users = participants.map(u => u.jid)
    m.reply(`${text ? `${text}\n` : ''}┌─〔 *منشن جماعي* 〕\n` + users.map(v => '├ @' + v.replace(/@.+/, '')).join`\n` + '\n└────', null, {
        contextInfo: { mentionedJid: users }
    })
}

handler.help = ['otagall']
handler.tags = ['owner']
handler.command = ['tagall|منشن']

handler.owner = true

module.exports = handler
