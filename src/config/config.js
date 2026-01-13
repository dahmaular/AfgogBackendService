const config = require('config');

module.exports = function() {
  // Check environment variable first, then fall back to config file
  const jwtKey = process.env.afgog_jwtPrivateKey || config.get('jwtPrivateKey');
  
  if (!jwtKey) {
    throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
  }
}
// module.exports = {
//   secret: "flick_jwtPrivateKey",
//   user: "adedamolagunbiade@gmail.com", 
//   pass: "Excellency@1.", 
// };