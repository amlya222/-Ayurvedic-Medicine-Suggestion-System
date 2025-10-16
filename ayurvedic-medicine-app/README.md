# Ayurvedic Medicine Suggestion System

This project is a full-stack web application that helps users discover Ayurvedic medicines, track wellness habits, and manage their health profile.

## Features
- Search for Ayurvedic medicines and formulations
- Personalized wellness dashboard (Stay Healthy)
- Edit and save daily health tasks (water, yoga, sleep, meals, goals, streak)
- User authentication and profile management
- Responsive design for desktop and mobile

## Tech Stack
- **Frontend:** React, TypeScript, CSS
- **Backend:** Node.js, Express, MongoDB
- **Authentication:** JWT

## Getting Started

### 1. Clone the repository
```
git clone https://github.com/amlya222/-Ayurvedic-Medicine-Suggestion-System.git
cd Ayurvedic-Medicine-Suggestion-System
```

### 2. Install dependencies
```
cd ayurvedic-medicine-app
npm install
cd ../server
npm install
```

### 3. Set up environment variables
Create a `.env` file in the `server` folder and add your MongoDB connection string:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4. Start the servers
From the project root:
```
npm run dev
```
This will start both the frontend and backend servers.

### 5. Open the app
Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Folder Structure
- `ayurvedic-medicine-app/` - React frontend
- `server/` - Node.js backend
- `public/` and `src/` - Only inside `ayurvedic-medicine-app`

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
MIT
