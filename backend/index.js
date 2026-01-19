import express from 'express'
import cors from 'cors'
import ollama from 'ollama'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

app.post('/chat', async (req, res) => {
  const { message } = req.body

  try {
    const response = await ollama.chat({
      model: 'llama3.1',
      messages: [{ role: 'user', content: message }],
    })

    res.json({
      reply: response.message.content,
    })
  } catch (error) {
    res.status(500).json({ error: 'Gagal memproses permintaan' })
  }
})

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`)
})
