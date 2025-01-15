import * as wasm from "../pkg/index.js";

// Function to show date parts (year, month, day)
document.getElementById('date-parts').innerText = wasm.get_date_parts();