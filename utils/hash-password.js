#!/usr/bin/env node
const crypto = require("crypto");
/**
 * Node terminal script to hash a password
 */

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

readline.question('Password: ', async (password) => {
    const output = await hashPassword(password);
    console.log('Output:', output);
    console.log('Length:', output.length);
    readline.close();
});

async function hashPassword(password) {
    const salt = Array.from(crypto.getRandomValues(new Uint8Array(16)))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
    const encoder = new TextEncoder();
    const hash = await crypto.subtle.digest(
        'SHA-256',
        encoder.encode(salt + password)
    );
    const hashArray = Array.from(new Uint8Array(hash));
    const hashString = hashArray
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
    return ['v1', salt, hashString].join(':');
}
