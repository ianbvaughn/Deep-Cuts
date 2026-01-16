const { spawn } = require('child_process');

module.exports = async () => {
  console.log('Starting server...');
  
  // Spawn your server process
  const serverProcess = spawn('node', ['spotify-controller.mjs'], {
    stdio: 'inherit',
    detached: true
  });

  // Give the server time to start
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Store the PID so we can kill it later
  global.__SERVER_PID__ = serverProcess.pid;
  
  console.log(`Server started with PID: ${serverProcess.pid}`);
};