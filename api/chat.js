const OpenAI = require('openai');

// Summary of Rankly360's selling points
const siteSummary = `
Rankly360 is a local SEO company specializing in Google Map Pack domination for businesses. Our key selling points:
- Proven track record: 500+ businesses helped achieve top 3 Google Maps rankings, with 200-500% increases in local leads.
- Expert team: Certified Google Partners and local SEO specialists with 8+ years of experience.
- Data-driven approach: Advanced analytics and proprietary tools for measurable results.
- White-hat methods: All strategies follow Google's guidelines for safe, sustainable results.
- Fast results: Most clients see significant improvements in 30-60 days.
- Cutting-edge technology: Advanced map embed stacking, authority building, and local SEO techniques.
- Transparent, one-time pricing for services like Map PowerBoost, Cloud Stack Boost, and Authority Embeds.
- Real client testimonials and before/after ranking proof.
- Focused on helping local businesses grow through Google Maps visibility.
`;

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'No message provided' });
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `You are Ray, a helpful assistant for Rankly360, a local SEO company. ONLY answer questions using the information below about Rankly360's real services, packages, and offerings. Do NOT make up services, guarantees, or features that are not listed. Reference the actual packages and offerings in your answers. If you don't know, say you don't know.\n\n${siteSummary}\n\nUser question: ${message}\n\nAI answer:`;
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are Ray, a helpful assistant for Rankly360, a local SEO company. ONLY answer questions using the information provided about Rankly360. Do NOT make up services, guarantees, or features that are not listed. Reference the actual packages and offerings in your answers. If you don\'t know, say you don\'t know.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0].message.content.trim();
    res.json({ answer: aiResponse });
  } catch (err) {
    console.error('Chat API Error:', err);
    res.status(500).json({ error: 'Failed to get AI response' });
  }
}; 