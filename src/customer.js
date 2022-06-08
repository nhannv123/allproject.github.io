let customerTable = $('#customer-table').DataTable({
    "responsive": true, "lengthChange": false, "autoWidth": false,
    "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"],
    columns: [
        { data: 'firstName' },
        { data: 'lastName' },
        { data: 'phoneNumber' },
        { data: 'address' },
        { data: 'city' },
        { data: 'state' },
        { data: 'country' },
        { data: 'postalCode' },
        { data: 'salesRepEmplyeeNumber' },
        { data: 'creditLimit' },
        { data: 'action' },
    ],
    columnDefs: [
        {
            targets: -1,
            defaultContent: `<i class="fas fa-edit text-primary" data-placement="top" title="Edit customer"></i>
            | <i class="fas fa-list-ul list-order text-success" data-placement="top" title="List order"></i>
            | <i class="fas fa-list-ul list-payment text-success" data-placement="top" title="List payment"></i>
            | <i class="fas fa-trash text-danger" data-placement="top" title="Delete customer"></i>`,
        },
    ],
});

function loadCustomerToTable(paramCustomer) {
    customerTable.clear();
    customerTable.rows.add(paramCustomer);
    customerTable.draw();
    customerTable.buttons().container().appendTo('#customer-table_wrapper .col-md-6:eq(0)');
}

function getCustomerFromDb() {
    $.get(`http://127.0.0.1:8080/shoppizza365/customer/all`, loadCustomerToTable);
    // $.get(`http://localhost:8080/customer/page`, loadCustomerToTable);
}
getCustomerFromDb();

let gCustomerId = 0;
let customer = {
    newCustomer: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
        salesRepEmplyeeNumber: '',
        creditLimit: ''
    },
    onCreateCustomerClick() {
        gCustomerId = 0;
        this.newCustomer = {
            firstName: $('#inp-firstName').val().trim(),
            lastName: $('#inp-lastName').val().trim(),
            phoneNumber: $('#inp-phoneNumber').val().trim(),
            address: $('#inp-address').val().trim(),
            city: $('#inp-city').val().trim(),
            state: $('#inp-state').val().trim(),
            country: $('#inp-country').val().trim(),
            postalCode: $('#inp-postalCode').val().trim(),
            salesRepEmplyeeNumber: $('#inp-salesRepEmplyeeNumber').val().trim(),
            creditLimit: $('#inp-creditLimit').val().trim(),
        };
        if (validateCustomer(this.newCustomer)) {
            $.ajax({
                url: `http://127.0.0.1:8080/shoppizza365/customer/create`,
                method: 'POST',
                data: JSON.stringify(this.newCustomer),
                contentType: 'application/json',
                success: () => {
                    alert('Customer created successfully');
                    resetCustomer();
                    getCustomerFromDb();
                },
                error: (err) => alert(err.responseText),
            });
        }
    },
    onUpdateCustomerClick() {
        let vSelectRow = $(this).parents('tr');
        let vSelectedData = customerTable.row(vSelectRow).data();
        gCustomerId = vSelectedData.id;
        $.get(`http://127.0.0.1:8080/shoppizza365/customer/${gCustomerId}`, loadCustomerToInput);
    },
    onSaveCustomerClick() {
        this.newCustomer = {
            firstName: $('#inp-firstName').val().trim(),
            lastName: $('#inp-lastName').val().trim(),
            phoneNumber: $('#inp-phoneNumber').val().trim(),
            address: $('#inp-address').val().trim(),
            city: $('#inp-city').val().trim(),
            state: $('#inp-state').val().trim(),
            country: $('#inp-country').val().trim(),
            postalCode: $('#inp-postalCode').val().trim(),
            salesRepEmplyeeNumber: $('#inp-salesRepEmplyeeNumber').val().trim(),
            creditLimit: $('#inp-creditLimit').val().trim(),
        };
        if (validateCustomer(this.newCustomer)) {
            $.ajax({
                url: `http://127.0.0.1:8080/shoppizza365/customer/update/${gCustomerId}`,
                method: 'PUT',
                data: JSON.stringify(this.newCustomer),
                contentType: 'application/json',
                success: () => {
                    alert('Customer updated successfully');
                    resetCustomer();
                    getCustomerFromDb();
                },
                error: (err) => alert(err.responseText),
            });
        }
    },
    onDeleteIconClick() {
        $('#modal-delete-customer').modal('show');
        let vSelectRow = $(this).parents('tr');
        let vSelectedData = customerTable.row(vSelectRow).data();
        gCustomerId = vSelectedData.id;
    },
    onDeleteAllCustomerClick() {
        $('#modal-delete-customer').modal('show');
        gCustomerId = 0;
    },
    onConfirmDeleteClick() {
        if (gCustomerId === 0) {
            $.ajax({
                url: `http://127.0.0.1:8080/shoppizza365/customer/delete/all`,
                method: 'DELETE',
                success: () => {
                    alert('All customer were successfully deleted');
                    $('#modal-delete-customer').modal('hide');
                    getCustomerFromDb();
                },
                error: (err) => alert(err.responseText),
            });
        } else {
            $.ajax({
                url: `http://127.0.0.1:8080/shoppizza365/customer/delete/${gCustomerId}`,
                method: 'DELETE',
                success: () => {
                    alert(`customer with id: ${gCustomerId} was successfully deleted`);
                    $('#modal-delete-customer').modal('hide');
                    getCustomerFromDb();
                },
                error: (err) => alert(err.responseText),
            });
        }
    },
    onOrderIconClick() {
        let vSelectRow = $(this).parents('tr');
        let vSelectedData = customerTable.row(vSelectRow).data();
        gCustomerId = vSelectedData.id;
        const vUPDATE_FORM_URL = "order.html";
        var vUrlSiteToOpen = vUPDATE_FORM_URL +
            "?id=" + gCustomerId;
        window.location.href = vUrlSiteToOpen;
    },
    onPaymentIconClick() {
        let vSelectRow = $(this).parents('tr');
        let vSelectedData = customerTable.row(vSelectRow).data();
        gCustomerId = vSelectedData.id;
        const vUPDATE_FORM_URL = "payment.html";
        var vUrlSiteToOpen = vUPDATE_FORM_URL +
            "?id=" + gCustomerId;
        window.location.href = vUrlSiteToOpen;
    },

};
$('#create-customer').click(customer.onCreateCustomerClick);
$('#customer-table').on('click', '.fa-edit', customer.onUpdateCustomerClick);
$('#customer-table').on('click', '.fa-trash', customer.onDeleteIconClick);
$('#customer-table').on('click', '.list-order', customer.onOrderIconClick);
$('#customer-table').on('click', '.list-payment', customer.onPaymentIconClick);
$('#update-customer').click(customer.onSaveCustomerClick);
$('#delete-all-customer').click(customer.onDeleteAllCustomerClick);
$('#delete-customer').click(customer.onConfirmDeleteClick);

