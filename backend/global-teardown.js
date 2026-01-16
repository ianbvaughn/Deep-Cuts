module.exports = async () => {
  console.log('Shutting down server...');
  
  if (global.__SERVER_PID__) {
    try {
      // Kill the process and its children
      process.kill(-global.__SERVER_PID__);
      console.log('Server shut down successfully');
    } catch (error) {
      console.error('Error shutting down server:', error);
    }
  }
};