var admin = require("firebase-admin");

var serviceAccount = require("../credentials.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
var database = admin.firestore()
module.exports = {admin, database}