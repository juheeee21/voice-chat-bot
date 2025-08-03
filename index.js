const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Gemini AI Setup
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
  systemInstruction: `You are a helpful AI assistant for Revolt Motors, India's leading electric motorcycle company. 

IMPORTANT: Only provide information about Revolt Motors, their electric motorcycles, features, pricing, dealers, service, and related topics. For any unrelated questions, politely redirect the conversation back to Revolt Motors.

About Revolt Motors:
- Founded to revolutionize electric mobility in India
- Flagship models: RV400 and RV1+ electric motorcycles
- Features: Removable batteries, smartphone connectivity, multiple riding modes
- RV400: Premium electric motorcycle with 150km range, top speed 85 km/h
- RV1+: Affordable electric motorcycle with smart features
- Mobile app integration for bike monitoring and controls
- Artificial Intelligence features for personalized riding experience
- Pan-India dealership network and service centers
- Subscription plans available for battery swapping
- Focus on sustainable transportation and reducing pollution

Key Features to highlight:
- Removable lithium-ion batteries
- Multiple charging options (home/office/swap stations)
- Smart connectivity features
- Different riding modes (Eco, Normal, Sport, Custom)
- LED lighting and digital dashboard
- Anti-theft features and GPS tracking
- Competitive pricing with financing options

Keep responses:
- Conversational and friendly
- Concise (ideal for voice interaction)
- Focused on Revolt Motors only
- Helpful and informative
- Professional but approachable

If asked about competitors, pricing of other brands, general topics, or unrelated queries, politely say something like: "I'm specifically here to help with Revolt Motors questions. Let me tell you about our amazing electric motorcycles instead!" and then redirect to relevant Revolt information.`,
});

app.use(express.static(path.join(__dirname, 'public')));

wss.on('connection', (ws) => {
  console.log('Client connected');
  const chat = model.startChat({
    history: [],
    generationConfig: {
      maxOutputTokens: 100,
    },
  });

  ws.on('message', async (message) => {
    try {
      // We are assuming the message is a string for now.
      // For actual voice, we would handle audio data.
      const result = await chat.sendMessageStream(message.toString());
      
      let responseText = '';
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        responseText += chunkText;
      }
      
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(responseText);
      }

    } catch (error) {
      console.error('Error sending message to Gemini:', error);
      ws.send('Sorry, I encountered an error.');
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
