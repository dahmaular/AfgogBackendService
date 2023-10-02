const config = require('config');

module.exports = function() {
  if (!config.get('jwtPrivateKey')) {
    throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
  }
}
// module.exports = {
//   secret: "flick_jwtPrivateKey",
//   user: "adedamolagunbiade@gmail.com", 
//   pass: "Excellency@1.", 
// };