const dotenv = require("dotenv");
const path = require("path");
const assert = require("assert");

const envPath = path.resolve(__dirname, ".env");
dotenv.config({ path: envPath });

const {
  PORT,
  HOST,
  HOST_URL,
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  DATABASE_PASSWORD
} = process.env;

assert(PORT, "Port is required");
assert(HOST, "Host is required");

module.exports = {
  port: PORT,
  host: HOST,
  hostUrl: HOST_URL,
  mongoDbConfig: {
    dbPassword: DATABASE_PASSWORD
  },
  firebaseConfig: {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
  },
};
