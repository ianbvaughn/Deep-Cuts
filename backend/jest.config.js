module.exports = {
   transform: {
   "\\.[jt]sx?$": "babel-jest",
   "^.+\\.mjs$": "babel-jest"
   },
   globalSetup: './global-setup.js',
   globalTeardown: './global-teardown.js'
};