// js/wasm-memory.js

// Import the WebAssembly module
import * as wasm from "../pkg/index_bg.wasm";

console.log(wasm.memory.buffer);
// Create a new image object via WebAssembly
const image = wasm.image_new();
const pixelsPointer = wasm.image_pixels_ptr(image);
const pixels = new Uint8Array(wasm.memory.buffer, pixelsPointer, 6);
console.log(pixels);

function numToHex(value) {
  const hex = value.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

function drawPixel(x, y, color) {
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = `#${numToHex(color[0])}${numToHex(color[1])}${numToHex(
    color[2]
  )}`;
  ctx.fillRect(x, y, 100, 100);
}

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
drawPixel(0, 0, pixels.slice(0, 3));
drawPixel(100, 0, pixels.slice(3, 6));
