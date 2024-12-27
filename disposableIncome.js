const defaultIncome = [
  { name: "Salary", amount: 4000, isRecurring: true },
  { name: "Tutoring", amount: 800, isRecurring: false },
  { name: "Investments", amount: 1200, isRecurring: true },
  { name: "Property Income", amount: 1500, isRecurring: true },
  { name: "Side Business", amount: 500, isRecurring: true },
];
const defaultExpenses = [
  { name: "Rent", amount: 1300, isRecurring: true },
  { name: "Shopping", amount: 150, isRecurring: true },
  { name: "Bills", amount: 200, isRecurring: true },
  { name: "Memberships", amount: 100, isRecurring: false },
  { name: "Travel", amount: 250, isRecurring: false },
];

// Initialise session storage
function initialiseSessionStorage() {
  if (!sessionStorage.getItem("income")) {
    sessionStorage.setItem("income", JSON.stringify(defaultIncome));
  }
  if (!sessionStorage.getItem("expenses")) {
    sessionStorage.setItem("expenses", JSON.stringify(defaultExpenses));
  }
}

// Function to calculate and display disposable income
function displayDisposableIncome() {
  const income = JSON.parse(sessionStorage.getItem("income"));
  const expenses = JSON.parse(sessionStorage.getItem("expenses"));

  const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const disposableIncome = totalIncome - totalExpenses;

  alert(`Your Disposable Income: $${disposableIncome}`);
  return disposableIncome;
}

// Function to add a new income
function addIncome() {
  const income = JSON.parse(sessionStorage.getItem("income"));
  const name = prompt("Enter income source (e.g., Salary):");
  const amount = parseFloat(prompt("Enter income amount:"));
  const isRecurring = confirm(
    "Is this income recurring? Click OK if the answer is yes and Cancel if the answer is no"
  );
  const incomeItem = { name, amount, isRecurring };
  income.push(incomeItem);
  sessionStorage.setItem("income", JSON.stringify(income));
  displayIncome();
}

// Function to display existing incomes
function displayIncome() {
  const income = JSON.parse(sessionStorage.getItem("income"));
  alert(
    "Current Income Items: " +
      income.map((item) => `${item.name}: $${item.amount}`).join(", ")
  );
}

// Function to add a new expense
function addExpense() {
  const expenses = JSON.parse(sessionStorage.getItem("expenses"));
  const name = prompt("Enter expenses category:");
  const amount = parseFloat(prompt("Enter expense amount:"));
  const isRecurring = confirm(
    "Is this expense recurring? Click OK if the answer is yes and Cancel if the answer is no"
  );
  const expenseItem = { name, amount, isRecurring };
  expenses.push(expenseItem);
  sessionStorage.setItem("expenses", JSON.stringify(expenses));
  displayExpenses();
}

// Function to display existing expenses
function displayExpenses() {
  const expenses = JSON.parse(sessionStorage.getItem("expenses"));
  alert(
    "Current Expense Items: " +
      expenses.map((item) => `${item.name}: £${item.amount}`).join(", ")
  );
}

// Initial setup
function start() {
  initialiseSessionStorage(); // Ensure session storage is not overwritten
  displayIncome();
  displayExpenses();

  // Allow users to add new income
  let addMoreIncome = confirm(
    "Do you want to add more income? Click OK if the answer is yes and Cancel if the answer is no"
  );
  while (addMoreIncome) {
    addIncome();
    addMoreIncome = confirm(
      "Do you want to add more income? Click OK if the answer is yes and Cancel if the answer is no"
    );
  }

  // Allow users to add new expenses
  let addMoreExpenses = confirm(
    "Do you want to add more expenses? Click OK if the answer is yes and Cancel if the answer is no"
  );
  while (addMoreExpenses) {
    addExpense();
    addMoreExpenses = confirm(
      "Do you want to add more expenses? Click OK if the answer is yes and Cancel if the answer is no"
    );
  }

  // After adding income/expenses, display updated disposable income
  const disposableIncome = displayDisposableIncome();

  // Then ask how much the user wants to save
  const savings = parseFloat(
    prompt("How much of your disposable income would you like to save?")
  );
  const remainingDisposableIncome = disposableIncome - savings;

  alert(`Total Disposable Income Left: $${remainingDisposableIncome}`);
}

window.onload = start;
