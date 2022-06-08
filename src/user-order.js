"use strict";
/*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
var gUserCol = [ "fullname", "email", "phone", "address", "created", "update", "orderlist"]
const gFULLNAME_COL = 0;
const gEMAIL_COL = 1;
const gSDT_COL = 2;
const gDIACHI_COL = 3;
const gNGAY_TAO_1COL = 4;
const gNGAY_CAP_NHAT_1COL = 5;
const gORDER_COL = 6;
var gUserTable = $("#table-user").DataTable({
    columns: [
        { data: gUserCol[gFULLNAME_COL] },
        { data: gUserCol[gEMAIL_COL] },
        { data: gUserCol[gSDT_COL] },
        { data: gUserCol[gDIACHI_COL] },
        { data: gUserCol[gNGAY_TAO_1COL] },
        { data: gUserCol[gNGAY_CAP_NHAT_1COL] },
        { data: gUserCol[gORDER_COL] }
    ],
    columnDefs: [
        {
            targets: gORDER_COL,
            defaultContent: `
            <i class="fas fa-list-ul btn-order text-success"></i>
            | <i class="fas fa-edit btn-detail text-primary"></i>
            `,
        }
    ]
});

var gOrderCol = [ "orderCode", "pizzaSize", "pizzaType", "price", "voucherCode", "paid", "created", "updated"]
const gORDERCODE_COL = 0;
const gPIZZASIZE_COL = 1;
const gPIZZATYPE_COL = 2;
const gPRICE_COL = 3;
const gVOUCHERCODE_COL = 4;
const gPAID_COL = 5;
const gNGAY_TAO_COL = 6;
const gNGAY_CAP_NHAT_COL = 7;
var gOrderTable = $("#table-order").DataTable({
    columns: [
        { data: gOrderCol[gORDERCODE_COL] },
        { data: gOrderCol[gPIZZASIZE_COL] },
        { data: gOrderCol[gPIZZATYPE_COL] },
        { data: gOrderCol[gPRICE_COL] },
        { data: gOrderCol[gVOUCHERCODE_COL] },
        { data: gOrderCol[gPAID_COL] },
        { data: gOrderCol[gNGAY_TAO_COL] },
        { data: gOrderCol[gNGAY_CAP_NHAT_COL] }
    ],
    columnDefs: [
        {

        }
    ]
});

var gDataTable = {};
var gDataTableUserOrder = {};
var gDataTableOrder = {};
/*** REGION 2 - Vùng gán / thực thi sự kiện cho các elements */
onPageLoading();
$("#table-user").on("click", ".btn-order", onBtnOrderClick);
$("#table-user").on("click", ".btn-detail", onClickTable);
$("#btn-add").on("click", onBtnAddClick);
$("#btn-modal-add").on("click", onBtnModalAddClick);
// $("#table-user tbody").on("click","tr", onClickTable);
$("#btn-modal-update").on("click", onBtnModalClick);
$("#btn-modal-delete").on("click", onBtnDeleteClick);

$("#btn-add-order").on("click", onBtnAddOrderClick);
$("#btn-modal-add-order").on("click", onBtnModalAddOrderClick);
$("#table-order").on("click", "tr", onClickTableOrder);
$("#btn-modal-update-order").on("click", onBtnUpdateOrderClick);
$("#btn-modal-delete-order").on("click", onBtnDeleteOrderClick);
/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */
function onPageLoading() {
    getApiLoadUsers();
}

function onBtnAddClick() {
    $("#modal-user").modal("show");
    clearDataFromTable();
}

function onBtnModalAddClick() {
    getApiAddUser();
    $("#modal-user").modal("hide");
}

function onClickTable() {
    var vRowCurrent = $(this).closest("tr");
    gDataTable = gUserTable.row(vRowCurrent).data();
    $("#modal-user").modal("show");
    putDataToTable();
}
function onBtnModalClick() {
    getApiUpdateUser();
    $("#modal-user").modal("hide");

}

function onBtnDeleteClick() {
    getApiDeleteUser();

}

function onBtnOrderClick() {
    getDataOrderRow(this);
}
function onBtnAddOrderClick() {
    $("#modal-order").modal("show");
    clearDataFromTableOrder();
}

function onBtnModalAddOrderClick() {
    getApiAddOrder();
    $("#modal-order").modal("hide");
}

function onClickTableOrder() {
    var table = $("#table-order").DataTable();
    gDataTableOrder = table.row(this).data();
    $("#modal-order").modal("show");
    putDataToTableOrder();
}
function onBtnUpdateOrderClick() {
    getApiUpdateOrder();
    $("#modal-order").modal("hide");

}

