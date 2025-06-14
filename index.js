const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: '10mb' }));  // To handle base64 images

app.post('/api/', async (req, res) => {
  const { question, image } = req.body;

  // Simulated logic — you will plug in your real model later
  const answer = "You must use `gpt-3.5-turbo-0125`, even if the AI Proxy only supports `gpt-4o-mini`. Use the OpenAI API directly for this question.";
  const links = [
    {
      url: "https://discourse.onlinedegree.iitm.ac.in/t/ga5-question-8-clarification/155939/4",
      text: "Use the model that’s mentioned in the question."
    },
    {
      url: "https://discourse.onlinedegree.iitm.ac.in/t/ga5-question-8-clarification/155939/3",
      text: "My understanding is that you just have to use a tokenizer..."
    }
  ];

  res.json({ answer, links });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

