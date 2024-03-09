var button = document.getElementById("button");
var DATE = document.getElementById("dataInput");
var AMOUNT = document.getElementById("amountInput");
var DESCRIPTION = document.getElementById("descriptionInput");
var TYPE = document.getElementById("type");
var table = document.getElementById("table");

var class_name;
var expense_records = [];


if (localStorage.getItem('expense_records')) {
    expense_records = JSON.parse(localStorage.getItem('expense_records'));
    renderTable();
}

var inputs = [DATE, AMOUNT, DESCRIPTION];

function add_expense(date = 'N/A', type = 'N/A', amount = 'N/A', description = 'N/A') {
    var date_object = new Date(DATE.value);

    var formated_date = date_object.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });

    date = formated_date;
    type = TYPE.value;
    amount = AMOUNT.value;
    description = DESCRIPTION.value;

    switch (TYPE.value) {
        case 'Food':

            class_name = 'food';

            break;
        case 'Clothing':
            class_name = 'clothing';
            break;
        case 'Transportation':
            class_name = 'transportation';
            break;

        case 'Debt':
            class_name = "debt";
            break;
        case 'Education':
            class_name = 'education';
            break;
        case 'Miscellaneous':
            class_name = 'miscellaneous';
            break;
    }

    expense_records.push({ date, type, amount, description, class_name });
    updateLocalStorage();

    renderTable();
}

function delete_expense(index) {

    expense_records.splice(index, 1);
    updateLocalStorage();
    renderTable();
}


function renderTable() {

    table.innerHTML = `<tr>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Description</th>
                            <th>Action</th>

                        </tr>`


    expense_records.forEach((expense, index) => {

        var color_code = expense.class_name;

        table.innerHTML += `<tr>

                            <td class=${color_code}>${expense.date}</td>
                            <td class=${color_code}>${expense.type}</td>
                            <td class=${color_code}>${expense.amount}</td>
                            <td class=${color_code}>${expense.description}</td>
                            <td class=${color_code}> <button onclick="delete_expense(${index})" class="btn btn-primary btn-sm" >Delete</button> </td>        
        
                            </tr>`
    })

}


function updateLocalStorage() {

    localStorage.setItem('expense_records', JSON.stringify(expense_records));



}

button.addEventListener('click', add_expense);