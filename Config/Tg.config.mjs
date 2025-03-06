import TelegramBot from "node-telegram-bot-api";

const tgBotToken = process.env.TG_BOT_TOKEN;

export const api = new TelegramBot(tgBotToken, {
    polling: {
        autoStart: true
    }
})