async function sha256(text) {
    const uint8  = new TextEncoder().encode(text)
    const digest = await crypto.subtle.digest('SHA-256', uint8)
    return Array.from(new Uint8Array(digest)).map(v => v.toString(16).padStart(2,'0')).join('')
}

function base64Encode(text) {
    return Buffer.from(text).toString("base64");
}

module.exports = {
    sha256,
    base64Encode
}