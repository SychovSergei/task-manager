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
  DATABASE_SOURCE,
  JWT_SECRET_ACCESS,
  JWT_SECRET_REFRESH,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASSWORD,
  API_URL,
  CLIENT_URL,
} = process.env;

assert(PORT, "Port is required");
assert(HOST, "Host is required");

module.exports = {
  port: PORT,
  host: HOST,
  hostUrl: HOST_URL,
  mongoDbConfig: {
    dbSource: DATABASE_SOURCE,
  },
  jwt: {
    accessKey: JWT_SECRET_ACCESS,
    refreshKey: JWT_SECRET_REFRESH,
  },
  apiUrl: API_URL,
  clientUrl: CLIENT_URL,
  smtp: {
    host: SMTP_HOST,
    port: SMTP_PORT,
    user: SMTP_USER,
    password: SMTP_PASSWORD,
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
