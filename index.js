import express from "express"
import { GoogleAuth } from "google-auth-library"
import cors from "cors"
import "dotenv/config"

const app = express()
app.use(cors())
const port = process.env.PORT || 3000

app.get("/", async (req, res) => {
  try {
    const auth = new GoogleAuth({
      credentials: {
        client_email: process.env.CLIENT_EMAIL,
        private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/datastore"],
    })

    const client = await auth.getClient()
    const accessTokenResponse = await client.getAccessToken()

    res.json({ token: accessTokenResponse.token })
  } catch (err) {
    console.error(err)
    res.status(500).send("Error generating token")
  }
})

app.listen(port, () => {
  console.log(`Firebase token server running on port ${port}`)
})
