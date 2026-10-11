const OpenAI = require("openai");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  try {
    const { message } = req.body || {};

    if (!message) {
      return res.status(400).json({ error: "پیغام لکھیں۔" });
    }

    const ai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const response = await ai.responses.create({
      model: "gpt-4.1-mini",
      input: message
    });

    return res.status(200).json({
      reply: response.output_text
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      error: "جواب نہیں آیا۔ API سیٹنگ چیک کریں۔"
    });
  }
};
