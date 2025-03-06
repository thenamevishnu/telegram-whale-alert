import cron from "node-cron"
import { getLatestWhaleInfo } from "./Handlers/whale.controller.mjs"
import e from "express"

const app = e()

app.get("/", (_req, res) => {
    return res.send("Hello World")
})

cron.schedule("* * * * *", async () => {
    try {
        const res = await getLatestWhaleInfo()
        if(res?.message_id) return console.log("Message sent successfully");
    } catch (error) {
        return console.log(error.message)
    }
})