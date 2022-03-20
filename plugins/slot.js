let handler = async (m, { args, usedPrefix, command }) => {
    let fa = `
Example:
${usedPrefix + command} 100

means you bet 100 XP.

*نايس :* your bet is doubled
*لست محظوظا:* +1 XP
*خسرت:* your bet is taken`.trim()
    if (!args[0]) throw fa
    if (isNaN(args[0])) throw fa
    let taruhan = parseInt(args[0])
    let users = global.db.data.users[m.sender]
    let time = users.lastslot + 10000
    if (new Date - users.lastslot < 10000) throw `wait for ${msToTime(time - new Date())}`
    if (taruhan < 1) throw 'Minimum 1 XP!'
    if (users.exp < taruhan) {
        throw `Your XP is not enough!`
    }

    let emojis = ["🌺", "🌸", "🌼"];
    let a = Math.floor(Math.random() * emojis.length);
    let b = Math.floor(Math.random() * emojis.length);
    let c = Math.floor(Math.random() * emojis.length);
    let x = [],
        y = [],
        z = [];
    for (let i = 0; i < 3; i++) {
        x[i] = emojis[a];
        a++;
        if (a == emojis.length) a = 0;
    }
    for (let i = 0; i < 3; i++) {
        y[i] = emojis[b];
        b++;
        if (b == emojis.length) b = 0;
    }
    for (let i = 0; i < 3; i++) {
        z[i] = emojis[c];
        c++;
        if (c == emojis.length) c = 0;
    }
    let end;
    if (a == b && b == c) {
        end = `مبروك! 🥳 *+${taruhan + taruhan} XP*`
        users.exp += taruhan
    } else if (a == b || a == c || b == c) {
        end = `Less fortunate 👍 *+1 XP*`
        users.exp += 1
    } else {
        end = `لقد خسرت😥 *-${taruhan} XP*`
        users.exp -= taruhan
    }
    users.lastslot = new Date * 1
    return await conn.sendButton(m.chat,
        `*[ 🎰 | لعبة و كزا ]*

${end}

${x[0]} ${y[0]} ${z[0]}
${x[1]} ${y[1]} ${z[1]}
${x[2]} ${y[2]} ${z[2]}`.trim(), watermark, `Slot ${args[0]}`, `.slot ${args[0]}`, m)
}
handler.help = ['slot <numbee>']
handler.tags = ['game']
handler.command = /^(slots?)$/i
module.exports = handler

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

    hours = (hours < 10) ? "0" + hours : hours
    minutes = (minutes < 10) ? "0" + minutes : minutes
    seconds = (seconds < 10) ? "0" + seconds : seconds

    return minutes + " minute " + seconds + " seconds"
}
