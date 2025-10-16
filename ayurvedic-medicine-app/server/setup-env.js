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
`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env file in server directory');
  console.log('📝 Please edit the .env file with your actual MongoDB Atlas connection details');
} else {
  console.log('ℹ️  .env file already exists');
}
