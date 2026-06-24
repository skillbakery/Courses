export function calculate({ expression }) {
  try {
    const result = eval(expression); // ⚠️ safe later
    return `Result is ${result}`;
  } catch {
    return "Invalid calculation";
  }
}