import cron from "node-cron"
import { getLatestWhaleInfo } from "./Handlers/whale.controller.mjs"
import e from "express"
import axios from "axios"

const app = e()

app.get("/", (_req, res) => {
    return res.status(200).send("Hello World")
})

cron.schedule("* * * * *", async () => {
    try {
        const response = await axios.get(process.env.API_URL)
        console.log(response.data)
        const res = await getLatestWhaleInfo()
        if(res?.message_id) return console.log("Message sent successfully");
    } catch (error) {
        return console.log(error.message)
    }
})

app.listen(process.env.PORT || 8082, () => {
    console.log(`Server is running on port ${process.env.PORT || 8081}`)
})