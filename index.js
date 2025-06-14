const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const fs = require('fs');
app.use(express.json({ limit: '10mb' }));

// Load knowledge base
const knowledge = JSON.parse(fs.readFileSync('./data/knowledge.json', 'utf-8'));

// Dummy answer generator (replace with OpenAI/LLM later)
function findAnswer(question) {
  const lowerQ = question.toLowerCase();
  const match = knowledge.find(k => lowerQ.includes(k.content.toLowerCase()));
  return match
    ? { answer: match.content, links: [{ url: match.url, text: match.title }] }
    : { answer: "Sorry, I don't know the answer yet.", links: [] };
}

app.post('/api', (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: 'Question is required' });

  const response = findAnswer(question);
  res.json(response);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
