#!/usr/bin/env node

const path = require("path");
const { pathToFileURL } = require("url");

if (!globalThis.crypto || typeof globalThis.crypto.getRandomValues !== "function") {
  const cryptoModule = require("crypto");
  const { webcrypto } = cryptoModule;
  if (webcrypto) {
    globalThis.crypto = webcrypto;
    if (typeof cryptoModule.getRandomValues !== "function") {
      cryptoModule.getRandomValues = webcrypto.getRandomValues.bind(webcrypto);
    }
    if (typeof cryptoModule.randomUUID !== "function" && typeof webcrypto.randomUUID === "function") {
      cryptoModule.randomUUID = webcrypto.randomUUID.bind(webcrypto);
    }
  }
}

const viteBin = path.resolve(__dirname, "../node_modules/vite/bin/vite.js");
(async () => {
  await import(pathToFileURL(viteBin).href);
})();
