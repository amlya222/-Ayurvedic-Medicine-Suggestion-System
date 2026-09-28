# Ayurvedic Medicine API (Server)

Create `.env` in this folder with:

```
MONGODB_URI=your-mongodb-uri
JWT_SECRET=change-me
PORT=5000
GEMINI_API_KEY=your-gemini-api-key
GEMINI_MODEL=gemini-3.8-flash
```

Create a Gemini API key in [Google AI Studio](https://aistudio.google.com/apikey), then set `GEMINI_API_KEY` in `server/.env`. Keep it private; do not put it in frontend code or commit it. The chatbot sends messages through the server, so restart the server after changing this setting. `GEMINI_MODEL` is optional and defaults to `gemini-3.8-flash`. Google currently offers a free tier with request limits; review the [Gemini API pricing and data-use terms](https://ai.google.dev/gemini-api/docs/pricing) before using it.

Start locally:

```
npm install
npm run dev
```


