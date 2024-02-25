/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const cors = require("cors");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

const express = require("express");
const router = require("./src/routes");

const server = express();

server.use(cors());
server.use(express.json());

server.use("/api", router);

exports.app = onRequest(server);
