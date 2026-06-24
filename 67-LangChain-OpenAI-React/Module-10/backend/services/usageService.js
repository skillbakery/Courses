let totalCost = 0;

export function logUsage(tokens, cost) {

  totalCost += cost;

  console.log({
    tokens,
    cost,
    totalCost,
  });
}

export function getTotalCost() {
  return totalCost;
}