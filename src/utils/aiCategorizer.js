export function predictCategory(title = "") {
  if (!title || typeof title !== "string") return "Other";

  const text = title.trim().toLowerCase();

  // Weighted keyword database (more accurate)
  const patterns = {
    Food: [
      "food", "pizza", "restaurant", "dinner", "lunch", "breakfast",
      "swiggy", "zomato", "dominos", "burger", "cafe", "meal", "snacks"
    ],
    Travel: [
      "uber", "ola", "cab", "taxi", "train", "flight", "bus", "metro",
      "petrol", "fuel", "diesel", "auto", "toll", "parking"
    ],
    Shopping: [
      "amazon", "flipkart", "myntra", "ajio", "shopping",
      "shoes", "clothes", "order", "lifestyle", "pantaloons"
    ],
    Bills: [
      "electricity", "bill", "recharge", "internet", "wifi",
      "rent", "gas", "water", "mobile", "dth", "postpaid", "broadband"
    ],
    Salary: [
      "salary", "stipend", "income", "payroll", "payout",
      "credited", "salary credited"
    ],
    Investment: [
      "stock", "mutual", "investment", "groww",
      "zerodha", "crypto", "binance", "trading", "sip"
    ],
    Entertainment: [
      "movie", "bookmyshow", "netflix", "spotify",
      "hotstar", "youtube premium", "bms"
    ],
    EMI: [
      "loan", "emi", "repayment", "hdfc emi", "axis emi"
    ],
    Other: [],
  };

  let bestCategory = "Other";
  let bestScore = 0;

  // Score by keyword match count (AI-like)
  for (const category in patterns) {
    let score = 0;
    for (const keyword of patterns[category]) {
      if (text.includes(keyword)) score += 2;  // weighted
      if (text.startsWith(keyword)) score += 1; // prefix bonus
    }

    if (score > bestScore) {
      bestScore = score;
      bestCategory = category;
    }
  }

  // If strong signals missing, fallback logic
  if (bestScore === 0) {
    if (text.includes("pay") || text.includes("transfer")) return "Other";
    if (text.includes("fee")) return "Bills";
  }

  return bestCategory;
}
