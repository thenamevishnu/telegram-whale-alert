import axios from "axios"
import { api } from "../Config/tg.config.mjs"
import { readFileSync, unlink, unlinkSync, writeFileSync } from "fs"

export const getLatestWhaleInfo = async () => {
    try {
        const key = process.env.API_KEY
        const { data } = await axios.get(`https://api.clankapp.com/v2/explorer/tx?api_key=${key}&s_timestamp=desc&>_amount_usd=100000000`)
        const response = data?.data?.[0]
        if (!response) return false
        const { format_amount, symbol, format_amount_usd, from_owner, to_owner, date, blockchain, hash, unique_machine_id } = response
        const lastHash = readFileSync("./last_id.txt", { encoding: "utf-8" })
        if (lastHash === hash) return false
        unlinkSync("./last_id.txt")
        writeFileSync("./last_id.txt", hash)
        const text = `💷 <code>${format_amount}</code> #${symbol.toUpperCase()} ~ <code>$${format_amount_usd}</code> moved from <code>${from_owner}</code> to <code>${to_owner}</code>\n\nDate : <code>${date}</code>\nBlockchain : #${blockchain.toUpperCase()}\nSymbol : #${symbol.toUpperCase()}`
        const inline_keyboard = [
            [
                {
                    text: '🔗 View Transaction',
                    url: `https://clankapp.com/tx/${symbol}/${hash}?uuid=${unique_machine_id}`
                }
            ]
        ]
        return await api.sendMessage(process.env.CHANNEL_ID, `<b>${text}</b>`, { parse_mode: "HTML", reply_markup: { inline_keyboard } })
    } catch (error) {
        return console.log(error.message)
    }
}