require("./global")
const axios = require('axios').default
const BodyForm = require('form-data')
const { exec, spawn } = require("child_process")
const ffmpeg = require('fluent-ffmpeg')
const fs = require('fs')
const moment = require('moment-timezone')
const toMs = require('ms')
const ms = require('parse-ms')
const speed = require('performance-now')
const request = require('request')
const { color, fetchUrl, isUrl, getRandom, sleep } = require("./lib/function")
const { menu } = require('./lib/message')

module.exports = async (sock, m) => {
    try {
        const { type, isGroup, sender, from } = m
        const body = (type == "buttonsResponseMessage") ? m.message[type].selectedButtonId : (type == "listResponseMessage") ? m.message[type].singleSelectReply.selectedRowId : (type == "templateButtonReplyMessage") ? m.message[type].selectedId : m.text 
        const senderName = m.pushName
        const senderNumber = sender.split('@')[0]
        const groupMetadata = isGroup ? await sock.groupMetadata(from) : null
        const groupName = groupMetadata?.subject || ''
        const groupMembers = groupMetadata?.participants || []
        const groupAdmins = groupMembers.filter((v) => v.admin).map((v) => v.id)
        const isGroupAdmins = groupAdmins.includes(sender)
        const isBotGroupAdmins = groupAdmins.includes(sock.user?.jid)
        const isOwner = [sock.user?.jid, ...config.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(sender)

        global.isPremium = user.checkPremiumUser(m.sender, _user)
        global.isAntidelete = group.cekAntidelete(m.from, _group)
        global.isOffline = group.cekOffline(from, _group)
        global.isAntilink = group.cekAntilink(m.from, _group)

        user.expiredCheck(sock, m, _user)
        user.addUser(m.sender, m.pushName, _user)
        if (isGroup) group.addGroup(m.from)

        const isCmd = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\\\©^]/.test(body) && sock.sendPresenceUpdate('composing', from)
        const prefix = isCmd ? body[0] : ''
        const command = isCmd ? body.slice(1).trim().split(' ').shift().toLowerCase() : ''
        const quoted = m.quoted ? m.quoted : m
        const mime = (quoted.msg || m.msg)
        const isMedia = /image|video|sticker|audio/.test(mime)
        const budy = (typeof m.text == "string" ? m.text : "")
        const args = body.trim().split(' ').slice(1)
        const fargs = body.replace(command, '').slice(1).trim()
        const ar = args.map((v) => v.toLowerCase())
        const text = q = args.join(" ")    
        const time = moment().tz(config.timezone).format('HH:mm:ss')

        if (!isGroup && !isCmd) console.log(color(`[ ${time} ]`, 'white'), color('[ PRIVATE ]', 'yellow'), color(body.slice(0, 50), 'white'), 'from', color(senderNumber, 'yellow'))
        if (isGroup && !isCmd) console.log(color(`[ ${time} ]`, 'white'), color('[  GROUP  ]', 'yellow'), color(body.slice(0, 50), 'white'), 'from', color(senderNumber, 'yellow'), 'in', color(groupName, 'yellow'))
        if (!isGroup && isCmd) console.log(color(`[ ${time} ]`, 'white'), color('[ COMMAND ]', 'yellow'), color(body, 'white'), 'from', color(senderNumber, 'yellow'))
        if (isGroup && isCmd) console.log(color(`[ ${time} ]`, 'white'), color('[ COMMAND ]', 'yellow'), color(body, 'white'), 'from', color(senderNumber, 'yellow'), 'in', color(groupName, 'yellow'))

        if (config.options.self && !isOwner && !m.fromMe) return

        if (asahotak.hasOwnProperty(m.sender.split('@')[0]) && !isCmd) {
            jawaban = asahotak[m.sender.split('@')[0]]
            if (budy.toLowerCase() == jawaban) {
                await sock.sendMessage(m.from, { text:`Selamat Jawaban ${budy} Benar 🎉\n\nIngin bermain lagi? Tekan Tombol Lanjut dibawah\n`, footer:'Entertainment\nPowered By https://zenzapis.xyz', buttons:[{ buttonId: '.asahotak', buttonText:{ displayText:'Lanjut'}, type:1 }], headerType:4 }, { quoted: m })
                delete asahotak[m.sender.split('@')[0]]
            } else m.reply('*Jawaban Salah!*')
        }
        if (caklontong.hasOwnProperty(m.sender.split('@')[0]) && !isCmd) {
            jawaban = caklontong[m.sender.split('@')[0]]
            if (budy.toLowerCase() == jawaban) {
                await sock.sendMessage(m.from, { text:`Selamat Jawaban ${budy} Benar 🎉\n\nIngin bermain lagi? Tekan Tombol Lanjut dibawah\n`, footer:'Entertainment\nPowered By https://zenzapis.xyz', buttons:[{ buttonId: '.caklontong', buttonText:{ displayText:'Lanjut'}, type:1 }], headerType:4 }, { quoted: m })
                delete caklontong[m.sender.split('@')[0]]
            } else m.reply('*Jawaban Salah!*')
        }
        if (family100.hasOwnProperty(m.sender.split('@')[0]) && !isCmd) {
            jawaban = family100[m.sender.split('@')[0]]
            result = Array.from(jawaban).find((v) => v === budy)
            if (budy.toLowerCase() == result) {
                await sock.sendMessage(m.from, { text:`Benar Salah Satu Jawabanya Adalah ${budy} Selamat 🎉\n\nIngin bermain lagi? Tekan Tombol Lanjut dibawah\n`, footer:'Entertainment\nPowered By https://zenzapis.xyz', buttons:[{ buttonId: '.family100', buttonText:{ displayText:'Lanjut'}, type:1 }], headerType:4 }, { quoted: m })
                delete family100[m.sender.split('@')[0]]
            } else m.reply('*Jawaban Salah!*')
        }
        if (siapakah.hasOwnProperty(m.sender.split('@')[0]) && !isCmd) {
            jawaban = siapakah[m.sender.split('@')[0]]
            if (budy.toLowerCase() == jawaban) {
                await sock.sendMessage(m.from, { text:`Selamat Jawaban ${budy} Benar 🎉\n\nIngin bermain lagi? Tekan Tombol Lanjut dibawah\n`, footer:'Entertainment\nPowered By https://zenzapis.xyz', buttons:[{ buttonId: '.siapakah', buttonText:{ displayText:'Lanjut'}, type:1 }], headerType:4 }, { quoted: m })
                delete siapakah[m.sender.split('@')[0]]
            } else m.reply('*Jawaban Salah!*')
        }
        if (susunkata.hasOwnProperty(m.sender.split('@')[0]) && !isCmd) {
            jawaban = susunkata[m.sender.split('@')[0]]
            if (budy.toLowerCase() == jawaban) {
                await sock.sendMessage(m.from, { text:`Selamat Jawaban ${budy} Benar 🎉\n\nIngin bermain lagi? Tekan Tombol Lanjut dibawah\n`, footer:'Entertainment\nPowered By https://zenzapis.xyz', buttons:[{ buttonId: '.susunkata', buttonText:{ displayText:'Lanjut'}, type:1 }], headerType:4 }, { quoted: m })
                delete susunkata[m.sender.split('@')[0]]
            } else m.reply('*Jawaban Salah!*')
        }
        if (tebakbendera.hasOwnProperty(m.sender.split('@')[0]) && !isCmd) {
            jawaban = tebakbendera[m.sender.split('@')[0]]
            if (budy.toLowerCase() == jawaban) {
                await sock.sendMessage(m.from, { text:`Selamat Jawaban ${budy} Benar 🎉\n\nIngin bermain lagi? Tekan Tombol Lanjut dibawah\n`, footer:'Entertainment\nPowered By https://zenzapis.xyz', buttons:[{ buttonId: '.tebakbendera', buttonText:{ displayText:'Lanjut'}, type:1 }], headerType:4 }, { quoted: m })
                delete tebakbendera[m.sender.split('@')[0]]
            } else m.reply('*Jawaban Salah!*')
        }
        if (tebakgambar.hasOwnProperty(m.sender.split('@')[0]) && !isCmd) {
            jawaban = tebakgambar[m.sender.split('@')[0]]
            if (budy.toLowerCase() == jawaban) {
                await sock.sendMessage(m.from, { text:`Selamat Jawaban ${budy} Benar 🎉\n\nIngin bermain lagi? Tekan Tombol Lanjut dibawah\n`, footer:'Entertainment\nPowered By https://zenzapis.xyz', buttons:[{ buttonId: '.tebakgambar', buttonText:{ displayText:'Lanjut'}, type:1 }], headerType:4 }, { quoted: m })
                delete tebakgambar[m.sender.split('@')[0]]
            } else m.reply('*Jawaban Salah!*')
        }
        if (tebakkabupaten.hasOwnProperty(m.sender.split('@')[0]) && !isCmd) {
            jawaban = tebakkabupaten[m.sender.split('@')[0]]
            if (budy.toLowerCase() == jawaban) {
                await sock.sendMessage(m.from, { text:`Selamat Jawaban ${budy} Benar 🎉\n\nIngin bermain lagi? Tekan Tombol Lanjut dibawah\n`, footer:'Entertainment\nPowered By https://zenzapis.xyz', buttons:[{ buttonId: '.tebakkabupaten', buttonText:{ displayText:'Lanjut'}, type:1 }], headerType:4 }, { quoted: m })
                delete tebakkabupaten[m.sender.split('@')[0]]
            } else m.reply('*Jawaban Salah!*')
        }
        if (tebakkalimat.hasOwnProperty(m.sender.split('@')[0]) && !isCmd) {
            jawaban = tebakkalimat[m.sender.split('@')[0]]
            if (budy.toLowerCase() == jawaban) {
                await sock.sendMessage(m.from, { text:`Selamat Jawaban ${budy} Benar 🎉\n\nIngin bermain lagi? Tekan Tombol Lanjut dibawah\n`, footer:'Entertainment\nPowered By https://zenzapis.xyz', buttons:[{ buttonId: '.tebakkalimat', buttonText:{ displayText:'Lanjut'}, type:1 }], headerType:4 }, { quoted: m })
                delete tebakkalimat[m.sender.split('@')[0]]
            } else m.reply('*Jawaban Salah!*')
        }
        if (tebakkata.hasOwnProperty(m.sender.split('@')[0]) && !isCmd) {
            jawaban = tebakkata[m.sender.split('@')[0]]
            if (budy.toLowerCase() == jawaban) {
                await sock.sendMessage(m.from, { text:`Selamat Jawaban ${budy} Benar 🎉\n\nIngin bermain lagi? Tekan Tombol Lanjut dibawah\n`, footer:'Entertainment\nPowered By https://zenzapis.xyz', buttons:[{ buttonId: '.tebakkata', buttonText:{ displayText:'Lanjut'}, type:1 }], headerType:4 }, { quoted: m })
                delete tebakkata[m.sender.split('@')[0]]
            } else m.reply('*Jawaban Salah!*')
        }
        if (tebaklagu.hasOwnProperty(m.sender.split('@')[0]) && !isCmd) {
            jawaban = tebaklagu[m.sender.split('@')[0]]
            if (budy.toLowerCase() == jawaban) {
                await sock.sendMessage(m.from, { text:`Selamat Jawaban ${budy} Benar 🎉\n\nIngin bermain lagi? Tekan Tombol Lanjut dibawah\n`, footer:'Entertainment\nPowered By https://zenzapis.xyz', buttons:[{ buttonId: '.tebaklagu', buttonText:{ displayText:'Lanjut'}, type:1 }], headerType:4 }, { quoted: m })
                delete tebaklagu[m.sender.split('@')[0]]
            } else m.reply('*Jawaban Salah!*')
        }
        if (tekateki.hasOwnProperty(m.sender.split('@')[0]) && !isCmd) {
            jawaban = tekateki[m.sender.split('@')[0]]
            if (budy.toLowerCase() == jawaban) {
                await sock.sendMessage(m.from, { text:`Selamat Jawaban ${budy} Benar 🎉\n\nIngin bermain lagi? Tekan Tombol Lanjut dibawah\n`, footer:'Entertainment\nPowered By https://zenzapis.xyz', buttons:[{ buttonId: '.tekateki', buttonText:{ displayText:'Lanjut'}, type:1 }], headerType:4 }, { quoted: m })
                delete tekateki[m.sender.split('@')[0]]
            } else m.reply('*Jawaban Salah!*')
        }
        if (tebaklirik.hasOwnProperty(m.sender.split('@')[0]) && !isCmd) {
            jawaban = tebaklirik[m.sender.split('@')[0]]
            if (budy.toLowerCase() == jawaban) {
                await sock.sendMessage(m.from, { text:`Selamat Jawaban ${budy} Benar 🎉\n\nIngin bermain lagi? Tekan Tombol Lanjut dibawah\n`, footer:'Entertainment\nPowered By https://zenzapis.xyz', buttons:[{ buttonId: '.tebaklirik', buttonText:{ displayText:'Lanjut'}, type:1 }], headerType:4 }, { quoted: m })
                delete tebaklirik[m.sender.split('@')[0]]
            } else m.reply('*Jawaban Salah!*')
        }
        if (tebaktebakan.hasOwnProperty(m.sender.split('@')[0]) && !isCmd) {
            jawaban = tebaktebakan[m.sender.split('@')[0]]
            if (budy.toLowerCase() == jawaban) {
                await sock.sendMessage(m.from, { text:`Selamat Jawaban ${budy} Benar 🎉\n\nIngin bermain lagi? Tekan Tombol Lanjut dibawah\n`, footer:'Entertainment\nPowered By https://zenzapis.xyz', buttons:[{ buttonId: '.tebaktebakan', buttonText:{ displayText:'Lanjut'}, type:1 }], headerType:4 }, { quoted: m })
                delete tebaktebakan[m.sender.split('@')[0]]
            } else m.reply('*Jawaban Salah!*')
        }

        switch (command) {

            // ANIMEWEB COMMNAND
            case 'animeplanet': {
                if (!q) return m.reply(`Example: ${prefix + command} query`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/animeweb/animeplanet", { query: q }, "apikey"))
                let caption = `Animeplanet Search :\n\n`
                for (let i of fetch.result) {
                    caption += `⭔ Title : ${i.manga_name}\n`
                    caption += `⭔ Link : ${i.manga_url}\n\n`
                }
                sock.sendText(m.from, caption, m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'doujindesu': {
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                if (isUrl(text)) {
                    let fetch = await fetchUrl(`https://zenzapis.herokuapp.com/doujin?url=${isUrl(text)[0]}&key=andaracantik`)
                    let caption = `Doujindesu Search :\n\n`
                    let i = fetch.result
                    caption += `⭔ Title : ${i.title}\n`
                    caption += `⭔ Date : ${i.date}\n`
                    caption += `⭔ Url : ${i.url}\n`
                    caption += `⭔ Image Length : ${i.image.length}\n`
                    let buttons = [
                        { buttonId: `${prefix}doujindesupdf ${text}`, buttonText: { displayText: 'Download PDF'}, type: 1 },
                    ]
                    let buttonMessage = {
                        image: { url: i.image[1] },
                        caption: caption,
                        footer: config.footer,
                        buttons: buttons,
                        headerType: 4
                    }
                    sock.sendMessage(m.from, buttonMessage, { quoted: m })
                    user.limitAdd(m.sender, isPremium, isOwner, _user)
                } else if (text) {
                    let fetch = await fetchUrl(global.api("zenz", "/animeweb/doujindesu/search", { query: text }, "apikey"))
                    let caption = `Doujindesu Search :\n\n`
                    for (let i of fetch.result) {
                        caption += `⭔ Title : ${i.title}\n`
                        caption += `⭔ Score : ${i.score}\n`
                        caption += `⭔ Status : ${i.status}\n`
                        caption += `⭔ Link : ${i.link}\n\n`
                    }
                    sock.sendText(m.from, caption, m)
                    user.limitAdd(m.sender, isPremium, isOwner, _user)
                } else {
                    let fetch = await fetchUrl(global.api("zenz", "/animeweb/doujindesu/latest", {}, "apikey"))
                    let caption = `Doujindesu Latest :\n\n`
                    for (let i of fetch.result) {
                        caption += `⭔ Title : ${i.title}\n`
                        caption += `⭔ Score : ${i.score}\n`
                        caption += `⭔ Status : ${i.status}\n`
                        caption += `⭔ Link : ${i.link}\n`
                        caption += `⭔ Last Episode : ${i.last_episode}\n\n`
                    }
                    sock.sendText(m.from, caption, m)
                    user.limitAdd(m.sender, isPremium, isOwner, _user)
                }
            }
            break
            case 'kiryuu': {
                if (!q) return m.reply(`Example: ${prefix + command} query`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/animeweb/kiryuu", { query: text }, "apikey"))
                let caption = `Kiryuu Search :\n\n`
                for (let i of fetch.result) {
                    caption += `⭔ Title : ${i.manga_name}\n`
                    caption += `⭔ Episode : ${i.manga_eps}\n`
                    caption += `⭔ Rate : ${i.manga_rating}\n`
                    caption += `⭔ Link : ${i.manga_url}\n\n`
                }
                sock.sendFile(m.from, fetch.result[0].manga_thumb, "", m, { caption })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'kissmanga': {
                if (!q) return m.reply(`Example: ${prefix + command} query`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/animeweb/kissmanga", { query: text }, "apikey"))
                let caption = `Kissmanga Search :\n\n`
                for (let i of fetch.result) {
                    caption += `⭔ Title : ${i.manga_name}\n`
                    caption += `⭔ Link : ${i.manga_url}\n\n`
                }
                sock.sendText(m.from, caption, m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'klikmanga': {
                if (!q) return m.reply(`Example: ${prefix + command} query`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/animeweb/klikmanga", { query: text }, "apikey"))
                let caption = `Klikmanga Search :\n\n`
                for (let i of fetch.result) {
                    caption += `⭔ Title : ${i.manga_name}\n`
                    caption += `⭔ Episode : ${i.manga_eps}\n`
                    caption += `⭔ Author : ${i.manga_author}\n`
                    caption += `⭔ Genre : ${i.manga_genre}\n`
                    caption += `⭔ Status : ${i.manga_status}\n`
                    caption += `⭔ Release : ${i.manga_release}\n`
                    caption += `⭔ Desc : ${i.manga_desc}\n`
                    caption += `⭔ Link : ${i.manga_url}\n\n`
                }
                sock.sendFile(m.from, fetch.result[0].manga_thumb, "", m, { caption })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'komikstation': {
                if (!q) return m.reply(`Example: ${prefix + command} query`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/animeweb/komikstation", { query: text }, "apikey"))
                let caption = `Komikstation Search :\n\n`
                for (let i of fetch.result) {
                    caption += `⭔ Title : ${i.manga_name}\n`
                    caption += `⭔ Episode : ${i.manga_eps}\n`
                    caption += `⭔ Link : ${i.manga_url}\n\n`
                }
                sock.sendFile(m.from, fetch.result[0].manga_thumb, "", m, { caption })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'mangatoon': {
                if (!q) return m.reply(`Example: ${prefix + command} query`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/animeweb/mangatoon", { query: text }, "apikey"))
                let caption = `Mangatoon Search :\n\n`
                let i = fetch.result
                caption += `⭔ Judul : ${i.judul}\n`
                caption += `⭔ Genre : ${i.genre}\n`
                caption += `⭔ Author : ${i.Author}\n`
                caption += `⭔ Link : ${i.Link}\n`
                sock.sendFile(m.from, i.thumb, "", m, { caption })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'komikstation': {
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                if (text.toLowerCase() === "random") {
                    let fetch = await fetchUrl(global.api("zenz", "/animeweb/nekopoi/random", {}, "apikey"))
                    let caption = `Nekopoi Random :\n\n`
                    let i = fetch.result
                    caption += `⭔ Title : ${i.title}\n`
                    caption += `⭔ Synopsis : ${i.synopsis}\n`
                    caption += `⭔ Views : ${i.views}\n`
                    caption += `⭔ Japanese : ${i.japanese}\n`
                    caption += `⭔ Category : ${i.category}\n`
                    caption += `⭔ Episode : ${i.episode}\n`
                    caption += `⭔ Status : ${i.status}\n`
                    caption += `⭔ Aired : ${i.aired}\n`
                    caption += `⭔ Producers : ${i.producers}\n`
                    caption += `⭔ Genre : ${i.genre}\n`
                    caption += `⭔ Duration : ${i.duration}\n`
                    caption += `⭔ Score : ${i.score}\n`
                    //sock.sendFile(m.from, fetch.result.img, "", m, { caption }) yg gambarnya kena internet positif
                    sock.sendText(m.from, caption, m)
                    user.limitAdd(m.sender, isPremium, isOwner, _user)
                } else if (text) {
                    let fetch = await fetchUrl(global.api("zenz", "/animeweb/nekopoi/search", { query: text }, "apikey"))
                    let caption = `Nekopoi Search :\n\n`
                    for (let i of fetch.result) {
                        caption += `⭔ Title : ${i.title}\n`
                        caption += `⭔ Link : ${i.link}\n\n`
                    }
                    //sock.sendFile(m.from, fetch.result[0].img, "", m, { caption }) yg gambarnya kena internet positif
                    sock.sendText(m.from, caption, m)
                    user.limitAdd(m.sender, isPremium, isOwner, _user)
                } else {
                    let fetch = await fetchUrl(global.api("zenz", "/animeweb/nekopoi/latest", {}, "apikey"))
                    let caption = `Nekopoi Latest :\n\n`
                    for (let i of fetch.result) {
                        caption += `⭔ Title : ${i.title}\n`
                        caption += `⭔ Link : ${i.link}\n\n`
                    }
                    //sock.sendFile(m.from, fetch.result[0].img, "", m, { caption }) yg gambarnya kena internet positif
                    sock.sendText(m.from, caption, m)
                    user.limitAdd(m.sender, isPremium, isOwner, _user)
                }
            }
            break
            case 'nhentai': {
                if (!q) return m.reply(`Example: ${prefix + command} query`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/animeweb/nhentai", { query: text }, "apikey"))
                let caption = `Nhentai Search :\n\n`
                let i = fetch.result
                caption += `⭔ ID : ${i.id}\n`
                caption += `⭔ English Title : ${i.title.english ?? ""}\n`
                caption += `⭔ Japanese Title : ${i.title.japanese ?? ""}\n`
                caption += `⭔ Pretty Title : ${i.title.pretty ?? ""}\n`
                caption += `⭔ Image Length : ${i.image.length}\n`
                let buttons = [
                    { buttonId: `${prefix}nhpdf ${text}`, buttonText: { displayText: 'Download PDF'}, type: 1 },
                ]
                let buttonMessage = {
                    image: { url: i.image[0] },
                    caption: caption,
                    footer: config.footer,
                    buttons: buttons,
                    headerType: 4
                }
                sock.sendMessage(m.from, buttonMessage, { quoted: m })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break

            // CONVERT COMMNAND
            case 'emoji': {
                if (!q) return m.reply(`List Type :\n\n${emoji_type().sort((a, b) => a - b).join("\n")}\n\nEmoji : ${prefix + command} 🤔\nEmoji 2 : ${prefix + command} 🤔 <type>`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
                let [a, b] = args
                let fetch = await fetchUrl(global.api("zenz", "/creator/emoji", { query: a }, "apikey"))
                if (b) {
                    switch(b.toLowerCase()) {
                        case "apple": 
                            sock.sendFile(m.from, fetch.result.apple, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                        break
                        case "google":
                            sock.sendFile(m.from, fetch.result.google, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                        break
                        case "samsung":
                            sock.sendFile(m.from, fetch.result.samsung, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                        break
                        case "microsoft":
                            sock.sendFile(m.from, fetch.result.microsoft, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                        break
                        case "whatsapp":
                            sock.sendFile(m.from, fetch.result.whatsapp, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                        break
                        case "twitter":
                            sock.sendFile(m.from, fetch.result.twitter, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                        break
                        case "facebook":
                            sock.sendFile(m.from, fetch.result.facebook, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                        break
                        case "skype":
                            sock.sendFile(m.from, fetch.result.skype, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                        break
                        case "joypixels":
                            sock.sendFile(m.from, fetch.result.joypixels, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                        break
                        case "openmoji":
                            sock.sendFile(m.from, fetch.result.openmoji, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                        break
                        case "emojidex":
                            sock.sendFile(m.from, fetch.result.emojidex, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                        break
                        case "notoemoji":
                            sock.sendFile(m.from, fetch.result.noto_emoji, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                        break
                        case "messenger":
                            sock.sendFile(m.from, fetch.result.messenger, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                        break
                        case "lg":
                            sock.sendFile(m.from, fetch.result.LG, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                        break
                        case "htc":
                            sock.sendFile(m.from, fetch.result.HTC, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                        break
                        case "mozilla":
                            sock.sendFile(m.from, fetch.result.mozilla, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                        break
                        case "softbank":
                            sock.sendFile(m.from, fetch.result.softbank, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                        break
                        case "docomo":
                            sock.sendFile(m.from, fetch.result.docomo, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                        break
                        case "kddi":
                            sock.sendFile(m.from, fetch.result.au_by_kddi, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                        break
                    }
                } else {
                    sock.sendFile(m.from, fetch.result.google, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                }
                function emoji_type() {
                    return ["apple", "google","samsung", "microsoft", "whatsapp", "twitter", "facebook", "skype", "joypixels", "openmoji", "emojidex", "noto_emoji", "messanger", "lg", "htc", "mozilla", "softbank", "docomo", "kddi"]
                }
            }
            break
            case 'emojimix': {
                if (!q) return m.reply(`Example: \nEmojimix : ${prefix + command} 🤔\nEmojimix 2 : ${prefix + command} 😅🤔`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
                let [a, b] = args.join("")
                if (b) {
                    sock.sendFile(m.from, global.api("zenz", `/creator/emojimix`, {text: a, text2: b}, "apikey"), "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                } else {
                    sock.sendFile(m.from, global.api("zenz", `/creator/emojimix2`, {text: a}, "apikey"), "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                }
            }
            break
            case 'stickerc': case 'scircle': {
                if (!quoted) return  m.reply(`Reply to Supported media With Caption ${prefix + command} or url`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
                if (/image/.test(mime)) {
                    let download = await sock.downloadAndSaveMediaMessage(quoted)
                    file_name = getRandom('jpg')
                    request({
                        url: global.api("zenz", "/photoeditor/circle", {}, "apikey"),
                        method: 'POST',
                        formData: {
                            "sampleFile": fs.createReadStream(download)
                        },
                        encoding: "binary"
                    }, async function(error, response, body) {
                        fs.unlinkSync(download)
                        fs.writeFileSync(file_name, body, "binary")
                        ini_buff = fs.readFileSync(file_name)
                        await sock.sendFile(m.from, ini_buff, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] }).then(() => {
                            fs.unlinkSync(file_name)
                        })
                    })
                } else if (isUrl(text)) {
                    sock.sendFile(m.from, global.api("zenz", "/photoeditor/circle", { url: isUrl(text)[0] }, "apikey"), "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                }   else {
                    return m.reply(`Reply to Supported media With Caption ${prefix + command} or url`, m.from, { quoted: m })
                }
            }
            break
            case 'sticker': case 'stiker': case 's': {
                if (!quoted) return  m.reply(`Reply to Supported media With Caption ${prefix + command} or url`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
                if (/image|video|sticker/.test(mime)) {
                    let download = await quoted.download()
                    sock.sendFile(m.from, download, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                } else if (quoted.mentions[0]) {
                    let url = await sock.profilePictureUrl(quoted.mentions[0], "image")
                    sock.sendFile(m.from, url, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                } else if (isUrl(text)) {
                    if (isUrl(text)) sock.sendFile(m.from, isUrl(text)[0], "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                    else m.reply('No Url Match')
                } else {
                    return m.reply(`Reply to Supported media With Caption ${prefix + command} or url or @tag`, m.from, { quoted: m })
                }
            }
            break
            case 'stickernobg': case 'stickerbg': {
                if (!quoted) return  m.reply(`Reply to Supported media With Caption ${prefix + command} or url`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
                if (/image/.test(mime)) {
                    let download = await sock.downloadAndSaveMediaMessage(quoted)
                    file_name = getRandom('jpg')
                    request({
                        url: global.api("zenz", "/convert/sticker-nobg", {}, "apikey"),
                        method: 'POST',
                        formData: {
                            "sampleFile": fs.createReadStream(download)
                        },
                        encoding: "binary"
                    }, async function(error, response, body) {
                        fs.unlinkSync(download)
                        fs.writeFileSync(file_name, body, "binary")
                        ini_buff = fs.readFileSync(file_name)
                        await sock.sendFile(m.from, ini_buff, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] }).then(() => {
                            fs.unlinkSync(file_name)
                        })
                    })
                } else if (isUrl(text)) {
                    sock.sendFile(m.from, global.api("zenz", "/convert/sticker-nobg", { url: isUrl(text)[0] }, "apikey"), "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                }   else {
                    return m.reply(`Reply to Supported media With Caption ${prefix + command} or url`, m.from, { quoted: m })
                }
            }
            break
            case 'stickerp': case 'stickernocrop': {
                if (!quoted) return  m.reply(`Reply to Supported media With Caption ${prefix + command} or url`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
                if (/image|video|sticker/.test(mime)) {
                    let download = await sock.downloadAndSaveMediaMessage(quoted)
                    file_name = getRandom('webp')
                    ffmpeg(`./${download}`).input(download).on('end', function () {
                        sock.sendFile(m.from, fs.readFileSync(file_name), "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] }).then(() => {
                            fs.unlinkSync(download)
                            fs.unlinkSync(file_name)
                        })
                    })
                    .addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`]).toFormat('webp').save(file_name)
                } else {
                    return m.reply(`Reply to Supported media With Caption ${prefix + command}`, m.from, { quoted: m })
                }
            }
            break
            case 'takesticker': case 'colong': {
                if (!quoted) return  m.reply(`Reply to Supported media With Caption ${prefix + command} or url`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
                if (/image|video|sticker/.test(mime)) {
                    anu = args.join(" ").split('|')
                    const packname = anu[0] !== '' ? anu[0] : config.exif.packname
                    const author = anu[1] !== '' ? anu[1] : config.exif.author
                    let download = await quoted.download()
                    sock.sendFile(m.from, download, "", m, { asSticker: true, author: author, packname: packname, categories: ['😄','😊'] })
                } else {
                    return m.reply(`Reply to Supported media With Caption ${prefix + command}`, m.from, { quoted: m })
                }
            }
            break
            case 'toimg': case 'toimage': {
                if (!quoted) return  m.reply(`Reply to Supported media With Caption ${prefix + command}`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
                if (/image|video|sticker/.test(mime)) {
                    let download = await sock.downloadAndSaveMediaMessage(quoted)
                    let ran = getRandom('png')
                    exec(`ffmpeg -i ${download} ${ran}`, (err) => {
                        fs.unlinkSync(download)
                        if (err) return m.reply('Error')
                        buffer = fs.readFileSync(ran)
                        sock.sendFile(m.from, buffer, "", m)
                        fs.unlinkSync(ran)
                    })
                } else {
                    return m.reply(`Reply to Supported media With Caption ${prefix + command}`, m.from, { quoted: m })
                }
            }
            break
            case 'tourl': case 'uploader': {
                if (!quoted) return  m.reply(`Reply to Supported media With Caption ${prefix + command}`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                if (/image|video|sticker/.test(mime)) {
                    let download = await sock.downloadMediaMessage(quoted)
                    const form = new BodyForm()
                    form.append('sampleFile', download, { filename: 'fromBot-' + getRandom('jpg') })
                    if (text) {
                        form.append('comment', text)
                    } else {
                        form.append('comment', "sock BOT")
                    }
                    axios.post(global.api("zenz", "/uploader", {}, "apikey"), form.getBuffer(), { headers: { "content-type": `multipart/form-data; boundary=${form._boundary}`}
                    }).then(({ data }) => {
                        let caption = `Convert Image To Url :\n\n`
                        caption += `⭔ Title : ${data.result.originalname}\n`
                        caption += `⭔ Size : ${data.result.size}\n`
                        caption += `⭔ MimeType : ${data.result.mimetype}\n`
                        caption += `⭔ Comment : ${data.result.comment}\n`
                        caption += `⭔ CreatedOn : ${data.result.createdOn}\n`
                        caption += `⭔ Url : https://zenzapis.xyz/uploader/${data.result.originalname}\n`
                        sock.sendFile(m.from, data.result.url, "", m, { caption })
                        user.limitAdd(m.sender, isPremium, isOwner, _user)
                    })
                } else {
                    return m.reply(`Reply to Supported media With Caption ${prefix + command}`, m.from, { quoted: m })
                }
            }
            break
            case 'tovideo': case 'tomedia': {
                if (!quoted) return  m.reply(`Reply to Supported media With Caption ${prefix + command}`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
                if (/image|video|sticker/.test(mime)) {
                    let download = await sock.downloadMediaMessage(quoted)
                    const form = new BodyForm()
                    form.append('sampleFile', download, { filename: getRandom('webp') })
                    axios.post(global.api("zenz", "/convert/webp-to-mp4", {}, "apikey"), form.getBuffer(), { headers: { "content-type": `multipart/form-data; boundary=${form._boundary}`}
                    }).then(({ data }) => {
                        sock.sendFile(m.from, data.result, "", m, { caption: 'Convert Sticker Gif To Video' })
                    })
                } else if (isUrl(text)) {
                    let fetch = await fetchUrl(global.api("zenz", "/convert/webp-to-mp4", { url: isUrl(text)[0] }, "apikey"))
                    sock.sendFile(m.from, fetch.result, "", m, { caption: 'Convert Sticker Gif To Video' })
                }   else {
                    return m.reply(`Reply to Supported media With Caption ${prefix + command}`, m.from, { quoted: m })
                }
            }
            break
            case 'whatmusic': case 'findmusic': {
                if (!quoted) return  m.reply(`Reply to Supported media With Caption ${prefix + command} or url`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
                if (/audio/.test(mime)) {
                    let download = await sock.downloadMediaMessage(quoted)
                    const form = new BodyForm()
                    form.append('sampleFile', download, { filename: getRandom('mp3') })
                    axios.post(global.api("zenz", "/convert/whatmusic", {}, "apikey"), form.getBuffer(), { headers: { "content-type": `multipart/form-data; boundary=${form._boundary}`}
                    }).then(({ data }) => {
                        let caption = `What Music :\n\n`
                        caption += `⭔ Title : ${data.result.title}\n`
                        caption += `⭔ Artist : ${data.result.artist}\n`
                        caption += `⭔ Album : ${data.result.album}\n`
                        caption += `⭔ Genres : ${data.result.genres}\n`
                        caption += `⭔ Release : ${data.result.crereleaseatedOn}\n`
                        sock.sendText(m.from, caption, m)
                    })
                } else if (isUrl(text)) {
                    let fetch = await fetchUrl(global.api("zenz", "/convert/whatmusic", { url: isUrl(text)[0] }, "apikey"))
                    let caption = `What Music :\n\n`
                    let i = fetch.result
                    caption += `⭔ Title : ${i.title}\n`
                    caption += `⭔ Artist : ${i.artist}\n`
                    caption += `⭔ Album : ${i.album}\n`
                    caption += `⭔ Genres : ${i.genres}\n`
                    caption += `⭔ Release : ${i.crereleaseatedOn}\n`
                    sock.sendText(m.from, caption, m)
                } else {
                    return m.reply(`Reply to Supported media With Caption ${prefix + command} or url`, m.from, { quoted: m })
                }
            }
            break
            
            // CREATOR COMMNAND
            case 'botcomment': case 'changemymind': case 'kannagen': case 'trump': {
                if (!q) return m.reply(`Example: ${prefix + command} query`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
                sock.sendFile(m.from, global.api("zenz", "/creator/" + command, { 
                    text: text 
                }, "apikey"), "", m)
            }
            break
            case 'smeme': case 'stickermeme': {
                if (!quoted) return  m.reply(`Reply to Supported media With Caption ${prefix + command} or url`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
                if (!text.includes('|')) return m.reply(`Example : ${prefix + command} Top|Bottom`)
                if (/image/.test(mime)) {
                    let [a, b] = text.split`|`
                    let download = await sock.downloadAndSaveMediaMessage(quoted)
                    file_name = getRandom('jpg')
                    request({
                        url: global.api("zenz", "/creator/smeme", {text: a, text2: b}, "apikey"),
                        method: 'POST',
                        formData: {
                            "sampleFile": fs.createReadStream(download)
                        },
                        encoding: "binary"
                    }, async function(error, response, body) {
                        fs.unlinkSync(download)
                        fs.writeFileSync(file_name, body, "binary")
                        ini_buff = fs.readFileSync(file_name)
                        await sock.sendFile(m.from, ini_buff, "", m).then(() => {
                            fs.unlinkSync(file_name)
                        })
                    })
                } else if (isUrl(text)) {
                    let [a, b, c] = text.split`|`
                    sock.sendFile(m.from, global.api("zenz", "/creator/smeme", {
                        text: a, 
                        text2: b,
                        url: c
                    }, "apikey"), "", m)
                } else {
                    return m.reply(`Reply to Supported media With Caption ${prefix + command} or url`, m.from, { quoted: m })
                }
            }
            break
            case 'ytcomment': case 'phcomment': case 'maketweet':case 'captcha': {
                if (!q) return m.reply(`Example: ${prefix + command} query`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                sock.sendFile(m.from, global.api("zenz", "/creator/" + command, {
                    url: "https://tse2.mm.bing.net/th?id=OIP.n1C1oxOvYLLyDIavrBFoNQHaHa&pid=Api&P=0&w=153&h=153",
                    text: text, 
                    text2: m.pushName
                }, "apikey"), "", m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'waifu2x': {
                if (!quoted) return  m.reply(`Reply to Supported media With Caption ${prefix + command} or url`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
                if (/image/.test(mime)) {
                    let download = await sock.downloadAndSaveMediaMessage(quoted)
                    file_name = getRandom('jpg')
                    request({
                        url: global.api("zenz", "/creator/waifu2x", {}, "apikey"),
                        method: 'POST',
                        formData: {
                            "sampleFile": fs.createReadStream(download)
                        },
                        encoding: "binary"
                    }, async function(error, response, body) {
                        fs.unlinkSync(download)
                        fs.writeFileSync(file_name, body, "binary")
                        ini_buff = fs.readFileSync(file_name)
                        await sock.sendFile(m.from, ini_buff, "", m).then(() => {
                            fs.unlinkSync(file_name)
                        })
                    })
                } else if (isUrl(text)) {
                    sock.sendFile(m.from, global.api("zenz", "/creator/waifu2x", { url: isUrl(text)[0] }, "apikey"), "", m)
                }   else {
                    return m.reply(`Reply to Supported media With Caption ${prefix + command} or url`, m.from, { quoted: m })
                }
            }
            break

            // DOWNLOADER COMMNAND
            case 'cocofun': {
                if (!isUrl(text)) return m.reply(`Example: ${prefix + command} url`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/downloader/cocofun", { url: isUrl(text)[0] }, "apikey"))
                let teks = `⭔ Title : ${fetch.result.title}\n⭔ Desc : ${fetch.result.desc}\n⭔ Like : ${fetch.result.like}\n⭔ Count : ${fetch.result.play_count}\n⭔ Shared : ${fetch.result.shared}\n⭔ Resolution : ${fetch.result.resolution}\n⭔ Duration : ${fetch.result.duration}\n\n`
                sock.sendFile(m.from, fetch.result.url, "", m, { caption: teks })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'dl_': {
                if (!isUrl(text)) return m.reply(`Example: ${prefix + command} url`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let [a, b] = args
                if (a.toLowerCase() === "audio") {
                    sock.sendMessage(m.from, { audio: { url: isUrl(b)[0] }, mimetype: "audio/mpeg", fileName: ".mp3" }, { quoted: m })
                    user.limitAdd(m.sender, isPremium, isOwner, _user)
                } else {
                    sock.sendFile(m.from, isUrl(a)[0], "", m)
                    user.limitAdd(m.sender, isPremium, isOwner, _user)
                }
            }
            break
            case 'facebook': case 'fbdl': {
                if (!isUrl(text)) return m.reply(`Example: ${prefix + command} url`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/downloader/facebook", { url: isUrl(text)[0] }, "apikey"))
                let caption = `*Facebook Downloader*\n\n`
                let i = fetch.result
                caption += `⭔ Title : ${i.title}\n`
                caption += `⭔ Source Url : ${i.url}\n`
                caption += `⭔ Duration : ${i.duration}\n`
                caption += `⭔ Source : ${i.source}\n`
                let buttons = [
                    { buttonId: `${prefix}dl_ ${i.medias[0].url}`, buttonText: { displayText: 'Video SD'}, type: 1 },
                    { buttonId: `${prefix}dl_ ${i.medias[1].url}`, buttonText: { displayText: 'Video HD'}, type: 1 }
                ]
                let buttonMessage = {
                    image: { url: i.thumbnail },
                    caption: caption,
                    footer: config.footer,
                    buttons: buttons,
                    headerType: 4
                }
                sock.sendMessage(m.from, buttonMessage, { quoted: m })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'gore': case 'gorevideo': {
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/downloader/gore", {}, "apikey"))
                let teks = `⭔ Title : ${fetch.result.title}\n⭔ Tag : ${fetch.result.tag}\n⭔ Upload : ${fetch.result.upload}\n⭔ Author : ${fetch.result.author}`
                sock.sendFile(m.from, fetch.result.video1, "", m, { caption: teks })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'hentaivideo': {
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/downloader/hentaivid", {}, "apikey"))
                let teks = `⭔ Title : ${fetch.result.title}\n⭔ Category : ${fetch.result.category}\n⭔ Share : ${fetch.result.share_count}\n⭔ Views : ${fetch.result.views_count}`
                sock.sendFile(m.from, fetch.result.video_1, "", m, { caption: teks })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'instagram': case 'igdl': case 'igtv': case 'igreel': {
                if (!isUrl(text)) return m.reply(`Example: ${prefix + command} url`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/downloader/instagram", { url:isUrl(text)[0] }, "apikey"))
                for (let url of fetch.result) sock.sendFile(m.from, url, "", m, { caption: `Download Media From : ${isUrl(text)[0]}` })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'instastory': case 'igstory': {
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                if (!q) return m.reply(`Example: ${prefix + command} url or username`)
                if (isUrl(text)) {
                    let fetch = await fetchUrl(global.api("zenz", "/downloader/instastory", { url:isUrl(text)[0] }, "apikey"))
                    sock.sendFile(m.from, fetch.result.media[0].url, "", m, { caption: `Download Story From : ${isUrl(text)[0]}\n\nType: ${fetch.result.type}` })
                    user.limitAdd(m.sender, isPremium, isOwner, _user)
                } else {
                    let fetch = await fetchUrl(global.api("zenz", "/downloader/igstory", { username: text }, "apikey"))
                    for (let i of fetch.result) sock.sendFile(m.from, i.url, "", m, { caption: `Download Story From : ${text}\n\nType: ${i.type}` })
                    user.limitAdd(m.sender, isPremium, isOwner, _user)
                }
            }
            break
            case 'joox': {
                if (!q) return m.reply(`Example: ${prefix + command} query`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/downloader/joox", { query: text }, "apikey"))
                let teks = `⭔ Title : ${fetch.result.lagu}\n⭔ Album : ${fetch.result.album}\n⭔ Penyanyi : ${fetch.result.penyanyi}\n⭔ Publish : ${fetch.result.publish}`
                let buttons = [
                    { buttonId: `${prefix}dl_ audio ${fetch.result.mp3Link}`, buttonText: { displayText: 'Audio MP3'}, type: 1 },
                    { buttonId: `${prefix}dl_ audio ${fetch.result.mp4aLink}`, buttonText: { displayText: 'Audio MP4A'}, type: 1 }
                ]
                let buttonMessage = {
                    image: { url: fetch.result.img },
                    caption: teks,
                    footer: config.footer,
                    buttons: buttons,
                    headerType: 1
                }
                sock.sendMessage(m.from, buttonMessage, { quoted: m })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'mediafire': {
                if (!isUrl(text)) return m.reply(`Example: ${prefix + command} url`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/downloader/mediafire", { url: isUrl(text)[0] }, "apikey"))
                sock.sendFile(m.from, fetch.result, "", m)
            }
            break
            case 'pinterest': case 'pinvideo': {
                if (!isUrl(text)) return m.reply(`Example: ${prefix + command} url`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/downloader/pinterestdl", { url: isUrl(text)[0] }, "apikey"))
                sock.sendFile(m.from, fetch.result, "", m, { caption: `Download Pinterest Video From : ${isUrl(text)[0]}` })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'soundcloud': case 'scdl': {
                if (!isUrl(text)) return m.reply(`Example: ${prefix + command} url`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/downloader/soundcloud", { url: isUrl(text)[0] }, "apikey"))
                sock.sendFile(m.from, fetch.result.url, "", m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'tiktok': {
                if (!isUrl(text)) return m.reply(`Example: ${prefix + command} url`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/downloader/musically", { url: isUrl(text)[0] }, "apikey"))
                let buttons = [
                    { buttonId: `${prefix}tiktokwm ${text}`, buttonText: {displayText: '► With Watermark'}, type: 1},
                    { buttonId: `${prefix}tiktokmp3 ${text}`, buttonText: {displayText: '♫ Audio'}, type: 1}
                ]
                let buttonMessage = {
                    video: { url: fetch.result.nowm },
                    caption: `Download Tiktok From : ${isUrl(text)[0]}`,
                    footer: config.footer,
                    buttons: buttons,
                    headerType: 5
                }
                sock.sendMessage(m.from, buttonMessage, { quoted: m })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'tiktokporn': {
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/downloader/tikporn", {}, "apikey"))
                let teks = `⭔ Title : ${fetch.result.title}\n⭔ Desc : ${fetch.result.desc}\n⭔ Upload : ${fetch.result.upload}\n⭔ Like : ${fetch.result.like}\n⭔ Dislike : ${fetch.result.dislike}\n⭔ Views : ${fetch.result.views}`
                sock.sendFile(m.from, fetch.result.video, "", m, { caption: teks })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'tiktokmp3': {
                if (!isUrl(text)) return m.reply(`Example: ${prefix + command} url`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/downloader/musically", { url: isUrl(text)[0] }, "apikey"))
                let buttons = [
                    { buttonId: `${prefix}tiktokwm ${text}`, buttonText: {displayText: '► With Watermark'}, type: 1},
                    { buttonId: `${prefix}tiktoknowm ${text}`, buttonText: {displayText: '► Without Watermark'}, type: 1}
                ]
                let buttonMessage = {
                    video: { url: fetch.result.prefiew },
                    caption: `Download Tiktok From : ${isUrl(text)[0]}`,
                    footer: config.footer,
                    buttons: buttons,
                    headerType: 5
                }
                sock.sendMessage(m.from, buttonMessage, { quoted: m })
                sock.sendFile(m.from, fetch.result.audio, "", m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'tiktokwm': {
                if (!isUrl(text)) return m.reply(`Example: ${prefix + command} url`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/downloader/tiktok", { url: isUrl(text)[0] }, "apikey"))
                let buttons = [
                    { buttonId: `${prefix}tiktoknowm ${text}`, buttonText: {displayText: '► With Watermark'}, type: 1},
                    { buttonId: `${prefix}tiktokmp3 ${text}`, buttonText: {displayText: '♫ Audio'}, type: 1}
                ]
                let buttonMessage = {
                    video: { url: fetch.result.watermark },
                    caption: `Download Tiktok From : ${isUrl(text)[0]}`,
                    footer: config.footer,
                    buttons: buttons,
                    headerType: 5
                }
                sock.sendMessage(m.from, buttonMessage, { quoted: m })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'twitter': {
                if (!isUrl(text)) return m.reply(`Example: ${prefix + command} url`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/downloader/twitter", { url: isUrl(text)[0] }, "apikey"))
                let caption = `*Twitter Downloader*\n\n`
                let i = fetch.result
                caption += `⭔ Desc : ${i.desc}\n`
                let buttons = [
                    { buttonId: `${prefix}dl_ ${i.sd}`, buttonText: { displayText: 'Video SD'}, type: 1 },
                    { buttonId: `${prefix}dl_ ${i.hd}`, buttonText: { displayText: 'Video HD'}, type: 1 },
                    { buttonId: `${prefix}dl_ audio ${i.audio}`, buttonText: { displayText: 'Audio'}, type: 1 }
                ]
                let buttonMessage = {
                    image: { url: i.thumb },
                    caption: caption,
                    footer: config.footer,
                    buttons: buttons,
                    headerType: 4
                }
                sock.sendMessage(m.from, buttonMessage, { quoted: m })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'twittermp3': {
                if (!isUrl(text)) return m.reply(`Example: ${prefix + command} url`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/downloader/twitter", { url: isUrl(text)[0] }, "apikey"))
                let buttons = [
                    { buttonId: `${prefix}twitter ${text}`, buttonText: {displayText: '► Video'}, type: 1}
                ]
                let buttonMessage = {
                    video: { url: fetch.result.thumb },
                    caption: `⭔ Desc : ${fetch.result.desc}\n⭔ Source Url : ${isUrl(text)[0]}`,
                    footer: config.footer,
                    buttons: buttons,
                    headerType: 4
                }
                sock.sendMessage(m.from, buttonMessage, { quoted: m })
                sock.sendFile(m.from, fetch.result.audio, "", m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'xnxx': case 'xvideos': {
                if (!isUrl(text)) return m.reply(`Example: ${prefix + command} url`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/downloader/" + command, { url: isUrl(text)[0] }, "apikey"))
                let teks = `⭔ Title : ${fetch.result.title}\n⭔ Duration : ${fetch.result.duration}s`
                sock.sendFile(m.from, fetch.result.files.low, "", m, { caption: teks })
            }
            break
            case 'youtube': case 'ytdl': case 'ytshorts': {
                if (!isUrl(text)) return m.reply(`Example: ${prefix + command} url`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/downloader/youtube", { url: isUrl(text)[0] }, "apikey"))
                let caption = `*Youtube Downloader*\n\n`
                let i = fetch.result
                caption += `⭔ Title : ${i.title}\n`
                caption += `⭔ Size : ${i.size}\n`
                caption += `⭔ Views : ${i.views}\n`
                caption += `⭔ Likes : ${i.likes}\n`
                caption += `⭔ Dislike : ${i.dislike}\n`
                caption += `⭔ Channel : ${i.channel}\n`
                caption += `⭔ UploadDate : ${i.uploadDate}\n\n`
                caption += `⭔ Desc : ${i.desc}\n`
                let buttons = [
                    { buttonId: `${prefix}dl_ audio ${i.getVideo}`, buttonText: { displayText: 'Get Audio'}, type: 1 },
                    { buttonId: `${prefix}dl_ ${i.getVideo}`, buttonText: { displayText: 'Get Video'}, type: 1 }
                ]
                let buttonMessage = {
                    image: { url: i.thumb },
                    caption: caption,
                    footer: config.footer,
                    buttons: buttons,
                    headerType: 4
                }
                sock.sendMessage(m.from, buttonMessage, { quoted: m })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'ytplay': {
                if (!q) return m.reply(`Example: ${prefix + command} query`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/downloader/ytplay", { query: text }, "apikey"))
                let caption = `*Youtube Play*\n\n`
                let i = fetch.result
                caption += `⭔ Title : ${i.title}\n`
                caption += `⭔ Size : ${i.size}\n`
                caption += `⭔ Views : ${i.views}\n`
                caption += `⭔ Likes : ${i.likes}\n`
                caption += `⭔ Dislike : ${i.dislike}\n`
                caption += `⭔ Channel : ${i.channel}\n`
                caption += `⭔ UploadDate : ${i.uploadDate}\n\n`
                caption += `⭔ Desc : ${i.desc}\n`
                let buttons = [
                    { buttonId: `${prefix}dl_ audio ${i.getVideo}`, buttonText: { displayText: 'Get Audio'}, type: 1 },
                    { buttonId: `${prefix}dl_ ${i.getVideo}`, buttonText: { displayText: 'Get Video'}, type: 1 }
                ]
                let buttonMessage = {
                    image: { url: i.thumb },
                    caption: caption,
                    footer: config.footer,
                    buttons: buttons,
                    headerType: 4
                }
                sock.sendMessage(m.from, buttonMessage, { quoted: m })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'zippyshare': {
                if (!isUrl(text)) return m.reply(`Example: ${prefix + command} url`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/downloader/zippyshare", { url: isUrl(text)[0] }, "apikey"))
                sock.sendFile(m.from, fetch.result.link, "", m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break

            // ENTERTAINMENT COMMNAND
            case 'asahotak': {
                if (asahotak.hasOwnProperty(m.sender.split('@')[0])) return m.reply("Masih Ada Sesi Yang Belum Diselesaikan!")
                let fetch = await fetchUrl(global.api("zenz", "/entertainment/asahotak", {}, "apikey"))
                let result = await fetch.result
                sock.sendText(m.from, `Silahkan Jawab Pertanyaan Berikut\n\n${result.soal}\n\nWaktu : 30s`, m).then(() => {
                    asahotak[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
                    console.log("Jawaban: " + result.jawaban)
                })
                await sleep(30000)
                if (asahotak.hasOwnProperty(m.sender.split('@')[0])) {
                    sock.sendText(m.from, `Waktu Habis\n\nJawaban:  ${asahotak[m.sender.split('@')[0]]}`, m)
                    delete asahotak[m.sender.split('@')[0]]
                }
            }
            break
            case 'caklontong': {
                if (caklontong.hasOwnProperty(m.sender.split('@')[0])) return m.reply("Masih Ada Sesi Yang Belum Diselesaikan!")
                let fetch = await fetchUrl(global.api("zenz", "/entertainment/caklontong", {}, "apikey"))
                let result = await fetch.result
                sock.sendText(m.from, `Silahkan Jawab Pertanyaan Berikut\n\n${result.soal}\n\nWaktu : 30s`, m).then(() => {
                    caklontong[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
                    console.log("Jawaban: " + result.jawaban)
                })
                await sleep(30000)
                if (caklontong.hasOwnProperty(m.sender.split('@')[0])) {
                    sock.sendText(m.from, `Waktu Habis\n\nJawaban:  ${caklontong[m.sender.split('@')[0]]}\nKeterangan: ${result.deskripsi}`, m)
                    delete caklontong[m.sender.split('@')[0]]
                }
            }
            break
            case 'family100': {
                if (family100.hasOwnProperty(m.sender.split('@')[0])) return m.reply("Masih Ada Sesi Yang Belum Diselesaikan!")
                let fetch = await fetchUrl(global.api("zenz", "/entertainment/family100", {}, "apikey"))
                let result = await fetch.result
                sock.sendText(m.from, `Silahkan Jawab Pertanyaan Berikut\n\n${result.soal} ?\nPilih Salah Satu Dari ${result.jawaban.length} Jawaban\n\nWaktu : 30s\n`, m).then(() => {
                    family100[m.sender.split('@')[0]] = result.jawaban
                    console.log("Jawaban: " + result.jawaban)
                })
                await sleep(30000)
                if (family100.hasOwnProperty(m.sender.split('@')[0])) {
                    sock.sendText(m.from, `Waktu Habis\n\nJawaban:  ${family100[m.sender.split('@')[0]]}`, m)
                    delete family100[m.sender.split('@')[0]]
                }
            }
            break
            case 'jagokata': {
                if (!q) return m.reply(`Example: ${prefix + command} query`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/entertainment/jagokata", { query: text }, "apikey"))
                let caption = `Jago Kata Query : ${text}\n\n`
                let i = fetch.result
                caption += `⭔ Message : ${i.message}\n\n`
                caption += `⭔ By : ${i.by}\n`
                sock.sendText(m.from, caption, m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'siapakah': {
                if (siapakah.hasOwnProperty(m.sender.split('@')[0])) return m.reply("Masih Ada Sesi Yang Belum Diselesaikan!")
                let fetch = await fetchUrl(global.api("zenz", "/entertainment/siapakah", {}, "apikey"))
                let result = await fetch.result
                sock.sendText(m.from, `Silahkan Jawab Pertanyaan Berikut\n\n${result.soal}\n\nWaktu : 30s`, m).then(() => {
                    siapakah[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
                    console.log("Jawaban: " + result.jawaban)
                })
                await sleep(30000)
                if (siapakah.hasOwnProperty(m.sender.split('@')[0])) {
                    sock.sendText(m.from, `Waktu Habis\n\nJawaban:  ${siapakah[m.sender.split('@')[0]]}`, m)
                    delete siapakah[m.sender.split('@')[0]]
                }
            }
            break
            case 'simi': {
                if (!q) return m.reply('Mau Nanya Apa ?')
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                try {
                    let fetch = await fetchUrl(global.api("zenz", "/entertainment/simisimi", { text: encodeURIComponent(text) }, "apikey"))
                    result = fetch.result.message
                    sock.sendText(m.from, result, m)
                    user.limitAdd(m.sender, isPremium, isOwner, _user)
                } catch {
                    m.reply("Error Coba Ulangi")
                }
            }
            break
            case 'susunkata': {
                if (susunkata.hasOwnProperty(m.sender.split('@')[0])) return m.reply("Masih Ada Sesi Yang Belum Diselesaikan!")
                let fetch = await fetchUrl(global.api("zenz", "/entertainment/susunkata", {}, "apikey"))
                let result = await fetch.result
                sock.sendText(m.from, `Silahkan Jawab Pertanyaan Berikut\n\n${result.soal}\nTipe: ${result.tipe}\n\nWaktu : 30s`, m).then(() => {
                    susunkata[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
                    console.log("Jawaban: " + result.jawaban)
                })
                await sleep(30000)
                if (susunkata.hasOwnProperty(m.sender.split('@')[0])) {
                    sock.sendText(m.from, `Waktu Habis\n\nJawaban:  ${susunkata[m.sender.split('@')[0]]}`, m)
                    delete susunkata[m.sender.split('@')[0]]
                }
            }
            break
            case 'tebakbendera': {
                if (tebakbendera.hasOwnProperty(m.sender.split('@')[0])) return m.reply("Masih Ada Sesi Yang Belum Diselesaikan!")
                let fetch = await fetchUrl(global.api("zenz", "/entertainment/tebakbendera", {}, "apikey"))
                let result = await fetch.result
                sock.sendFile(m.from, result.img, "", m, { caption: `Silahkan Jawab Pertanyaan Berikut\n\nDeskripsi: ${result.flag}\nWaktu : 30s`}).then(() => {
                    tebakbendera[m.sender.split('@')[0]] = result.name.toLowerCase()
                    console.log("Jawaban: " + result.name)
                })
                await sleep(30000)
                if (tebakbendera.hasOwnProperty(m.sender.split('@')[0])) {
                    sock.sendText(m.from, `Waktu Habis\n\nJawaban:  ${tebakbendera[m.sender.split('@')[0]]}`, m)
                    delete tebakbendera[m.sender.split('@')[0]]
                }   
            }
            break
            case 'tebakgambar': {
                if (tebakgambar.hasOwnProperty(m.sender.split('@')[0])) return m.reply("Masih Ada Sesi Yang Belum Diselesaikan!")
                let fetch = await fetchUrl(global.api("zenz", "/entertainment/tebakgambar", {}, "apikey"))
                let result = await fetch.result
                sock.sendFile(m.from, result.img, "", m, { caption: `Silahkan Jawab Pertanyaan Berikut\n\nDeskripsi: ${result.deskripsi}\n\nWaktu : 30s`}).then(() => {
                    tebakgambar[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
                    console.log("Jawaban: " + result.jawaban)
                })
                await sleep(30000)
                if (tebakgambar.hasOwnProperty(m.sender.split('@')[0])) {
                    sock.sendText(m.from, `Waktu Habis\n\nJawaban:  ${tebakgambar[m.sender.split('@')[0]]}`, m)
                    delete tebakgambar[m.sender.split('@')[0]]
                }
            }
            break
            case 'tebakkabupaten': {
                if (tebakkabupaten.hasOwnProperty(m.sender.split('@')[0])) return m.reply("Masih Ada Sesi Yang Belum Diselesaikan!")
                let fetch = await fetchUrl(global.api("zenz", "/entertainment/tebakkabupaten", {}, "apikey"))
                let result = await fetch.result
                sock.sendFile(m.from, result.url, "", m, { caption: `Silahkan Jawab Pertanyaan Berikut\nWaktu : 30s`}).then(() => {
                    tebakkabupaten[m.sender.split('@')[0]] = result.title.toLowerCase()
                    console.log("Jawaban: " + result.title)
                })
                await sleep(30000)
                if (tebakkabupaten.hasOwnProperty(m.sender.split('@')[0])) {
                    sock.sendText(m.from, `Waktu Habis\n\nJawaban:  ${tebakkabupaten[m.sender.split('@')[0]]}`, m)
                    delete tebakkabupaten[m.sender.split('@')[0]]
                }
                
            }
            break
            case 'tebakkalimat': {
                if (tebakkalimat.hasOwnProperty(m.sender.split('@')[0])) return m.reply("Masih Ada Sesi Yang Belum Diselesaikan!")
                let fetch = await fetchUrl(global.api("zenz", "/entertainment/tebakkalimat", {}, "apikey"))
                let result = await fetch.result
                sock.sendText(m.from, `Silahkan Jawab Pertanyaan Berikut\n\n${result.soal}\n\nWaktu : 30s`, m).then(() => {
                    tebakkalimat[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
                    console.log("Jawaban: " + result.jawaban)
                })
                await sleep(30000)
                if (tebakkalimat.hasOwnProperty(m.sender.split('@')[0])) {
                    sock.sendText(m.from, `Waktu Habis\n\nJawaban:  ${tebakkalimat[m.sender.split('@')[0]]}`, m)
                    delete tebakkalimat[m.sender.split('@')[0]]
                }
            }
            break
            case 'tebakkata': {
                if (tebakkata.hasOwnProperty(m.sender.split('@')[0])) return m.reply("Masih Ada Sesi Yang Belum Diselesaikan!")
                let fetch = await fetchUrl(global.api("zenz", "/entertainment/tebakkata", {}, "apikey"))
                let result = await fetch.result
                sock.sendText(m.from, `Silahkan Jawab Pertanyaan Berikut\n\n${result.soal}\n\nWaktu : 30s`, m).then(() => {
                    tebakkata[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
                    console.log("Jawaban: " + result.jawaban)
                })
                await sleep(30000)
                if (tebakkata.hasOwnProperty(m.sender.split('@')[0])) {
                    sock.sendText(m.from, `Waktu Habis\n\nJawaban:  ${tebakkata[m.sender.split('@')[0]]}`, m)
                    delete tebakkata[m.sender.split('@')[0]]
                }
            }
            break
            case 'tebaklagu': {
                if (tebaklagu.hasOwnProperty(m.sender.split('@')[0])) return m.reply("Masih Ada Sesi Yang Belum Diselesaikan!")
                let fetch = await fetchUrl("https://hisoka-morou.netlify.app/assets/database/tebaklagu.json")
                let result = await fetch[Math.floor(Math.random() * fetch.length)]
                sock.sendMessage(m.from, { audio: { url: result.link_song }, mimetype: "audio/mpeg", fileName: "???" }, { quoted: m }).then(() => {
                    tebaklagu[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
                    console.log("Jawaban: " + result.jawaban)
                })
                await sleep(30000)
                if (tebaklagu.hasOwnProperty(m.sender.split('@')[0])) {
                    sock.sendText(m.from, `Waktu Habis\n\nJawaban:  ${tebaklagu[m.sender.split('@')[0]]}`, m)
                    delete tebaklagu[m.sender.split('@')[0]]
                }
            }
            break
            case 'tebaklirik': {
                if (tebaklirik.hasOwnProperty(m.sender.split('@')[0])) return m.reply("Masih Ada Sesi Yang Belum Diselesaikan!")
                let fetch = await fetchUrl(global.api("zenz", "/entertainment/tebaklirik", {}, "apikey"))
                let result = await fetch.result
                sock.sendText(m.from, `Silahkan Jawab Pertanyaan Berikut\n\n${result.soal}\n\nWaktu : 30s`, m).then(() => {
                    tebaklirik[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
                    console.log("Jawaban: " + result.jawaban)
                })
                await sleep(30000)
                if (tebaklirik.hasOwnProperty(m.sender.split('@')[0])) {
                    sock.sendText(m.from, `Waktu Habis\n\nJawaban:  ${tebaklirik[m.sender.split('@')[0]]}`, m)
                    delete tebaklirik[m.sender.split('@')[0]]
                }
            }
            break
            case 'tebaktebakan': {
                if (tebaktebakan.hasOwnProperty(m.sender.split('@')[0])) return m.reply("Masih Ada Sesi Yang Belum Diselesaikan!")
                let fetch = await fetchUrl(global.api("zenz", "/entertainment/tebaktebakan", {}, "apikey"))
                let result = await fetch.result
                sock.sendText(m.from, `Silahkan Jawab Pertanyaan Berikut\n\n${result.soal}\n\nWaktu : 30s`, m).then(() => {
                    tebaktebakan[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
                    console.log("Jawaban: " + result.jawaban)
                })
                await sleep(30000)
                if (tebaktebakan.hasOwnProperty(m.sender.split('@')[0])) {
                    sock.sendText(m.from, `Waktu Habis\n\nJawaban:  ${tebaktebakan[m.sender.split('@')[0]]}`, m)
                    delete tebaktebakan[m.sender.split('@')[0]]
                }
                
            }
            break
            case 'tekateki': {
                if (tekateki.hasOwnProperty(m.sender.split('@')[0])) return m.reply("Masih Ada Sesi Yang Belum Diselesaikan!")
                let fetch = await fetchUrl(global.api("zenz", "/entertainment/tekateki", {}, "apikey"))
                let result = await fetch.result
                sock.sendText(m.from, `Silahkan Jawab Pertanyaan Berikut\n\n${result.soal}\n\nWaktu : 30s`, m).then(() => {
                    tekateki[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
                    console.log("Jawaban: " + result.jawaban)
                })
                await sleep(30000)
                if (tekateki.hasOwnProperty(m.sender.split('@')[0])) {
                    sock.sendText(m.from, `Waktu Habis\n\nJawaban:  ${tekateki[m.sender.split('@')[0]]}`, m)
                    delete tekateki[m.sender.split('@')[0]]
                }   
            }
            break

            // GROUP COMMNAND
            // INFORMATION COMMNAND
            case 'covid': {
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/information/covidworld", {}, "apikey"))
                let caption = `Covid-19 Information :\n\n`
                let i = fetch.result
                caption += `⭔ TotalCases : ${i.totalCases}\n`
                caption += `⭔ Recovered : ${i.recovered}\n`
                caption += `⭔ Deaths : ${i.deaths}\n`
                caption += `⭔ ActiveCases : ${i.activeCases}\n`
                caption += `⭔ ClosedCases : ${i.closedCases}\n`
                caption += `⭔ LastUpdate : ${i.lastUpdate}\n`
                sock.sendText(m.from, caption, m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'gempa': {
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/information/bmkg/gempa", {}, "apikey"))
                let caption = `Gempa Information :\n\n`
                let i = fetch.result
                caption += `⭔ Tanggal : ${i.tanggal}\n`
                caption += `⭔ Jam : ${i.jam}\n`
                caption += `⭔ Datetime : ${i.datetime}\n`
                caption += `⭔ Coordinates : ${i.coordinates}\n`
                caption += `⭔ Lintang : ${i.lintang}\n`
                caption += `⭔ Bujur : ${i.bujur}\n`
                caption += `⭔ Magnitude : ${i.magnitude}\n`
                caption += `⭔ Kedalaman : ${i.kedalaman}\n`
                caption += `⭔ Wilayah : ${i.wilayah}\n`
                caption += `⭔ Potensi : ${i.potensi}\n`
                caption += `⭔ Dirasakan : ${i.dirasakan}\n`
                caption += `⭔ Shakemap : ${i.shakemap}\n`
                sock.sendFile(m.from, i.shakemap, "", m, { caption })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'iplookup': {
                if (!q) return m.reply(`Example: ${prefix + command} query`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/information/iplookup", { query: text }, "apikey"))
                let caption = `IP Information :\n\n`
                let i = fetch.result
                caption += `⭔ Country : ${i.country}\n`
                caption += `⭔ Region : ${i.region}\n`
                caption += `⭔ City : ${i.city}\n`
                caption += `⭔ Zip : ${i.zip}\n`
                caption += `⭔ Latitude : ${i.latitude}\n`
                caption += `⭔ Longtitude : ${i.longtitude}\n`
                caption += `⭔ Isp : ${i.isp}\n`
                caption += `⭔ Domain : ${i.domain}\n`
                caption += `⭔ Usagetype : ${i.usage_type}\n`
                caption += `⭔ Time_zone : ${i.time_zone}\n`
                caption += `⭔ Local_time : ${i.local_time}\n`
                caption += `⭔ Addres_type : ${i.addres_type}\n`
                caption += `⭔ Category : ${i.category}\n`
                caption += `⭔ Proxy : ${i.proxy}\n`
                caption += `⭔ Provider : ${i.provider}\n`
                caption += `⭔ Weather : ${i.weather}\n`
                sock.sendText(m.from, caption, m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'kbbi': {
                if (!q) return m.reply(`Example: ${prefix + command} query`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/information/kbbi", { query: text }, "apikey"))
                let caption = `Arti Kbbi Dari ${text} :\n\n`
                let i = fetch.result
                caption += `${i.arti}`
                sock.sendText(m.from, caption, m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'translate': {
                if (!q) return m.reply(`Example: ${prefix + command} en|query`)
                if (!text.includes('|')) return m.reply(`Example : ${prefix + command} en|query`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let [a, b] = text.split`|`
                let fetch = await fetchUrl(global.api("zenz", "/information/translate/" + a, { query: b }, "apikey"))
                let caption = `Text Translator :\n\n`
                let i = fetch.result
                caption += `⭔ To ${a} : ${i}\n`
                sock.sendText(m.from, caption, m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'wikipedia': {
                if (!q) return m.reply(`Example: ${prefix + command} query`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/information/wikipedia", { query: text }, "apikey"))
                let caption = `Wikipedia Dari ${text} :\n\n`
                let i = fetch.result
                caption += `${i.isi}\n`
                sock.sendText(m.from, caption, m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            
            // ISLAMI COMMNAND
            case 'audioayat': {
                if (!text.includes('|')) return m.reply(`Example : ${prefix + command} 1|1`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let [a, b] = text.split`|`
                sock.sendFile(m.from, global.api("zenz", `/islami/quran/audio/${a}/${b}`, {}, "apikey"), "", m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'audiosurah': {
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                sock.sendFile(m.from, global.api("zenz", `/islami/quran/audio/${text}`, {}, "apikey"), "", m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'jadwalsholat': {
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/islami/jadwalshalat", { kota: text }, "apikey"))
                let i = fetch.result
                let teks = `Jadwal Sholat Kota : ${text}\n\n`
                teks += `⭔ Tanggal : ${i.tanggal}\n`
                teks += `⭔ Subuh : ${i.shubuh}\n`
                teks += `⭔ Duha : ${i.duha}\n`
                teks += `⭔ Dzuhur : ${i.dzuhur}\n`
                teks += `⭔ Ashar : ${i.ashar}\n`
                teks += `⭔ Maghrib : ${i.maghrib}\n`
                teks += `⭔ Isya : ${i.isya}`
                sock.sendText(m.from, teks, m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'kisahmuslim': {
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/islami/kisahmuslim", {}, "apikey"))
                let teks = `⭔ Judul : ${fetch.result.Judul}\n⭔ Kisah :\n${fetch.result.Cerita}`
                sock.sendFile(m.from, fetch.result.Thumb, "", m, { caption: teks })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'kisahnabi': {
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                if (text) {
                    title = text.toLowerCase()
                    let fetch = await fetchUrl(global.api("zenz", `/islami/kisahnabi/${title}`, {}, "apikey"))
                    let teks = `⭔ Nama : ${fetch.result.name}\n⭔ Lahir : ${fetch.result.lahir}\n⭔ Umur : ${fetch.result.age}\n⭔ Lokasi : ${fetch.result.place}\n⭔ Kisah :\n${fetch.result.story}`
                    sock.sendFile(m.from, "https://i.pinimg.com/originals/a6/81/c5/a681c55ca1bee611c39d3b4a58712dc3.jpg", "", m, { caption: teks })
                } else if (!text) {
                    const sections = [{
                        title: "Kisah Nabi",
                        rows: [
                            {title: "Kisah Nabi Adam", rowId: ".kisahnabi adam"},
                            {title: "Kisah Nabi Idris", rowId: ".kisahnabi idris"},
                            {title: "Kisah Nabi Nuh", rowId: ".kisahnabi nuh"},
                            {title: "Kisah Nabi Hud", rowId: ".kisahnabi hud"},
                            {title: "Kisah Nabi Sholeh", rowId: ".kisahnabi sholeh"},
                            {title: "Kisah Nabi Ibrahim", rowId: ".kisahnabi ibrahim"},
                            {title: "Kisah Nabi Luth", rowId: ".kisahnabi luth"},
                            {title: "Kisah Nabi Ismail", rowId: ".kisahnabi ismail"},
                            {title: "Kisah Nabi Ishaq", rowId: ".kisahnabi ishaq"},
                            {title: "Kisah Nabi Yaqub", rowId: ".kisahnabi yaqub"},
                            {title: "Kisah Nabi Yusuf", rowId: ".kisahnabi yusuf"},
                            {title: "Kisah Nabi Ayyub", rowId: ".kisahnabi ayyub"},
                            {title: "Kisah Nabi Syuaib", rowId: ".kisahnabi syuaib"},
                            {title: "Kisah Nabi Musa", rowId: ".kisahnabi musa"},
                            {title: "Kisah Nabi Harun", rowId: ".kisahnabi harun"},
                            {title: "Kisah Nabi Dzulkifli", rowId: ".kisahnabi dzulkifli"},
                            {title: "Kisah Nabi Daud", rowId: ".kisahnabi daud"},
                            {title: "Kisah Nabi Sulaiman", rowId: ".kisahnabi sulaiman"},
                            {title: "Kisah Nabi Ilyas", rowId: ".kisahnabi ilyas"},
                            {title: "Kisah Nabi Ilyasa", rowId: ".kisahnabi ilyasa"},
                            {title: "Kisah Nabi Yunus", rowId: ".kisahnabi yunus"},
                            {title: "Kisah Nabi Zakariya", rowId: ".kisahnabi zakariya"},
                            {title: "Kisah Nabi Yahya", rowId: ".kisahnabi yahya"},
                            {title: "Kisah Nabi Isa", rowId: ".kisahnabi isa"},
                            {title: "Kisah Nabi Muhammad", rowId: ".kisahnabi muhammad"}
                        ]
                    }]
                    const listMessage = {
                        text: "List 25 Nabi",
                        footer: config.footer,
                        buttonText: "OPEN LIST",
                        sections
                    }
                    const sendMsg = await sock.sendMessage(m.from, listMessage, { quoted: m })
                }
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'listkota': {
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/islami/listkota", {}, "apikey"))
                let teks = `List Kota Di seluruh Indonesia\n\n`
                for (let i of fetch.result) {
                    teks += `⭔ Provinsi : ${i.provinsi}\n`
                    teks += `⭔ Kota : \n${i.kota.join("\n")}\n`
                    teks += `\n`
                }
                sock.sendText(m.from, teks, m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'listsurah': {
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/islami/listsurah", {}, "apikey"))
                let teks = `List Surah Al-quran\n\n`
                for (var x in fetch.result) {
                    teks += `${x}. ${fetch.result[x]}\n`
                }
                sock.sendText(m.from, teks, m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            
            // MAIN COMMAND
            case 'help': case 'menu': {
                //const help = menu(senderName)
                let templateButtons = [
                    { urlButton: { displayText: "Source Code", url: "https://github.com/zhwzein/weabot" } },
                    { urlButton: { displayText: "Main APIs", url: "http://zenzapis.xyz" } },
                    { quickReplyButton: { displayText: "Button 1", id: "#" } },
                    { quickReplyButton: { displayText: "Button 2", id: "#" } },
                    { quickReplyButton: { displayText: "Button 3", id: "#" } },
                ]
                
                let templateMessage = {
                    image: { url: 'https://camo.githubusercontent.com/23f3195d91e7095ae37ef6a22475b9f1206f8334bc3e5ca61637f7d7e8cf962a/68747470733a2f2f692e70696e696d672e636f6d2f373336782f66662f38372f62372f66663837623730653963396465613464396361333263393533386138316333622e6a7067' },
                    caption: menu(senderName),
                    footer: config.footer,
                    templateButtons: templateButtons
                }
    
                sock.sendMessage(m.from, templateMessage, { quoted: m })
                //sock.sendText(m.from, help, m)
            }
            break
            case 'ping': case 'p': {
                const timestamp = speed();
                const latensi = speed() - timestamp
                exec(`neofetch --stdout`, (error, stdout, stderr) => {
                    const pingnya = `*_Speed: ${latensi.toFixed(4)}s_*`
                    m.reply(pingnya)
                })
            }
            break
            case 'premiumlist': {
                let data = _user.filter((x)=>x.premium === true)
                let caption = `List Prem\nAmount : ${data.length}\n\n`
                for (let i of data) {
                    let checkExp = require("parse-ms")(i.expired - Date.now());
                    caption += `*ID :* wa.me/${i.id.split("@")[0]}\n*Expired :* ${checkExp.days} day ${checkExp.hours} hour ${ checkExp.minutes } minute ${checkExp.seconds} second\n\n`;
                }
                sock.sendText(m.from, caption, m)
            }
            break

            // MORENSFW COMMNAND
            case 'mnsfwimage': {
                if (!q) return m.reply(`List Type :\n\n${mnsfw_type().sort((a, b) => a - b).join("\n")}\n\nExample : ${prefix + command} <type>`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await global.api("zenz", "/api/morensfw/" + text, {}, "apikey")
                let buttons = [
                    {buttonId: `mnsfwimage ${text}`, buttonText: { displayText: 'NEXT'}, type: 1 }
                ]
                let buttonMessage = {
                    image: { url: fetch },
                    caption: `Random NSFW Image ${text}`,
                    footer: config.footer,
                    buttons: buttons,
                    headerType: 4
                }
                sock.sendMessage(m.from, buttonMessage, { quoted: m })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
                function mnsfw_type() {
                    return ["ahegao","ass","bdsm","blowjob","cuckold","cum","ero","femdom","foot","gangbang","glasses","hentai","hentaigif","jahy","maid",
                    "manga","masturbation","mobilewall","netorare","nsfwneko","sfwneko","orgy","panties","pussy","tentacles","thighs","yuri","zettairyouiki"]
                }
            }
            break
            case 'mnsfwmenu': {
                const sections = [{
                    title: "Morensfw",
                    rows: [
                        {title: "Random Ahegao", rowId: ".mnsfwimage ahegao"},
                        {title: "Random Ass", rowId: ".mnsfwimage ass"},
                        {title: "Random BDSM", rowId: ".mnsfwimage bdsm"},
                        {title: "Random Blowjob", rowId: ".mnsfwimage blowjob"},
                        {title: "Random Cuckold", rowId: ".mnsfwimage cuckold"},
                        {title: "Random Cum", rowId: ".mnsfwimage cum"},
                        {title: "Random Ero", rowId: ".mnsfwimage ero"},
                        {title: "Random Femdom", rowId: ".mnsfwimage femdom"},
                        {title: "Random Foot", rowId: ".mnsfwimage foot"},
                        {title: "Random Gangbang", rowId: ".mnsfwimage gangbang"},
                        {title: "Random Glasses", rowId: ".mnsfwimage glasses"},
                        {title: "Random Hentai", rowId: ".mnsfwimage hentai"},
                        {title: "Random Hentaigif", rowId: ".mnsfwimage hentaigif"},
                        {title: "Random Jahy", rowId: ".mnsfwimage jahy"},
                        {title: "Random Maid", rowId: ".mnsfwimage maid"},
                        {title: "Random Manga", rowId: ".mnsfwimage manga"},
                        {title: "Random Masturbation", rowId: ".mnsfwimage masturbation"},
                        {title: "Random Mobilewall", rowId: ".mnsfwimage mobilewall"},
                        {title: "Random Netorare", rowId: ".mnsfwimage netorare"},
                        {title: "Random Nsfwneko", rowId: ".mnsfwimage nsfwneko"},
                        {title: "Random Sfwneko", rowId: ".mnsfwimage sfwneko"},
                        {title: "Random Orgy", rowId: ".mnsfwimage orgy"},
                        {title: "Random Panties", rowId: ".mnsfwimage panties"},
                        {title: "Random Pussy", rowId: ".mnsfwimage pussy"},
                        {title: "Random Tentacles", rowId: ".mnsfwimage tentacles"},
                        {title: "Random Thighs", rowId: ".mnsfwimage thighs"},
                        {title: "Random Yuri", rowId: ".mnsfwimage yuri"},
                        {title: "Random Zettairyouiki", rowId: ".mnsfwimage zettairyouiki"},
                    ]
                }]
                const listMessage = {
                    text: "More NSFW",
                    footer: config.footer,
                    buttonText: "OPEN LIST",
                    sections
                }
                const sendMsg = await sock.sendMessage(m.from, listMessage, { quoted: m })
            }
            break

            // NEKOSLIFE COMMNAND
            case 'sfwgif': {
                if (!q) return m.reply(`List Type :\n\n${sfwgif_type().sort((a, b) => a - b).join("\n")}\n\nExample : ${prefix + command} <type>`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await global.api("zenz", "/api/anime/sfw/" + text, {}, "apikey")
                sock.sendFile(m.from, fetch, "", m, { asSticker: true, author: config.exif.author, packname: config.exif.packname, categories: ['😄','😊'] })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
                function sfwgif_type() {
                    return ["cuddle","slap","baka","tickle","pat","kiss","hug","feed","smug","poke"]
                }
            }
            break
            case 'sfwimage': {
                if (!q) return m.reply(`List Type :\n\n${sfwimage_type().sort((a, b) => a - b).join("\n")}\n\nExample : ${prefix + command} <type>`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await global.api("zenz", "/api/anime/sfw/" + text, {}, "apikey")
                let buttons = [
                    {buttonId: `sfwimage ${text}`, buttonText: { displayText: 'NEXT'}, type: 1 }
                ]
                let buttonMessage = {
                    image: { url: fetch },
                    caption: `Random SFW Image ${text}`,
                    footer: config.footer,
                    buttons: buttons,
                    headerType: 4
                }
                sock.sendMessage(m.from, buttonMessage, { quoted: m })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
                function sfwimage_type() {
                    return ["waifu","gecg","avatar","kemonomimi","holo","meow","neko","fox_girl","wallpaper"]
                }
            }
            break
            case 'sfwmenu': {
                const sections = [{
                    title: "Sfw",
                    rows: [
                        {title: "Random Waifu", rowId: ".sfwimage waifu"},
                        {title: "Random Gecg", rowId: ".sfwimage gecg"},
                        {title: "Random Avatar", rowId: ".sfwimage avatar"},
                        {title: "Random Kemonomimi", rowId: ".sfwimage kemonomimi"},
                        {title: "Random Holo", rowId: ".sfwimage holo"},
                        {title: "Random Meow", rowId: ".sfwimage meow"},
                        {title: "Random Neko", rowId: ".sfwimage neko"},
                        {title: "Random FoxGirl", rowId: ".sfwimage fox_girl"},
                        {title: "Random Wallpaper", rowId: ".sfwimage wallpaper"},
                    ]
                },
                {
                    title: "Sfw 2",
                    rows: [
                        {title: "Cuddle [GIF]", rowId: ".sfwgif cuddle"},
                        {title: "Slap [GIF]", rowId: ".sfwgif slap"},
                        {title: "Baka [GIF]", rowId: ".sfwgif baka"},
                        {title: "Tickle [GIF]", rowId: ".sfwgif tickle"},
                        {title: "Pat [GIF]", rowId: ".sfwgif pat"},
                        {title: "Kiss [GIF]", rowId: ".sfwgif kiss"},
                        {title: "Hug [GIF]", rowId: ".sfwgif hug"},
                        {title: "Feed [GIF]", rowId: ".sfwgif feed"},
                        {title: "Smug [GIF]", rowId: ".sfwgif smug"},
                        {title: "Poke [GIF]", rowId: ".sfwgif poke"}
                    ]
                }]
                const listMessage = {
                    text: "NekosLife [SFW]",
                    footer: config.footer,
                    buttonText: "OPEN LIST",
                    sections
                }
                const sendMsg = await sock.sendMessage(m.from, listMessage, { quoted: m })
            }
            break
            // NEWS COMMNAND
            case 'antaranews': {
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/news/antaranews", {}, "apikey"))
                let caption = `Latest News From Antaranews\n\n`
                for (let i of fetch.result) {
                    caption += `⭔ Judul Berita : ${i.berita}\n`
                    caption += `⭔ Di Upload : ${i.berita_diupload}\n`
                    caption += `⭔ Jenis : ${i.berita_jenis}\n`
                    caption += `⭔ Url : ${i.berita_url}\n\n`
                }
                sock.sendFile(m.from, fetch.result[0].berita_thumb, "", m, { caption })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'bbcnews': {
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/news/bbc", {}, "apikey"))
                let caption = `Latest News From BBC\n\n`
                for (let i of fetch.result) {
                    caption += `⭔ Judul Berita : ${i.berita}\n`
                    caption += `⭔ Di Upload : ${i.berita_diupload}\n`
                    caption += `⭔ Url : ${i.berita_url}\n\n`
                }
                sock.sendText(m.from, caption, m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'cnbcnews': {
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/news/cnbc", {}, "apikey"))
                let caption = `Latest News From CNBC\n\n`
                for (let i of fetch.result) {
                    caption += `⭔ Judul Berita : ${i.berita}\n`
                    caption += `⭔ Di Upload : ${i.berita_diupload}\n`
                    caption += `⭔ Url : ${i.berita_url}\n\n`
                }
                sock.sendFile(m.from, fetch.result[0].berita_thumb, "", m, { caption })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'dailynews': {
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/news/dailynews", {}, "apikey"))
                let caption = `Latest News From Dailynews\n\n`
                for (let i of fetch.result) {
                    caption += `⭔ Judul Berita : ${i.berita}\n`
                    caption += `⭔ Url : ${i.berita_url}\n\n`
                }
                sock.sendFile(m.from, fetch.result[0].berita_thumb, "", m, { caption })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'detiknews': {
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/news/detiknews", {}, "apikey"))
                let caption = `Latest News From Detiknews\n\n`
                for (let i of fetch.result) {
                    caption += `⭔ Judul Berita : ${i.berita}\n`
                    caption += `⭔ Di Upload : ${i.berita_diupload}\n`
                    caption += `⭔ Url : ${i.berita_url}\n\n`
                }
                sock.sendFile(m.from, fetch.result[0].berita_thumb, "", m, { caption })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'inews': {
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/news/inews", {}, "apikey"))
                let caption = `Latest News From inews\n\n`
                for (let i of fetch.result) {
                    caption += `⭔ Judul Berita : ${i.berita}\n`
                    caption += `⭔ Di Upload : ${i.berita_diupload}\n`
                    caption += `⭔ Jenis Berita : ${i.berita_jenis}\n`
                    caption += `⭔ Url : ${i.berita_url}\n\n`
                }
                sock.sendText(m.from, caption, m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'kompasnews': {
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/news/kompas", {}, "apikey"))
                let caption = `Latest News From Kompasnews\n\n`
                for (let i of fetch.result) {
                    caption += `⭔ Judul Berita : ${i.berita}\n`
                    caption += `⭔ Di Upload : ${i.berita_diupload}\n`
                    caption += `⭔ Jenis : ${i.berita_jenis}\n`
                    caption += `⭔ Url : ${i.berita_url}\n\n`
                }
                sock.sendFile(m.from, fetch.result[0].berita_thumb, "", m, { caption })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'kontanews': {
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/news/kontanews", {}, "apikey"))
                let caption = `Latest News From Kontanews\n\n`
                for (let i of fetch.result) {
                    caption += `⭔ Judul Berita : ${i.berita}\n`
                    caption += `⭔ Di Upload : ${i.berita_diupload}\n`
                    caption += `⭔ Jenis : ${i.berita_jenis}\n`
                    caption += `⭔ Url : ${i.berita_url}\n\n`
                }
                sock.sendFile(m.from, fetch.result[0].berita_thumb, "", m, { caption })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'koransindo': {
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/news/koransindo", {}, "apikey"))
                let caption = `Latest News From Koransindo\n\n`
                for (let i of fetch.result) {
                    caption += `⭔ Judul Berita : ${i.berita}\n`
                    caption += `⭔ Jenis Berita : ${i.berita_jenis}\n`
                    caption += `⭔ Url : ${i.berita_url}\n\n`
                }
                sock.sendText(m.from, caption, m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'okezone': {
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/news/okezone", {}, "apikey"))
                let caption = `Latest News From Okezone\n\n`
                for (let i of fetch.result) {
                    caption += `⭔ Judul Berita : ${i.berita}\n`
                    caption += `⭔ Di Upload : ${i.berita_diupload}\n`
                    caption += `⭔ Url : ${i.berita_url}\n\n`
                }
                sock.sendFile(m.from, fetch.result[0].berita_thumb, "", m, { caption })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'temponews': {
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/news/temponews", {}, "apikey"))
                let caption = `Latest News From Temponews\n\n`
                for (let i of fetch.result) {
                    caption += `⭔ Judul Berita : ${i.berita}\n`
                    caption += `⭔ Di Upload : ${i.berita_diupload}\n`
                    caption += `⭔ Url : ${i.berita_url}\n\n`
                }
                sock.sendFile(m.from, fetch.result[0].berita_thumb, "", m, { caption })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'tribunews': {
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/news/tribunews", {}, "apikey"))
                let caption = `Latest News From Tribunews\n\n`
                for (let i of fetch.result) {
                    caption += `⭔ Judul Berita : ${i.title}\n`
                    caption += `⭔ Di Upload : ${i.title}\n`
                    caption += `⭔ Desc : ${i.desc}\n`
                    caption += `⭔ Url : ${i.url}\n\n`
                }
                sock.sendText(m.from, caption, m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break

            // OWNER COMMNAND
            case 'autoread': {
                if (!isOwner) return global.mess("owner", m)
                if (text === 'enable') {
                    if (config.options.autoRead == true) return m.reply('AutoRead already active')
                    config.options.autoRead = true
                    fs.writeFileSync('./config.json', JSON.stringify(config, null, 2))
                    m.reply(`AutoRead Success activated`)
                } else if (text === 'disable') {
                    if (config.options.autoRead === false) return m.reply('AutoRead already deactive')
                    config.options.autoRead = false
                    fs.writeFileSync('./config.json', JSON.stringify(config, null, 2))
                    m.reply(`AutoRead Success deactivated`)
                } else {
                    m.reply(`*⭔ AutoRead Status:* ${config.options.autoRead ? 'Activated' : 'Deactivated'}\n\n_Pilih enable atau disable!_`)
                }
            }
            break
            case 'premium': case 'prem': {
                if (!isOwner) return global.mess("owner", m)
                if (args.length < 2) return m.reply(`Example: ${prefix + command} add @tag/62812xxx 30d\nExample: ${prefix + command} del @tag/62812xxx`)
                if (ar[0] === 'add') {
                    if (m.mentions.length !== 0) {
                        for (let i = 0; i < m.mentions.length; i++) {
                            user.addPremiumUser(m.mentions[0], args[2], _user);
                            m.reply(`*「 PREMIUM ADDED 」*\n\n*ID :* ${args[1]}\n*Expired :* ${ms(toMs(args[2])).days} day ${ms(toMs(args[2])).hours} hour ${ms(toMs(args[2])).minutes} minute`)
                        }
                    } else {
                        user.addPremiumUser(args[1] + "@s.whatsapp.net", args[2], _user);
                        m.reply(`*「 PREMIUM ADDED 」*\n\n*ID :* ${args[1]}\n*Expired :* ${ms(toMs(args[2])).days} day ${ms(toMs(args[2])).hours} hour ${ms(toMs(args[2])).minutes} minute`)
                    }
                } else if (ar[0] === 'del') {
                    if (m.mentions.length !== 0) {
                        for (let i = 0; i < m.mentions.length; i++) {
                            user.delPremiumUser(m.mentions[0], _user)
                            m.reply('Premium Deleted')
                        }
                    } else {
                        user.delPremiumUser(args[1] + "@s.whatsapp.net", _user);
                        m.reply('Premium Deleted')
                    }
                } else {
                    m.reply('Pilih add / del')
                }
            }
            break
            case 'getcase': {
                if (!isOwner) return global.mess("owner", m)
                if (!q) return m.reply(`Example: ${prefix + command} query`)
                try {
                    m.reply("case" + text + fs.readFileSync('./sock.js').toString().split('case \''+ text +'\'')[1].split("break")[0] + "break")
                } catch {
                    m.reply("Case tidak ditemukan")
                }
            }
            break
            case 'self': {
                if (!isOwner) return global.mess("owner", m)
                if (text === 'enable') {
                    if (config.options.self == true) return m.reply('Self already active')
                    config.options.self = true
                    fs.writeFileSync('./config.json', JSON.stringify(config, null, 2))
                    m.reply(`BOT Now In Self Mode`)
                } else if (text === 'disable') {
                    if (config.options.self === false) return m.reply('Self already deactive')
                    config.options.self = false
                    fs.writeFileSync('./config.json', JSON.stringify(config, null, 2))
                    m.reply(`BOT Now In Public Mode`)
                } else {
                    m.reply(`*⭔ Self Mode Status:* ${config.options.self ? 'Activated' : 'Deactivated'}\n\n_Pilih enable atau disable!_`)
                }
            }
            break
            case 'setexif': case 'exif': {
                if (!isOwner) return global.mess("owner", m)
                if (!text) return m.reply(`Example : ${prefix + command} packname|author`)
                config.exif.packname = text.split("|")[0]
                config.exif.author = text.split("|")[1]
                m.reply(`Exif berhasil diubah menjadi\n\n⭔ Packname : ${config.exif.packname}\n⭔ Author : ${config.exif.author}`)
            }
            break

            // PHOTOEDITOR COMMNAND
            case 'blur': case 'brighten': case 'circle': case 'comrade': case 'contrast': case 'gay': case 'glass': case 'greyscale':
            case 'invert': case 'jail': case 'passed': case 'pixelate': case '2x': case 'sepia': case 'upscale': case 'wasted': {
                if (!quoted) return  m.reply(`Reply to Supported media With Caption ${prefix + command}`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                if (/image/.test(mime)) {
                    let download = await sock.downloadAndSaveMediaMessage(quoted)
                    file_name = getRandom('jpg')
                    request({
                        url: global.api("zenz", "/photoeditor/" + command, {}, "apikey"),
                        method: 'POST',
                        formData: {
                            "sampleFile": fs.createReadStream(download)
                        },
                        encoding: "binary"
                    }, async function(error, response, body) {
                        fs.unlinkSync(download)
                        fs.writeFileSync(file_name, body, "binary")
                        ini_buff = fs.readFileSync(file_name)
                        await sock.sendFile(m.from, ini_buff, "", m).then(() => {
                            fs.unlinkSync(file_name)
                        })
                    });
                } else {
                    return m.reply(`Reply to Supported media With Caption ${prefix + command}`, m.from, { quoted: m })
                }
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            
            // PRIMBON COMMNAND
            case 'artimimpi': case 'artinama': {
                if (!q) return m.reply(`Example: ${prefix + command} query`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/primbon/" + command, { query: text }, "apikey"))
                let caption = `Primbon ${command} :\n\n`
                let i = fetch.result
                caption += `⭔ Mimpi : ${i.mimpi}\n`
                caption += `⭔ Arti : ${i.arti}\n`
                sock.sendText(m.from, caption, m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'shio': case 'cekshio': {
                if (!q) return m.reply(`List Type :\n\n${shio_type().sort((a, b) => a - b).join("\n")}\n\nExample : ${prefix + command} <type>`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/primbon/shio", { query: text }, "apikey"))
                let caption = `Primbon Arti Shio :\n\n`
                let i = fetch.result
                caption += `⭔ Catatan : ${i.result}\n`
                sock.sendText(m.from, caption, m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
                function shio_type() {
                    return [ "Tikus", "Kerbau", "Macan", "Kelinci", "Naga", "Ular", "Kuda", "Kambing", "Monyet", "Ayam", "Anjing", "Babi" ]
                }
            }
            break
            case 'zodiak': case 'cekzodiak': {
                if (!q) return m.reply(`List Type :\n\n${zodiak_type().sort((a, b) => a - b).join("\n")}\n\nExample : ${prefix + command} <type>`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/primbon/zodiak", { query: text }, "apikey"))
                let caption = `Primbon Arti Zodiak :\n\n`
                let i = fetch.result.result
                caption += `⭔ Nama zodiak : ${i.zodiak}\n`
                caption += `⭔ Nomor keberuntungan : ${i.nomor_keberuntungan}\n`
                caption += `⭔ Aroma keberuntungan : ${i.aroma_keberuntungan}\n`
                caption += `⭔ Planet yang mengitari : ${i.planet_yang_mengitari}\n`
                caption += `⭔ Bunga keberuntungan : ${i.bunga_keberuntungan}\n`
                caption += `⭔ Warna keberuntungan : ${i.warna_keberuntungan}\n`
                caption += `⭔ Batu keberuntungan : ${i.batu_keberuntungan}\n`
                caption += `⭔ Elemen keberuntungan : ${i.elemen_keberuntungan}\n`
                caption += `⭔ Pasangan zodiak : ${i.pasangan_zodiak}\n\n`
                caption += `⭔ Catatan : ${i.catatan}\n`
                sock.sendText(m.from, caption, m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
                function zodiak_type() {
                    return [
                        "CAPRICORN (22 Desember - 20 Januari)",
                        "AQUARIUS (21 Januari - 19 Februari)",
                        "PISCES (20 Februari - 20 Maret)",
                        "ARIES (21 Maret – 19 April)",
                        "TAURUS (21 April - Mei 20)",
                        "GEMINI (21 Mei - Juni 21)",
                        "CANCER (22 Juni - Juli 22)",
                        "LEO (23 Juli - 23 Agustus)",
                        "VIRGO (24 Agustus - 22 September)",
                        "LIBRA (23 September - 23 Oktober)",
                        "SCORPIO (24 Oktober - 22 November)",
                        "SAGITARIUS (23 November - 21 Desember)"
                    ]
                }
            }
            break
            case 'haribaik': case 'harilarangan': case 'jadian': case 'rejekiweton': {
                let [a, b, c] = args
                if (!a, !b, !c) return m.reply(`Example : ${prefix + command} 11 06 2007`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", `/primbon/${command}/${a}/${b}/${c}`, {}, "apikey"))
                let caption = `Primbon${command} :\n\n`
                let i = fetch.result
                caption += `⭔ Catatan : ${i.message}\n`
                sock.sendText(m.from, caption, m)
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break

            // RANDOMANIME COMMNAND
            case 'animecouple': {
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/randomanime/couples", {}, "apikey"))
                sock.sendFile(m.from, fetch.result.male, "", m, { caption: "Random Anime Couples Male" })
                sock.sendFile(m.from, fetch.result.female, "", m, { caption: "Random Anime Couples Female" })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'animemenu': {
                const sections = [{
                    title: "Random Image",
                    rows: [
                        {title: "Random Anime Couple", rowId: ".animecouple"},
                        {title: "Random Anime", rowId: ".randomanime anime"},
                        {title: "Random Waifu", rowId: ".randomanime waifu"},
                        {title: "Random Husbu", rowId: ".randomanime husbu"},
                        {title: "Random Neko", rowId: ".randomanime neko"},
                        {title: "Random Shinobu", rowId: ".randomanime shinobu"},
                        {title: "Random Megumin", rowId: ".randomanime megumin"},
                        {title: "Random Uniform", rowId: ".randomanime uniform"},
                        {title: "Random Maid", rowId: ".randomanime maid"},
                        {title: "Random MarinKitagawa", rowId: ".randomanime marin-kitagawa"},
                        {title: "Random MoriCalliope", rowId: ".randomanime mori-calliope"},
                        {title: "Random RaidenShogun", rowId: ".randomanime raiden-shogun"},
                        {title: "Random Oppai", rowId: ".randomanime oppai"},
                        {title: "Random Selfies", rowId: ".randomanime selfies"},
                    ]
                },
                {
                    title: "Random Image 2",
                    rows: [
                        {title: "Random Waifu [NSFW]", rowId: ".randomanime waifus"},
                        {title: "Random Neko [NSFW]", rowId: ".randomanime nekos"},
                        {title: "Random Trap [NSFW]", rowId: ".randomanime trap"},
                        {title: "Random Blowjob [NSFW]", rowId: ".randomanime blowjob"},
                        {title: "Random Ass [NSFW]", rowId: ".randomanime ass"},
                        {title: "Random Hentai [NSFW]", rowId: ".randomanime hentai"},
                        {title: "Random Milf [NSFW]", rowId: ".randomanime milf"},
                        {title: "Random Oral [NSFW]", rowId: ".randomanime oral"},
                        {title: "Random Paizuri [NSFW]", rowId: ".randomanime paizuri"},
                        {title: "Random Ecchi [NSFW]", rowId: ".randomanime ecchi"},
                        {title: "Random Ero [NSFW]", rowId: ".randomanime ero"},
                    ]
                }]
                const listMessage = {
                    text: "Random Image",
                    footer: config.footer,
                    buttonText: "OPEN LIST",
                    sections
                }
                const sendMsg = await sock.sendMessage(m.from, listMessage, { quoted: m })
            }
            break
            case 'randomanime': {
                if (!q) return m.reply(`List Type :\n\n${randomanime_type().sort((a, b) => a - b).join("\n")}\n\nExample : ${prefix + command} <type>`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await global.api("zenz", "/randomanime/" + text, {}, "apikey")
                let buttons = [
                    {buttonId: `randomanime ${text}`, buttonText: { displayText: 'NEXT'}, type: 1 }
                ]
                let buttonMessage = {
                    image: { url: fetch },
                    caption: `Random Anime ${text}`,
                    footer: config.footer,
                    buttons: buttons,
                    headerType: 4
                }
                sock.sendMessage(m.from, buttonMessage, { quoted: m })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
                function randomanime_type() {
                    return ["anime","waifu","husbu","neko","shinobu","megumin","uniform","maid","marin-kitagawa","mori-calliope","raiden-shogun","oppai","selfies","waifus","nekos","trap","blowjob","hentai","milf","oral","paizuri","ecchi","ero"]
                }
            }
            break

            // RANDOMASUPAN COMMNAND
            case 'asupan': case 'aeunicetjoaa': case 'natajadeh': case 'asupantiktok': {
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await global.api("zenz", "/randomasupan/" + command, {}, "apikey")
                sock.sendFile(m.from, fetch, "", m, { caption: "Random TikTok Asupan" })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'randomasupan': {
                if (!q) return m.reply(`List Type :\n\n${randomasupan_type().sort((a, b) => a - b).join("\n")}\n\nExample : ${prefix + command} <type>`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await global.api("zenz", "/randomasupan/" + text, {}, "apikey")
                let buttons = [
                    {buttonId: `randomasupan ${text}`, buttonText: { displayText: 'NEXT'}, type: 1 }
                ]
                let buttonMessage = {
                    image: { url: fetch },
                    caption: `Random Asupan ${text}`,
                    footer: config.footer,
                    buttons: buttons,
                    headerType: 4
                }
                sock.sendMessage(m.from, buttonMessage, { quoted: m })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
                function randomasupan_type() {
                    return ["cecan","china","thailand","vietnam","kayes","notnot","ryujin","justina","rose","kpop"]
                }
            }
            break
            case 'asupanmenu': {
                const sections = [{
                    title: "Random Asupan MP4",
                    rows: [
                        {title: "Random Asupan MP4", rowId: ".asupan"},
                        {title: "Random Asupan TikTok MP4", rowId: ".asupantiktok"},
                        {title: "Random Asupan Nata", rowId: ".natajadeh"},
                        {title: "Random Asupan Aeuni", rowId: ".aeunicetjoaa"},
                    ]
                },
                {
                    title: "Random Asupan Gambar",
                    rows: [
                        {title: "Random Cecan", rowId: ".randomasupan cecan"},
                        {title: "Random China", rowId: ".randomasupan china"},
                        {title: "Random Thailand", rowId: ".randomasupan thailand"},
                        {title: "Random Vietnam", rowId: ".randomasupan vietnam"},
                        {title: "Random Kayes", rowId: ".randomasupan kayes"},
                        {title: "Random NotNot", rowId: ".randomasupan notnot"},
                        {title: "Random Ryujin", rowId: ".randomasupan ryujin"},
                        {title: "Random Justina", rowId: ".randomasupan justina"},
                        {title: "Random Rose", rowId: ".randomasupan rose"},
                        {title: "Random Kpop", rowId: ".randomasupan kpop"},
                    ]
                }]
                const listMessage = {
                    text: "Random Asupan",
                    footer: config.footer,
                    buttonText: "OPEN LIST",
                    sections
                }
                const sendMsg = await sock.sendMessage(m.from, listMessage, { quoted: m })
            }
            break

            // RANDOMIMAGE COMMNAND
            case 'imagemenu': {
                const sections = [{
                    title: "Random Image",
                    rows: [
                        {title: "Random Cosplayer", rowId: ".randomimage cosplay"},
                        {title: "Random darkjoke", rowId: ".randomimage darkjoke"},
                        {title: "Random Meme", rowId: ".randomimage meme"},
                        {title: "Random MemeIndo", rowId: ".randomimage memeindo"},
                        {title: "Random Patrick", rowId: ".randomimage patrick"},
                    ]
                }]
                const listMessage = {
                    text: "Random Image",
                    footer: config.footer,
                    buttonText: "OPEN LIST",
                    sections
                }
                const sendMsg = await sock.sendMessage(m.from, listMessage, { quoted: m })
            }
            break
            case 'randomimage': {
                if (!q) return m.reply(`List Type :\n\n${randomimage_type().sort((a, b) => a - b).join("\n")}\n\nExample : ${prefix + command} <type>`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await global.api("zenz", "/randomimage/" + text, {}, "apikey")
                let buttons = [
                    {buttonId: `randomimage ${text}`, buttonText: { displayText: 'NEXT'}, type: 1 }
                ]
                let buttonMessage = {
                    image: { url: fetch },
                    caption: `Random Image ${text}`,
                    footer: config.footer,
                    buttons: buttons,
                    headerType: 4
                }
                sock.sendMessage(m.from, buttonMessage, { quoted: m })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
                function randomimage_type() {
                    return ["cosplay","darkjoke","meme","memeindo"]
                }
            }
            break
            // RANDOMTEXT COMMNAND
            // SEARCH COMMNAND
            case 'animequotes': {
                if (!q) return m.reply(`Example: ${prefix + command} query`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/searching/animequotes", { query: text }, "apikey"))
                let caption = `Anime Quotes Query : ${text}\n\n`
                let i = fetch.result
                caption += `⭔ Quotes : ${i.quotes}\n\n`
                caption += `⭔ Character : ${i.character}\n`
                caption += `⭔ Anime : ${i.anime}\n`
                caption += `⭔ Episode : ${i.episode}\n\n`
                sock.sendFile(m.from, i.thumb, "", m, { caption })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'dafontsearch': {
                if (!q) return m.reply(`Example: ${prefix + command} query`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/searching/dafontsearch", { query: text }, "apikey"))
                for (let i = 0; i < (fetch.result.length < 6 ? fetch.result.length : 6); i++) {
                    let download = await fetchUrl(global.api("zenz", "/downloader/dafont", { url: fetch.result[i].link }, "apikey"))
                    sock.sendFile(m.from, download.result.url, download.judul, m)
                }
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'gimage': {
                if (!q) return m.reply(`Example: ${prefix + command} query`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/searching/gimage", { query: text }, "apikey"))
                let random = fetch.result[Math.floor(Math.random() * fetch.result.length)]
                let buttons = [
                    {buttonId: `pinterest ${text}`, buttonText: { displayText: 'Next Image'}, type: 1 }
                ]
                let buttonMessage = {
                    image: { url: random },
                    caption: `Search Google Image Query : ${text}`,
                    footer: config.footer,
                    buttons: buttons,
                    headerType: 4
                }
                sock.sendMessage(m.from, buttonMessage, { quoted: m })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'liriklagu': {
                if (!q) return m.reply(`Example: ${prefix + command} query`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/searching/liriklagu", { query: text }, "apikey"))
                let caption = `Lyric Search Query : ${text}\n\n`
                caption += `⭔ Title : ${i.judul}\n`
                caption += `⭔ Singer : ${i.penyanyi}\n\n`
                caption += `⭔ Lyrics : ${i.lirik}\n`
                sock.sendFile(m.from, fetch.result.thumb, "", m, { caption })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            case 'pin': {
                if (!q) return m.reply(`Example: ${prefix + command} query`)
                if (user.isLimit(m.sender, isPremium, isOwner, config.options.limitCount, _user) && !m.fromMe) return global.mess("isLimit", m)
                let fetch = await fetchUrl(global.api("zenz", "/searching/pinterest", { query: text }, "apikey"))
                let random = fetch.result[Math.floor(Math.random() * fetch.result.length)]
                let buttons = [
                    {buttonId: `pin ${text}`, buttonText: { displayText: 'Next Image'}, type: 1 }
                ]  
                let buttonMessage = {
                    image: { url: random },
                    caption: `Search Pinterest Query : ${text}`,
                    footer: config.footer,
                    buttons: buttons,
                    headerType: 4
                }
                sock.sendMessage(m.from, buttonMessage, { quoted: m })
                user.limitAdd(m.sender, isPremium, isOwner, _user)
            }
            break
            // STALKER COMMNAND
            // TEXTMAKER COMMNAND
            // USERS COMMNAND
            // WEBZONE COMMNAND
        
            // Yang mau nambahin yu boleh banget ^^

            default:
                if (isCmd) {
                    m.reply('Command Not Found!')
                }
            break
        }
    } catch (e) {
        m.reply(String(e))
        var child = spawn('rs');
        child.on('error', (err) => {
            console.log(color('|ERR|', 'red'), color(err, 'cyan'))
        })
    }
}