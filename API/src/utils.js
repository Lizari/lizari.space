const crypto = require("crypto");

function sha256(text) {
    return crypto.createHash("sha256").update(text, "utf-8").digest("hex");
}

function base64Encode(text) {
    return Buffer.from(text).toString("base64");
}

module.exports = {
    sha256,
    base64Encode
}