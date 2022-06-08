"use strict";
/*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
var gDataPiz = {
    kichCo:"",
    idLoaiNuocUong:"",
    loaiPizza:"",
    priceDiscount: function() {
        var vDiscount = parseInt(this.discount);
        if(this.discount == 0) {
            return gDataPiz.thanhTien;
        }else
            return gDataPiz.thanhTien*(100-vDiscount)/100;
    }
};
/*** REGION 2 - Vùng gán / thực thi sự kiện cho các elements */
onPageLoading();
$(document).on("click","#btn-combo-s",onBtnSClick);
$(document).on("click","#btn-combo-m",onBtnMClick);
$(document).on("click","#btn-combo-l",onBtnLClick);
$("#btn-type1").on("click",onBtnType1Click);
$("#btn-type2").on("click",onBtnType2Click);
$("#btn-type3").on("click",onBtnType3Click);
$("#select-drink").on("change",onSelectDrinkChange);
$("#form-user").on("submit",(e)=> {
    e.preventDefault();
    onBtnSendClick();
});
$("#btn-confirm").on("click",onBtnConfirmClick);
/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */
// Load Page
function onPageLoading() {
    loadDataDrink();
    loadMenuCombo();
}

// Btn Size Pizza
function onBtnSClick() {
    getDataSizePiz(20,3,200,2,150000,"S");
    changeColorBtn(this);
    console.log(gDataPiz);
}
function onBtnMClick() {
    getDataSizePiz(25,4,300,3,200000,"M");
    changeColorBtn(this);
    console.log(gDataPiz);
}
function onBtnLClick() {
    getDataSizePiz(30,8,500,4,250000,"L");
    changeColorBtn(this);
    console.log(gDataPiz);
}

// Btn Type pizza
function onBtnType1Click() {
    getDataTypePiz("Seafood");
    changeColorBtn(this);
    console.log(gDataPiz);
}
function onBtnType2Click() {
    getDataTypePiz("Hawaii");
    changeColorBtn(this);
    console.log(gDataPiz);
}
function onBtnType3Click() {
    getDataTypePiz("Bacon");
    changeColorBtn(this);
    console.log(gDataPiz);
}

// Selected Drink
function onSelectDrinkChange() {
    getDataTypeDrink(this);
    console.log(gDataPiz);
}

// Btn Send
function onBtnSendClick() {
    // Bước 1: thu thập dữ liệu
    getDataUserInp();
    // Bước 2: validate
    var isValidate = checkDataUser();
    
    if(!isValidate) {
        return;
    }
    // Bước 3: xử lý hiện thị
    parseDataToForm();
    $("#orderinf-modal").modal("show");
}

