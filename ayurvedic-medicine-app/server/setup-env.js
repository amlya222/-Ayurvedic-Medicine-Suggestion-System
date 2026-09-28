import fs from 'fs';
import path from 'path';

const envPath = path.join(process.cwd(), '.env');

if (!fs.existsSync(envPath)) {
  const envContent = `# MongoDB Atlas Connection
# Replace with your actual MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/ayurvedic-medicine?retryWrites=true&w=majority

# JWT Secret for authentication (change this in production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server Port
PORT=5000

# Gemini API key for the chatbot (keep this private)
GEMINI_API_KEY=your-gemini-api-key
GEMINI_MODEL=gemini-3.8-flash
`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env file in server directory');
  console.log('📝 Add your MongoDB connection details and Gemini API key to the .env file');
} else {
  console.log('ℹ️  .env file already exists');
}
