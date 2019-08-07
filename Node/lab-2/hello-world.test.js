const assert = require('assert');
const { speak, capitalize } = require('./hello-world');

const testString = "bob";
const multipleWords = "bob smithson";

assert.strictEqual(capitalize(testString), "Bob");
assert.strictEqual(speak(testString), "Hello there! You are Bob!!!")

assert.strictEqual(capitalize(multipleWords), "Bob Smithson");
assert.strictEqual(speak(multipleWords), "Hello there! You are Bob Smithson!!!")