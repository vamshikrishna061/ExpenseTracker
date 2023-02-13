document.getElementById("expForm").addEventListener("submit", addExpense);
// initial array of expenses, reading from localStorage
const expenses = JSON.parse(localStorage.getItem("expenses")) || []; //empty array
function addExpense(e) {
  e.preventDefault();
  // get type, name, date, and amount
  let type = document.getElementById("type").value;
  let name = document.getElementById("name").value;
  let amount = document.getElementById("amount").value;
  if (type != "ChooseOne" && name.length > 0 && amount > 0) {
    const expense = {
      type,
      name,
      amount,
      id: expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1,
    };
    expenses.push(expense);
    // localStorage
    localStorage.setItem("expenses", JSON.stringify(expenses)); //JavaScript Object Notation
  }
  document.getElementById("expForm").reset();
  showExpenses();
}

const showExpenses = () => {
  const expenseTable = document.getElementById("expenseTable");
  expenseTable.innerHTML = "";
  for (let i = 0; i < expenses.length; i++) {
    expenseTable.innerHTML += `
            <tr>
                <td>${expenses[i].type}</td>
                <td>${expenses[i].name}</td>
                <td>₹ ${expenses[i].amount}</td>
                <td><button class="btn btn-info" onclick="editExpense(${expenses[i].id})">Edit</button> <button class="btn btn-danger" onclick="deleteExpense(${expenses[i].id})">
                    Delete</button></td>
            </tr>
        `;
  }
};
const editExpense = (id) => {
  for (let i = 0; i < expenses.length; i++) {
    if (expenses[i].id == id) {
      document.getElementById("type").value = expenses[i].type;
      document.getElementById("name").value = expenses[i].name;
      document.getElementById("amount").value = expenses[i].amount;
      deleteExpense(id);
    }
  }
};
const deleteExpense = (id) => {
  for (let i = 0; i < expenses.length; i++) {
    if (expenses[i].id == id) {
      expenses.splice(i, 1);
    }
  }
  // localStorage
  localStorage.setItem("expenses", JSON.stringify(expenses));
  showExpenses();
};
showExpenses();
