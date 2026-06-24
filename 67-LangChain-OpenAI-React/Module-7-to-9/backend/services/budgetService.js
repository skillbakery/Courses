const MONTHLY_BUDGET = 5; // $5 for demo

export function checkBudget(totalCost) {
  if (totalCost > MONTHLY_BUDGET) {
    console.warn("🚨 Budget exceeded!");
    return true;
  }
  return false;
}