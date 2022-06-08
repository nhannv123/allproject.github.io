var gVoucherCol = ["id", "maVoucher", "phanTramGiamGia", "ghiChu", "ngayTao", "ngayCapNhat","action"]
const gID_COL = 0;
const gphanTramGiamGia_COL = 1;
const gPHAN_TRAM_GIAM_GIA_COL = 2;
const gGHI_CHU_COL = 3;
const gNGAY_TAO_COL = 4;
const gNGAY_CAP_NHAT_COL = 5;
const gACTION_COL = 6;
let voucherTable = $('#voucher-table').DataTable({
    columns: [
        { data: gVoucherCol[gID_COL] },
        { data: gVoucherCol[gphanTramGiamGia_COL] },
        { data: gVoucherCol[gPHAN_TRAM_GIAM_GIA_COL] },
        { data: gVoucherCol[gGHI_CHU_COL] },
        { data: gVoucherCol[gNGAY_TAO_COL] },
        { data: gVoucherCol[gNGAY_CAP_NHAT_COL] },
        { data: gVoucherCol[gACTION_COL] }
    ],
    columnDefs: [
        {
            targets: -1,
            defaultContent: `<i class="fas fa-edit text-primary"></i>
        | <i class="fas fa-trash text-danger"></i>`,
        },
    ],
});

function loadVoucherToTable(paramVoucher) {
    voucherTable.clear().rows.add(paramVoucher).draw();
}

function getVoucherFromDb() {
    $.get(`http://127.0.0.1:8080/pizza365/vouchers`, loadVoucherToTable);
}
getVoucherFromDb();

let gVoucherId = 0;
let voucher = {
    newVoucher: {
        phanTramGiamGia: '',
        maVoucher: '',
        ghiChu: '',
        ngayTao: '',
        ngayCapNhat: '',
    },
    onCreateVoucherClick() {
        gVoucherId = 0;
        this.newVoucher = {
            phanTramGiamGia: $('#inp-phanTramGiamGia').val().trim(),
            maVoucher: $('#inp-maVoucher').val().trim(),
            ghiChu: $('#inp-ghiChu').val().trim(),
        };
        if (validateVoucher(this.newVoucher)) {
            $.ajax({
                url: `http://127.0.0.1:8080/pizza365/voucher`,
                method: 'POST',
                data: JSON.stringify(this.newVoucher),
                contentType: 'application/json',
                success: () => {
                    alert('Voucher created successfully');
                    resetVoucher();
                    getVoucherFromDb();
                },
                error: (err) => alert(err.responseText),
            });


        }
    },
    onUpdateVoucherClick() {
        let vSelectRow = $(this).parents('tr');
        let vSelectedData = voucherTable.row(vSelectRow).data();
        gVoucherId = vSelectedData.id;
        $.get(`http://127.0.0.1:8080/pizza365/voucher/${gVoucherId}`, loadVoucherToInput);
    },
    onSaveVoucherClick() {
        this.newVoucher = {
            phanTramGiamGia: $('#inp-phanTramGiamGia').val().trim(),
            maVoucher: $('#inp-maVoucher').val().trim(),
            ghiChu: $('#inp-ghiChu').val().trim(),
        };
        if (validateVoucher(this.newVoucher)) {
            $.ajax({
                url: `http://127.0.0.1:8080/pizza365/voucher/${gVoucherId}`,
                method: 'PUT',
                data: JSON.stringify(this.newVoucher),
                contentType: 'application/json',
                success: () => {
                    alert('Voucher updated successfully');
                    resetVoucher();
                    getVoucherFromDb();
                },
                error: (err) => alert(err.responseText),
            });
        }
    },
    onDeleteIconClick() {
        $("#text-delete-voucher").text(" Bạn có chác muốn xóa voucher");
        $('#modal-delete-voucher').modal('show');
        let vSelectRow = $(this).parents('tr');
        let vSelectedData = voucherTable.row(vSelectRow).data();
        gVoucherId = vSelectedData.id;
    },
    onDeleteAllVoucherClick() {
        $("#text-delete-voucher").text(" Bạn có chác muốn xóa tất cả voucher");
        $('#modal-delete-voucher').modal('show');
        gVoucherId = 0;
    },
    onConfirmDeleteClick() {
        if (gVoucherId === 0) {
            $.ajax({
                url: `http://127.0.0.1:8080/pizza365/voucher/all`,
                method: 'DELETE',
                success: () => {
                    alert('All voucher were successfully deleted');
                    $('#modal-delete-voucher').modal('hide');
                    getVoucherFromDb();
                },
                error: (err) => alert(err.responseText),
            });
        } else {
            $.ajax({
                url: `http://127.0.0.1:8080/pizza365/voucher/${gVoucherId}`,
                method: 'DELETE',
                success: () => {
                    alert(`Voucher with id: ${gVoucherId} was successfully deleted`);
                    $('#modal-delete-voucher').modal('hide');
                    getVoucherFromDb();
                },
                error: (err) => alert(err.responseText),
            });
        }
    },
};

$('#create-voucher').click(voucher.onCreateVoucherClick);
$('#voucher-table').on('click', '.fa-edit', voucher.onUpdateVoucherClick);
$('#voucher-table').on('click', '.fa-trash', voucher.onDeleteIconClick);
$('#update-voucher').click(voucher.onSaveVoucherClick);
$('#delete-all-voucher').click(voucher.onDeleteAllVoucherClick);
$('#delete-voucher').click(voucher.onConfirmDeleteClick);

function validateVoucher(paramVoucher) {
    let vResult = true;
    try {
        if (paramVoucher.maVoucher == '') {
            vResult = false;
            throw 'Mã voucher không được để trống';
        }
        if (paramVoucher.phanTramGiamGia == '') {
            vResult = false;
            throw 'Phần trăm giảm giá không được để trống';
        }
    } catch (e) {
        alert(e);
    }
    return vResult;
}

function loadVoucherToInput(paramVoucher) {
    $('#inp-phanTramGiamGia').val(paramVoucher.phanTramGiamGia);
    $('#inp-maVoucher').val(paramVoucher.maVoucher);
    $('#inp-ghiChu').val(paramVoucher.ghiChu);
}

function resetVoucher() {
    $('#inp-phanTramGiamGia').val('');
    $('#inp-maVoucher').val('');
    $('#inp-ghiChu').val('');
}
