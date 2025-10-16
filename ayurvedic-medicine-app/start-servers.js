import { spawn } from 'child_process';
import path from 'path';

console.log('🚀 Starting Ayurvedic Medicine App...\n');

// Start backend server
console.log('📡 Starting backend server...');
const backend = spawn('npm', ['run', 'dev'], {
  cwd: path.join(process.cwd(), 'server'),
  stdio: 'inherit',
  shell: true
});

// Start frontend server
console.log('🌐 Starting frontend server...');
const frontend = spawn('npm', ['start'], {
  cwd: process.cwd(),
  stdio: 'inherit',
  shell: true
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down servers...');
  backend.kill();
  frontend.kill();
  process.exit(0);
});

backend.on('error', (err) => {
  console.error('❌ Backend server error:', err);
});

frontend.on('error', (err) => {
  console.error('❌ Frontend server error:', err);
});
