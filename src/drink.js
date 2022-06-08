var gNameCol = [ "tenNuocUong", "maNuocUong", "donGia","ghiChu", "ngayTao", "ngayCapNhat","action"]
const gTENNUOCUONG_COL = 0;
const gMANUOCUONG_COL = 1;
const gDONGIA_COL = 2;
const gGHICHU_COL = 3;
const gNGAY_TAO_COL = 4;
const gNGAY_CAP_NHAT_COL = 5;
const gACTION_COL = 6;
let drinkTable = $('#drink-table').DataTable({
    columns: [
        { data: gNameCol[gTENNUOCUONG_COL] },
        { data: gNameCol[gMANUOCUONG_COL] },
        { data: gNameCol[gDONGIA_COL] },
        { data: gNameCol[gGHICHU_COL] },
        { data: gNameCol[gNGAY_TAO_COL] },
        { data: gNameCol[gNGAY_CAP_NHAT_COL] },
        { data: gNameCol[gACTION_COL] },
    ],
    columnDefs: [
        {
            targets: -1,
            defaultContent: `<i class="fas fa-edit text-primary"></i>
        | <i class="fas fa-trash text-danger"></i>`,
        },
    ],
});

function loadDrinkToTable(paramDrink) {
    drinkTable.clear().rows.add(paramDrink).draw();
}

function getDrinkFromDb() {
    $.get(`http://127.0.0.1:8080/pizza365/drinks`, loadDrinkToTable);
}
getDrinkFromDb();

let gDrinkId = 0;
let drink = {
    newDrink: {
        tenNuocUong: '',
        maNuocUong: '',
        donGia: '',
        ghiChu: '',
    },
    onCreateDrinkClick() {
        gDrinkId = 0;
        this.newDrink = {
            tenNuocUong: $('#inp-tenNuocUong').val().trim(),
            maNuocUong: $('#inp-maNuocUong').val().trim(),
            donGia: $('#inp-donGia').val().trim(),
            ghiChu: $('#inp-ghiChu').val().trim(),
        };
        if (validateDrink(this.newDrink)) {
            $.ajax({
                url: `http://127.0.0.1:8080/pizza365/drink`,
                method: 'POST',
                data: JSON.stringify(this.newDrink),
                contentType: 'application/json',
                success: () => {
                    alert('Drink created successfully');
                    resetDrink();
                    getDrinkFromDb();
                },
                error: (err) => alert(err.responseText),
            });


        }
    },
    onUpdateDrinkClick() {
        let vSelectRow = $(this).parents('tr');
        let vSelectedData = drinkTable.row(vSelectRow).data();
        gDrinkId = vSelectedData.id;
        $.get(`http://127.0.0.1:8080/pizza365/drink/${gDrinkId}`, loadDrinkToInput);
    },
    onSaveDrinkClick() {
        this.newDrink = {
            tenNuocUong: $('#inp-tenNuocUong').val().trim(),
            maNuocUong: $('#inp-maNuocUong').val().trim(),
            donGia: $('#inp-donGia').val().trim(),
            ghiChu: $('#inp-ghiChu').val().trim(),
        };
        if (validateDrink(this.newDrink)) {
            $.ajax({
                url: `http://127.0.0.1:8080/pizza365/drink/${gDrinkId}`,
                method: 'PUT',
                data: JSON.stringify(this.newDrink),
                contentType: 'application/json',
                success: () => {
                    alert('Drink updated successfully');
                    resetDrink();
                    getDrinkFromDb();
                },
                error: (err) => alert(err.responseText),
            });
        }
    },
    onDeleteIconClick() {
        $("#text-delete-drink").text(" Bạn có chác muốn xóa drink");
        $('#modal-delete-drink').modal('show');
        let vSelectRow = $(this).parents('tr');
        let vSelectedData = drinkTable.row(vSelectRow).data();
        gDrinkId = vSelectedData.id;
    },
    onDeleteAllDrinkClick() {
        $("#text-delete-drink").text(" Bạn có chác muốn xóa tất cả drink");
        $('#modal-delete-drink').modal('show');
        gDrinkId = 0;
    },
    onConfirmDeleteClick() {
        if (gDrinkId === 0) {
            $.ajax({
                url: `http://127.0.0.1:8080/pizza365/drink/all`,
                method: 'DELETE',
                success: () => {
                    alert('All drink were successfully deleted');
                    $('#modal-delete-drink').modal('hide');
                    getDrinkFromDb();
                },
                error: (err) => alert(err.responseText),
            });
        } else {
            $.ajax({
                url: `http://127.0.0.1:8080/pizza365/drink/${gDrinkId}`,
                method: 'DELETE',
                success: () => {
                    alert(`Drink with id: ${gDrinkId} was successfully deleted`);
                    $('#modal-delete-drink').modal('hide');
                    getDrinkFromDb();
                },
                error: (err) => alert(err.responseText),
            });
        }
    },
};

$('#create-drink').click(drink.onCreateDrinkClick);
$('#drink-table').on('click', '.fa-edit', drink.onUpdateDrinkClick);
$('#drink-table').on('click', '.fa-trash', drink.onDeleteIconClick);
$('#update-drink').click(drink.onSaveDrinkClick);
$('#delete-all-drink').click(drink.onDeleteAllDrinkClick);
$('#delete-drink').click(drink.onConfirmDeleteClick);

function validateDrink(paramDrink) {
    let vResult = true;
    try {
        if (paramDrink.tenNuocUong == '') {
            vResult = false;
            throw 'Tên Nước Uống không được để trống';
        }
        if (paramDrink.maNuocUong == '') {
            vResult = false;
            throw 'Mã nước uống không được để trống';
        }
        if (paramDrink.donGia == '') {
            vResult = false;
            throw 'Đơn giá không được để trống';
        }
    } catch (e) {
        alert(e);
    }
    return vResult;
}

function loadDrinkToInput(paramDrink) {
    $('#inp-tenNuocUong').val(paramDrink.tenNuocUong);
    $('#inp-maNuocUong').val(paramDrink.maNuocUong);
    $('#inp-donGia').val(paramDrink.donGia);
    $('#inp-ghiChu').val(paramDrink.ghiChu);
}
function resetDrink() {
    $('#inp-tenNuocUong').val('');
    $('#inp-maNuocUong').val('');
    $('#inp-donGia').val('');
    $('#inp-ghiChu').val('');
}
