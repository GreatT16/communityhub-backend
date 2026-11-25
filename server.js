const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Sample data
let communities = [
  { id: 1, name: "Tech Hub", description: "For developers", members: 120 },
  { id: 2, name: "Design Hub", description: "UI/UX discussions", members: 85 }
];

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'CommunityHub API is running', version: '1.0.0' });
});

app.get('/api/communities', (req, res) => {
  res.json(communities);
});

app.get('/api/communities/:id', (req, res) => {
  const community = communities.find(c => c.id === parseInt(req.params.id));
  if (!community) return res.status(404).json({ error: 'Community not found' });
  res.json(community);
});

app.post('/api/communities', (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });
  const newCommunity = {
    id: communities.length + 1,
    name,
    description: description || '',
    members: 0
  };
  communities.push(newCommunity);
  res.status(201).json(newCommunity);
});

app.listen(PORT, () => {
  console.log(`CommunityHub backend running on http://localhost:${PORT}`);
});
