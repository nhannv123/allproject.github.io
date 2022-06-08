let orderTable = $('#order-table').DataTable({
    columns: [
        { data: 'id' },
        { data: 'ordeDate' },
        { data: 'requiredDate' },
        { data: 'shippedDate' },
        { data: 'status' },
        { data: 'comments' },
        { data: 'action' },
    ],
    columnDefs: [
        {
            targets: -1,
            defaultContent: `<i class="fas fa-edit text-primary" data-placement="top" title="Edit customer"></i>
            | <i class="fas fa-trash text-danger" data-placement="top" title="Delete customer"></i>`,
        },
    ],
});

function loadOrderToTable(paramOrder) {
    orderTable.clear();
    orderTable.rows.add(paramOrder);
    orderTable.draw();
}

function getOrderFromDb() {
    $.get(`http://127.0.0.1:8080/shoppizza365/customer/${gCustomerId}/order`, loadOrderToTable);
}
let gCustomerId = 0;
onPageLoading();
let gOrderId = 0;
let order = {
    newOrder: {
        comments: '',
        status: '',
        requiredDate: '',
        shippedDate:''
    },
    onCreateOrderClick() {
        gCustomerId = $('#select-customer').val();
        this.newOrder = {
            comments: $('#inp-comment').val().trim(),
            status: $('#select-status').val(),
            requiredDate: $('#inp-requiedDate').val(),
            shippedDate: $('#inp-shippedDate').val(),
        };
        if (validateOrder(this.newOrder)) {
            $.ajax({
                url: `http://127.0.0.1:8080/shoppizza365/customer/${gCustomerId}/order/create`,
                method: 'POST',
                data: JSON.stringify(this.newOrder),
                contentType: 'application/json',
                success: (responsse) => {
                    alert('Order created successfully');
                    console.log(responsse);
                    resetOrder();
                    getOrderFromDb();
                },
                error: (err) => alert(err.responseText),
            });
        }
    },
    onUpdateOrderClick() {
        let vSelectRow = $(this).parents('tr');
        let vSelectedData = orderTable.row(vSelectRow).data();
        gOrderId = vSelectedData.id;
        $.get(`http://127.0.0.1:8080/shoppizza365/order/${gOrderId}`, loadOrderToInput);
    },
    onSaveOrderClick() {
        this.newOrder = {
            comments: $('#inp-comment').val().trim(),
            status: $('#select-status').val(),
            requiredDate: $('#inp-requiedDate').val(),
            shippedDate: $('#inp-shippedDate').val(),
        };
        if (validateOrder(this.newOrder)) {
            $.ajax({
                url: `http://127.0.0.1:8080/shoppizza365/order/update/${gOrderId}`,
                method: 'PUT',
                data: JSON.stringify(this.newOrder),
                contentType: 'application/json',
                success: () => {
                    alert('Order updated successfully');
                    resetOrder();
                    getOrderFromDb();
                },
                error: (err) => alert(err.responseText),
            });
        }
    },
    onDeleteIconClick() {
        $('#modal-delete-order').modal('show');
        let vSelectRow = $(this).parents('tr');
        let vSelectedData = orderTable.row(vSelectRow).data();
        gOrderId = vSelectedData.id;
    },
    onDeleteAllOrderClick() {
        $('#modal-delete-order').modal('show');
        gOrderId = 0;
    },
    onConfirmDeleteClick() {
        if (gOrderId === 0) {
            $.ajax({
                url: `http://127.0.0.1:8080/shoppizza365/order/delete/all`,
                method: 'DELETE',
                success: () => {
                    alert('All order were successfully deleted');
                    $('#modal-delete-order').modal('hide');
                    getOrderFromDb();
                },
                error: (err) => alert(err.responseText),
            });
        } else {
            $.ajax({
                url: `http://127.0.0.1:8080/shoppizza365/order/delete/${gOrderId}`,
                method: 'DELETE',
                success: () => {
                    alert(`order with id: ${gOrderId} was successfully deleted`);
                    $('#modal-delete-order').modal('hide');
                    getOrderFromDb();
                },
                error: (err) => alert(err.responseText),
            });
        }
    },

};
$("#select-customer").on("change", reloadTable);
$('#create-order').click(order.onCreateOrderClick);
$('#order-table').on('click', '.fa-edit', order.onUpdateOrderClick);
$('#order-table').on('click', '.fa-trash', order.onDeleteIconClick);
$('#update-order').click(order.onSaveOrderClick);
$('#delete-all-order').click(order.onDeleteAllOrderClick);
$('#delete-order').click(order.onConfirmDeleteClick);

function onPageLoading() {
    loadSelectCustomerToDB();
    var vUrlString = window.location.href; //đường đẫn gọi đến trang
    console.log(window.location.href);
   // tạo đối tượng url để truy vấn tham số
    var vUrl = new URL(vUrlString);
    // get parameters/truy vấn 
    gCustomerId = vUrl.searchParams.get("id");
    console.log(gCustomerId);
    if(gCustomerId != 0) {
        getOrderFromDb();
    }
}
function reloadTable() {
    gCustomerId = $('#select-customer').val();
    getOrderFromDb();
}
function loadSelectCustomerToDB() {
    var settings = {
        "url": "http://127.0.0.1:8080/shoppizza365/customer/all",
        "method": "GET",
        "timeout": 0,
      };
      
      $.ajax(settings).done(function (response) {
          console.log(response);
        var selectCustomerEle = $("#select-customer");
        for(customer of response) {
            $("<option>")
            .val(customer.id)
            .text(customer.firstName + " " + customer.lastName)
            .appendTo(selectCustomerEle);
        }
      });
}
function validateOrder(paramOrder) {
    let vResult = true;
    try {
        if (paramOrder.status == 0) {
            vResult = false;
            throw 'status chưa được chọn';
        }
       
    } catch (e) {
        alert(e);
    }
    return vResult;
}

function loadOrderToInput(paramOrder) {
    $("#select-status").val(paramOrder.status);
    $("#inp-comment").val(paramOrder.comments);
    $("#inp-requiedDate").val(paramOrder.requiredDate);
    $("#inp-shippedDate").val(paramOrder.shippedDate);

}

function resetOrder() {
   $("#select-status").val(0);
   $("#inp-comment").val('');
   $("#inp-requiedDate").val('');
   $("#inp-shippedDate").val('');
}
