const dateInput = document.getElementById('date');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeInput = document.getElementById('type');
const addButton = document.getElementById('add-button');
const transactionTableBody = document.getElementById('transaction-table-body');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function addTransaction() {
    const date = dateInput.value;
    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value);
    const type = typeInput.value;

    if (date && description && !isNaN(amount)) {
        transactions.push({ date, description, amount, type });
        renderTransactions();
        clearInputFields();
        saveTransactions();
    }
}

function renderTransactions() {
    transactionTableBody.innerHTML = '';
    transactions.forEach((transaction, index) => { // เพิ่ม index
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transaction.date}</td>
            <td>${transaction.description}</td>
            <td>${transaction.amount}</td>
            <td>${transaction.type}</td>
            <td><button class="delete-button" data-index="${index}">ลบ</button></td> `;
        transactionTableBody.appendChild(row);
    });

    // เพิ่ม event listener สำหรับปุ่มลบ
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', delete Transaction);
    });
}

function deleteTransaction(event) {
    const index = parseInt(event.target.dataset.index);
    transactions.splice(index, 1); // ลบรายการออกจากอาร์เรย์
    renderTransactions(); // อัปเดตตาราง
    saveTransactions(); // อัปเดต Local Storage
}

function clearInputFields() {
    dateInput.value = '';
    descriptionInput.value = '';
    amountInput.value = '';
}

function setCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    dateInput.value = `${year}-${month}-${day}`;
}

addButton.addEventListener('click', addTransaction);

setCurrentDate();
renderTransactions();