console.log("Running WebAssembly in Node.js with @wasm-tool/node");

import fs from 'fs';
import path from 'path';

// Resolve the path to the .wasm file
const wasmFilePath = path.resolve('./crate/target/wasm32-unknown-unknown/release/utils.wasm');

fs.readFile(wasmFilePath, (err,data)=> {
    if(err){
        console.log("Error reading WASM file:", err);
        return;
    }

    WebAssembly.instantiate(data).then(wasmModule=>{
        const {instance} = wasmModule;

        const result = instance.exports.add(10,20);
        console.log("10 + 20=",result);
    })
    .catch(err=> {
        console.log("Error instantiating WASM module:", err);
    })
})