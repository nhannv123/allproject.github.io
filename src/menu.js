var gMenuCol = ["size", "duongKinh", "suon", "salad", "soLuongNuocNgot", "donGia","action"]
const gSize_COL = 0;
const gDUONG_KINH_COL = 1;
const gSUON_COL = 2;
const gSALAD_COL = 3;
const gSO_LUONG_NUOC_NGOT_COL = 4;
const gDON_GIA_COL = 5;
const gACTION_COL = 6;
let menuTable = $('#menu-table').DataTable({
    columns: [
        { data: gMenuCol[gSize_COL] },
        { data: gMenuCol[gDUONG_KINH_COL] },
        { data: gMenuCol[gSUON_COL] },
        { data: gMenuCol[gSALAD_COL] },
        { data: gMenuCol[gSO_LUONG_NUOC_NGOT_COL] },
        { data: gMenuCol[gDON_GIA_COL] },
        { data: gMenuCol[gACTION_COL] }
    ],
    columnDefs: [
        {
            targets: -1,
            defaultContent: `<i class="fas fa-edit text-primary"></i>
        | <i class="fas fa-trash text-danger"></i>`,
        },
    ],
});

function loadMenuToTable(paramMenu) {
    menuTable.clear().rows.add(paramMenu).draw();
}

function getMenuFromDb() {
    $.get(`http://127.0.0.1:8080/pizza365/menus`, loadMenuToTable);
}
getMenuFromDb();

let gMenuId = 0;
let menu = {
    newMenu: {
        size: '',
        duongKinh: '',
        suon: '',
        salad: '',
        soLuongNuocNgot: '',
        donGia: '',
    },
    onCreateMenuClick() {
        gMenuId = 0;
        this.newMenu = {
            size: $('#inp-size').val(),
            duongKinh: $('#inp-duongKinh').val().trim(),
            suon: $('#inp-suon').val().trim(),
            salad: $('#inp-salad').val().trim(),
            soLuongNuocNgot: $('#inp-soLuongNuocNgot').val().trim(),
            donGia: $('#inp-donGia').val().trim(),
        };
        if (validateMenu(this.newMenu)) {
            $.ajax({
                url: `http://127.0.0.1:8080/pizza365/menu`,
                method: 'POST',
                data: JSON.stringify(this.newMenu),
                contentType: 'application/json',
                success: () => {
                    alert('Menu created successfully');
                    resetMenu();
                    getMenuFromDb();
                },
                error: (err) => alert(err.responseText),
            });


        }
    },
    onUpdateMenuClick() {
        let vSelectRow = $(this).parents('tr');
        let vSelectedData = menuTable.row(vSelectRow).data();
        gMenuId = vSelectedData.id;
        $.get(`http://127.0.0.1:8080/pizza365/menu/${gMenuId}`, loadMenuToInput);
    },
    onSaveMenuClick() {
        this.newMenu = {
            size: $('#inp-size').val(),
            duongKinh: $('#inp-duongKinh').val().trim(),
            suon: $('#inp-suon').val().trim(),
            salad: $('#inp-salad').val().trim(),
            soLuongNuocNgot: $('#inp-soLuongNuocNgot').val().trim(),
            donGia: $('#inp-donGia').val().trim(),
        };
        if (validateMenu(this.newMenu)) {
            $.ajax({
                url: `http://127.0.0.1:8080/pizza365/menu/${gMenuId}`,
                method: 'PUT',
                data: JSON.stringify(this.newMenu),
                contentType: 'application/json',
                success: () => {
                    alert('Menu updated successfully');
                    resetMenu();
                    getMenuFromDb();
                },
                error: (err) => alert(err.responseText),
            });
        }
    },
    onDeleteIconClick() {
        $("#text-delete-menu").text(" Bạn có chác muốn xóa menu");
        $('#modal-delete-menu').modal('show');
        let vSelectRow = $(this).parents('tr');
        let vSelectedData = menuTable.row(vSelectRow).data();
        gMenuId = vSelectedData.id;
    },
    onDeleteAllMenuClick() {
        $("#text-delete-menu").text(" Bạn có chác muốn xóa tất cả menu");
        $('#modal-delete-menu').modal('show');
        gMenuId = 0;
    },
    onConfirmDeleteClick() {
        if (gMenuId === 0) {
            $.ajax({
                url: `http://127.0.0.1:8080/pizza365/menu/all`,
                method: 'DELETE',
                success: () => {
                    alert('All Menu were successfully deleted');
                    $('#modal-delete-menu').modal('hide');
                    getMenuFromDb();
                },
                error: (err) => alert(err.responseText),
            });
        } else {
            $.ajax({
                url: `http://127.0.0.1:8080/pizza365/menu/${gMenuId}`,
                method: 'DELETE',
                success: () => {
                    alert(`Menu with id: ${gMenuId} was successfully deleted`);
                    $('#modal-delete-menu').modal('hide');
                    getMenuFromDb();
                },
                error: (err) => alert(err.responseText),
            });
        }
    },
};

$('#create-menu').click(menu.onCreateMenuClick);
$('#menu-table').on('click', '.fa-edit', menu.onUpdateMenuClick);
$('#menu-table').on('click', '.fa-trash', menu.onDeleteIconClick);
$('#update-menu').click(menu.onSaveMenuClick);
$('#delete-all-menu').click(menu.onDeleteAllMenuClick);
$('#delete-menu').click(menu.onConfirmDeleteClick);

function validateMenu(paramMenu) {
    let vResult = true;
    try {
        if (paramMenu.size == '') {
            vResult = false;
            throw 'Chưa chọn Size pizza';
        }
        if (paramMenu.duongKinh == '') {
            vResult = false;
            throw 'Đường kính không được để trống';
        }
        if (paramMenu.suon == '') {
            vResult = false;
            throw 'Sườn không được để trống';
        }
        if (paramMenu.salad == '') {
            vResult = false;
            throw 'Salad không được để trống';
        }
        if (paramMenu.soLuongNuocNgot == '') {
            vResult = false;
            throw 'Số Lượng Nước Ngọt không được để trống';
        }
        if (paramMenu.donGia == '') {
            vResult = false;
            throw 'Đơn giá không được để trống';
        }
    } catch (e) {
        alert(e);
    }
    return vResult;
}

function loadMenuToInput(paramMenu) {
    $('#inp-size').val(paramMenu.size);
    $('#inp-duongKinh').val(paramMenu.duongKinh);
    $('#inp-suon').val(paramMenu.suon);
    $('#inp-salad').val(paramMenu.salad);
    $('#inp-soLuongNuocNgot').val(paramMenu.soLuongNuocNgot);
    $('#inp-donGia').val(paramMenu.donGia);
}

function resetMenu() {
    $('#inp-size').val('');
    $('#inp-duongKinh').val('');
    $('#inp-suon').val('');
    $('#inp-salad').val('');
    $('#inp-soLuongNuocNgot').val('');
    $('#inp-donGia').val('');
}