// Btn Confirm
function onBtnConfirmClick() {
    putDataToServer();
    $("#orderinf-modal").modal("hide");
    $("#orderID-modal").modal("show");
}
/*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/
// Change Color Btn
function changeColorBtn (paramBtn) {
    var vBtnArr = $("button");
    for(var vButton of vBtnArr) {
        if(vButton.id.includes("btn-combo") && paramBtn.id.includes("btn-combo")) {
            if(paramBtn.id === vButton.id)
                $(paramBtn).addClass("btn-danger").removeClass("btn-warning");
            else
                $(vButton).addClass("btn-warning").removeClass("btn-danger");
        }
        else  if(vButton.id.includes("btn-type") && paramBtn.id.includes("btn-type")){
            if(paramBtn.id === vButton.id)
                $(paramBtn).addClass("btn-danger").removeClass("btn-warning");
            else
                $(vButton).addClass("btn-warning").removeClass("btn-danger");
        }
    }
}
// Get data to Click/Change Btn
function getDataSizePiz(...paramDataSize) {
    gDataPiz.duongKinh = paramDataSize[0];
    gDataPiz.suon = paramDataSize[1];
    gDataPiz.salad = paramDataSize[2];
    gDataPiz.soLuongNuoc = paramDataSize[3];
    gDataPiz.thanhTien = paramDataSize[4];
    gDataPiz.kichCo = paramDataSize[5];
}
function getDataTypePiz(paramTypePiz) {
    gDataPiz.loaiPizza = paramTypePiz;
}
function getDataTypeDrink(paramSelected) {
    gDataPiz.idLoaiNuocUong = $([paramSelected]).val();
}

// Add Drink to Select
function loadDataDrink() {
    var settings = {
        "url": "http://localhost:8080/drinks",
        "method": "GET",
        "timeout": 0,
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response);
        addDrinkToSelect(response.data);
      });
}
function addDrinkToSelect(paramResData) {
    var vDrinkElement = $("#select-drink");
    for(var bI in paramResData) {
        $("<option>")
            .val(paramResData[bI].maNuocUong)
            .text(paramResData[bI].tenNuocUong)
            .appendTo(vDrinkElement);
    }
}

// Get Data User
function getDataUserInp() {
    gDataPiz.hoTen = $("#inp-name").val().trim();
    gDataPiz.email = $("#inp-email").val().trim();
    gDataPiz.soDienThoai = $("#inp-sdt").val().trim();
    gDataPiz.diaChi = $("#inp-address").val().trim();
    gDataPiz.idVourcher = $("#inp-voucher").val().trim();
    gDataPiz.loiNhan = $("#inp-message").val().trim();
}
function checkDataUser() {
    var vDataArr = Object.entries(gDataPiz);
    if(gDataPiz.kichCo === "") {
        alert("chưa chọn Combo");
        return false;
    }
    if(gDataPiz.loaiPizza === "") {
        alert("chưa chọn Pizza");
        return false;
    }
    if(gDataPiz.idLoaiNuocUong === "") {
        alert("chưa chọn Nước uống");
        return false;
    }
    for(var bData of vDataArr) {
        if((bData[1] === "") && (bData[0] != "loiNhan") && (bData[0] != "idVourcher")) {
            alert("chưa nhập đầy đủ thông tin đơn hàng");
            return false;
        }
    }
    if(!checkEmail(gDataPiz.email)) {
        alert("Email không hợp lệ");
        return false;
    }
    if(!phonenumber(gDataPiz.soDienThoai)) {
        alert("Số điện thoại không hợp lệ");
        return false;
    }
    checkDataVoucher();
    if(gDataPiz.discount == 0) {
        gDataPiz.idVourcher = "";
        alert("Voucher không tồn tại");
    }
    return true;
}
function checkEmail(input) {
	const re =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

	if (re.test(input)) {
		return true;
	} else {
		return false;
	}
}
function phonenumber(inputtxt)
{
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(inputtxt.match(phoneno)){
        return true;
    }else {
        return false;
    }
}
function checkDataVoucher() {
    $.ajax({
        url: "http://localhost:8080/voucher/" + gDataPiz.idVourcher,
        type: "get",
        dataType:"json",
        async: false,
        success: function(response) {
            gDataPiz.discount = response.data.phanTramGiamGia;
        },
        error: function() {
            gDataPiz.discount = 0;           
        }                                                                                   
    });
}

// Parse Data To Form
function parseDataToForm() {
    $("#inp-order-name").val(gDataPiz.hoTen);
    $("#inp-order-sdt").val(gDataPiz.soDienThoai);
    $("#inp-order-address").val(gDataPiz.diaChi);
    $("#inp-order-message").val(gDataPiz.loiNhan);
    $("#inp-order-voucher").val(gDataPiz.idVourcher);
    $("#inp-detail").text(`
    Xác nhận: ${gDataPiz.hoTen}, Sdt: ${gDataPiz.soDienThoai}, Địa chỉ: ${gDataPiz.diaChi}
    Menu ${gDataPiz.kichCo}: sườn nướng ${gDataPiz.suon}, nước ${gDataPiz.soLuongNuoc},...
    Loại pizza: ${gDataPiz.loaiPizza}, Giá: ${gDataPiz.thanhTien}vnd, Mã giã giá: ${gDataPiz.idVourcher}
    Phải thanh toán: ${gDataPiz.priceDiscount()}vnd (giảm giá ${gDataPiz.discount}%)`);
}

// put Data to Server
function putDataToServer() {
    $.ajax({
        url:"http://42.115.221.44:8080/devcamp-pizza365/orders",
        type:"post",
        dataType:"json",
        data: JSON.stringify(gDataPiz),
        contentType:"application/json;charset=UTF-8",
        success: function(response) {
            $("#inp-orderID").val(response.orderId);
        },
        error: function (ajaxError) {
            console.log(ajaxError.responseText);
        }
    });
}

function loadMenuCombo() {
    // basic URL
    var settings = {
        "url": "http://localhost:8080/menu",
        "method": "GET",
        "timeout": 0,
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response);
        createSizePizza(response)
      });
}
// Create Size Pizza
function createSizePizza(paramRes) {
    for(var typePizza of paramRes.data) {
        var fullNameTypePizza = "";
        var lowerCase = "";
        if(typePizza.size == "S") {
            fullNameTypePizza = "Small";
            lowerCase = "s";
        }
        else if(typePizza.size == "M") {
            fullNameTypePizza = "Medium";
            lowerCase = "m";
        }
        else {
            fullNameTypePizza = "Large";
            lowerCase = "l";
        }

        $("#combo")
            .append(`
            <div class="col-lg-4 col-12 col-md-9 p-3 p-lg-2 text-dark">
                    <div class="card text-center">
                        <div class="card-header bg-orange">
                        <h3>${typePizza.size} (${fullNameTypePizza})</h3>
                        </div>
                        <div class="card-body">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Đường kính: <b>${typePizza.duongKinh}cm </b></li>
                                <li class="list-group-item">Sườn nướng: <b>${typePizza.suon}</b></li>
                                <li class="list-group-item">Salad: <b>${typePizza.salad}g</b></li>
                                <li class="list-group-item">Nước ngọt: <b>${typePizza.soLuongNuocNgot}</b></li>
                                <li class="list-group-item"><h1><b>${typePizza.donGia}</b></h1>VNĐ</li>
                            </ul>
                        </div>
                        <div class="card-footer text-muted">
                            <button class="btn btn-warning btn-block font-weight-bold" id="btn-combo-${lowerCase}" >Chọn</button>
                        </div>
                    </div>
                </div>`);
    }
        
}