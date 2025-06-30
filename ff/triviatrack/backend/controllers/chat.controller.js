// controllers/chat.controller.js
import axios from "axios";

export async function chatController(req, res) {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "No message provided" });
  }

  try {
    // call the HF Inference API for the free gpt2 model
    const hfResponse = await axios.post(
      "https://api-inference.huggingface.co/models/gpt2",
      {
        inputs: message,
        parameters: {
          max_new_tokens: 50,
          temperature: 0.7
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_TOKEN}`
        }
      }
    );

    const data = hfResponse.data;
    const reply = Array.isArray(data)
      ? data[0].generated_text
      : data.generated_text;

    return res.json({ reply });
  } catch (err) {
    console.error("Hugging-Face error:", err.response?.data || err.message);
    return res
      .status(500)
      .json({ error: `Hugging-Face error: ${err.response?.data || err.message}` });
  }
}