function validateCustomer(paramCustomer) {
    let vResult = true;
    try {
        if (paramCustomer.firstName == '') {
            vResult = false;
            throw 'firstName không được để trống';
        }
        if (paramCustomer.lastName == '') {
            vResult = false;
            throw 'lastName không được để trống';
        }
        if (paramCustomer.phoneNumber == '') {
            vResult = false;
            throw 'phoneNumber không được để trống';
        }
    } catch (e) {
        alert(e);
    }
    return vResult;
}

function loadCustomerToInput(paramCustomer) {
    $('#inp-firstName').val(paramCustomer.firstName);
    $('#inp-lastName').val(paramCustomer.lastName);
    $('#inp-phoneNumber').val(paramCustomer.phoneNumber);
    $('#inp-address').val(paramCustomer.address);
    $('#inp-city').val(paramCustomer.city);
    $('#inp-state').val(paramCustomer.state);
    $('#inp-country').val(paramCustomer.country);
    $('#inp-postalCode').val(paramCustomer.postalCode);
    $('#inp-salesRepEmplyeeNumber').val(paramCustomer.salesRepEmplyeeNumber);
    $('#inp-creditLimit').val(paramCustomer.creditLimit);
}

function resetCustomer() {
    $('#inp-firstName').val('');
    $('#inp-lastName').val('');
    $('#inp-phoneNumber').val('');
    $('#inp-address').val('');
    $('#inp-city').val('');
    $('#inp-state').val('');
    $('#inp-country').val('');
    $('#inp-postalCode').val('');
    $('#inp-salesRepEmplyeeNumber').val('');
    $('#inp-creditLimit').val('');
}