function onBtnDeleteOrderClick() {
    getApiDeleteOrder();
    $("#modal-order").modal("hide");

}
/*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/
function loadDataToTable(paramDataObj) {
    gUserTable.clear();
    gUserTable.rows.add(paramDataObj);
    gUserTable.draw();
}

function putDataToTable() {
    $("#inp-fullname").val(gDataTable.fullname);
    $("#inp-email").val(gDataTable.email);
    $("#inp-sdt").val(gDataTable.phone);
    $("#inp-diachi").val(gDataTable.address);
}

function getDataFromModal() {
    gDataTable.fullname = $("#inp-fullname").val().trim();
    gDataTable.email = $("#inp-email").val().trim();
    gDataTable.phone = $("#inp-sdt").val().trim();
    gDataTable.address = $("#inp-diachi").val().trim();
}
function clearDataFromTable() {
    $("#inp-fullname").val("");
    $("#inp-email").val("");
    $("#inp-sdt").val("");
    $("#inp-diachi").val("");
}

function loadDataToTableOrder(paramDataObj) {
    gOrderTable.clear();
    gOrderTable.rows.add(paramDataObj);
    gOrderTable.draw();
}

function putDataToTableOrder() {
    $("#inp-orderCode").val(gDataTableOrder.orderCode);
    $("#inp-pizzaSize").val(gDataTableOrder.pizzaSize);
    $("#inp-pizzaType").val(gDataTableOrder.pizzaType);
    $("#inp-price").val(gDataTableOrder.price);
    $("#inp-voucherCode").val(gDataTableOrder.voucherCode);
    $("#inp-paid").val(gDataTableOrder.paid);
}

function getDataFromModalOrder() {
    gDataTableOrder.orderCode = $("#inp-orderCode").val().trim();
    gDataTableOrder.pizzaSize = $("#inp-pizzaSize").val().trim();
    gDataTableOrder.pizzaType = $("#inp-pizzaType").val().trim();
    gDataTableOrder.price = $("#inp-price").val().trim();
    gDataTableOrder.voucherCode = $("#inp-voucherCode").val().trim();
    gDataTableOrder.paid = $("#inp-paid").val().trim();
}
function clearDataFromTableOrder() {
    $("#inp-orderCode").val("");
    $("#inp-pizzaSize").val("");
    $("#inp-pizzaType").val("");
    $("#inp-price").val("");
    $("#inp-voucherCode").val("");
    $("#inp-paid").val("");
}
function getDataOrderRow(paramBtn) {
    var vRowCurrent = $(paramBtn).closest("tr");
    gDataTableUserOrder = gUserTable.row(vRowCurrent).data();
    getApiLoadOrders();
}
// ----------API------------
function getApiLoadUsers() {
    var settings = {
        "url": "http://127.0.0.1:8080/pizza365/users",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        }
    };

    $.ajax(settings).done(function (response) {
        loadDataToTable(response);
    });
}
function getApiAddUser() {
    getDataFromModal();
    var settings = {
        "url": "http://127.0.0.1:8080/pizza365/user",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify(gDataTable),
    };

    $.ajax(settings).done(function (response) {
        getApiLoadUsers();
    });
}

function getApiUpdateUser() {
    getDataFromModal();
    var settings = {
        "url": "http://127.0.0.1:8080/pizza365/user/" + gDataTable.id,
        "method": "PUT",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify(gDataTable),
    };

    $.ajax(settings).done(function (response) {
        getApiLoadUsers();
    });
}

function getApiDeleteUser() {
    var settings = {
        "url": "http://127.0.0.1:8080/pizza365/user/" + gDataTable.id,
        "method": "DELETE",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        getApiLoadUsers();
    });
}

function getApiLoadOrders() {
    var settings = {
        "url": "http://127.0.0.1:8080/pizza365/order/search/userId=" + gDataTableUserOrder.id,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        }
    };

    $.ajax(settings).done(function (response) {
        loadDataToTableOrder(response);
    });
}
function getApiAddOrder() {
    getDataFromModalOrder();
    var settings = {
        "url": "http://127.0.0.1:8080/pizza365/order/create/" + gDataTableUserOrder.id,
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify(gDataTableOrder),
    };

    $.ajax(settings).done(function (response) {
        getApiLoadOrders();
    });
}

function getApiUpdateOrder() {
    getDataFromModalOrder();
    var settings = {
        "url": "http://127.0.0.1:8080/pizza365/order/update/" + gDataTableOrder.id,
        "method": "PUT",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify(gDataTableOrder),
    };

    $.ajax(settings).done(function (response) {
        getApiLoadOrders();
    });
}

function getApiDeleteOrder() {
    var settings = {
        "url": "http://127.0.0.1:8080/pizza365/order/delete/" + gDataTableOrder.id,
        "method": "DELETE",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        getApiLoadOrders();
    });
}