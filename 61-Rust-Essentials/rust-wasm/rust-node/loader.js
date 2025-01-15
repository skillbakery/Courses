import { register } from 'node:module';
import { pathToFileURL } from 'node:url';
// Register the @wasm-tool/node loader
register('@wasm-tool/node', pathToFileURL('./'));
// Import the main file (index.js) explicitly to trigger its execution
import('./index.js').catch(console.error);