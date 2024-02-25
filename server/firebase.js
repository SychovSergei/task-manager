const { initializeApp } = require("firebase-admin");
const config = require("./config");

console.log(config);

const firebase = initializeApp(config);

module.exports = firebase;
