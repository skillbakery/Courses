let totalCost = 0; // simple in-memory (can use DB later)

export function logUsage({ tokens, cost, requestId }) {
  totalCost += cost;

  console.log("Usage Log:", {
    requestId,
    tokens,
    cost,
    totalCost,
  });
}

export function getTotalCost() {
  return totalCost;
}