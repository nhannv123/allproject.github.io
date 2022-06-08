let chapterTable = $('#chapter-table').DataTable({
  columns: [
    { data: 'chapterName' },
    { data: 'chapterInfo' },
    { data: 'translator' },
    { data: 'page' },
    { data: 'action' },
  ],
  columnDefs: [
    {
      targets: -1,
      defaultContent: `<i class="fas fa-edit text-primary"></i>
      | <i class="fas fa-trash text-danger"></i>`,
    },
  ],
});

function loadChapterToTable(paramChapter) {
  chapterTable.clear();
  chapterTable.rows.add(paramChapter);
  chapterTable.draw();
}

function getChapterFromDb() {
  $.get(`http://127.0.0.1:8080/book/chapter/all`, loadChapterToTable);
}
getChapterFromDb();

let gChapterId = 0;
let chapter = {
  newChapter: {
    chapterName: '',
    chapterInfo: '',
    translator: '',
    page: '',
  },
  onCreateChapterClick() {
    gChapterId = 0;
    this.newChapter = {
      chapterName: $('#inp-chapterName').val().trim(),
      chapterInfo: $('#inp-chapterInfo').val().trim(),
      translator: $('#inp-translator').val().trim(),
      page: $('#inp-page').val().trim(),
    };
    if (validateChapter(this.newChapter)) {
      $.ajax({
        url: `http://127.0.0.1:8080/book/chapter/create`,
        method: 'POST',
        data: JSON.stringify(this.newChapter),
        contentType: 'application/json',
        success: () => {
          alert('chapter created successfully');
          resetChapter();
          getChapterFromDb();
        },
        error: (err) => alert(err.responseText),
      });
    }
  },
  onUpdateChapterClick() {
    let vSelectRow = $(this).parents('tr');
    let vSelectedData = chapterTable.row(vSelectRow).data();
    gChapterId = vSelectedData.id;
    $.get(`http://127.0.0.1:8080/book/chapter/${gChapterId}`, loadChapterToInput);
  },
  onSaveChapterClick() {
    this.newChapter = {
      chapterName: $('#inp-chapterName').val().trim(),
      chapterInfo: $('#inp-chapterInfo').val().trim(),
      translator: $('#inp-translator').val().trim(),
      page: $('#inp-page').val().trim(),
    };
    if (validateChapter(this.newChapter)) {
      $.ajax({
        url: `http://127.0.0.1:8080/book/chapter/update/${gChapterId}`,
        method: 'PUT',
        data: JSON.stringify(this.newChapter),
        contentType: 'application/json',
        success: () => {
          alert('chapter updated successfully');
          resetChapter();
          getChapterFromDb();
        },
        error: (err) => alert(err.responseText),
      });
    }
  },  
  onDeleteIconClick() {
    $('#modal-delete-chapter').modal('show');
    let vSelectRow = $(this).parents('tr');
    let vSelectedData = chapterTable.row(vSelectRow).data();
    gChapterId = vSelectedData.id;
  },
  onDeleteAllChapterClick() {
    $('#modal-delete-chapter').modal('show');
    gChapterId = 0;
  },
  onConfirmDeleteClick() {
    if (gChapterId === 0) {
      $.ajax({
        url: `http://127.0.0.1:8080/book/chapter/delete/all`,
        method: 'DELETE',
        success: () => {
          alert('All chapter were successfully deleted');
          $('#modal-delete-chapter').modal('hide');
          getChapterFromDb();
        },
        error: (err) => alert(err.responseText),
      });
    } else {
      $.ajax({
        url: `http://127.0.0.1:8080/book/chapter/delete/${gChapterId}`,
        method: 'DELETE',
        success: () => {
          alert(`Chapter with id: ${gChapterId} was successfully deleted`);
          $('#modal-delete-chapter').modal('hide');
          getChapterFromDb();
        },
        error: (err) => alert(err.responseText),
      });
    }
  },
};

$('#create-chapter').click(chapter.onCreateChapterClick);
$('#chapter-table').on('click', '.fa-edit', chapter.onUpdateChapterClick);
$('#chapter-table').on('click', '.fa-trash', chapter.onDeleteIconClick);
$('#update-chapter').click(chapter.onSaveChapterClick);
$('#delete-all-chapter').click(chapter.onDeleteAllChapterClick);
$('#delete-chapter').click(chapter.onConfirmDeleteClick);

function validateChapter(paramChapter) {
  let vResult = true;
  try {
    if (paramChapter.chapterName == '') {
      vResult = false;
      throw 'Tên chương không được để trống';
    }
    if (paramChapter.chapterInfo == '') {
      vResult = false;
      throw 'Thông tin chương không được để trống';
    }
    if (paramChapter.translator == '') {
      vResult = false;
      throw 'Tên người dịch không được để trống';
    }
    if (paramChapter.page == '') {
      vResult = false;
      throw 'Trang không được để trống';
    }
  } catch (e) {
    alert(e);
  }
  return vResult;
}

function loadChapterToInput(paramChapter) {
  $('#inp-chapterName').val(paramChapter.chapterName);
  $('#inp-chapterInfo').val(paramChapter.chapterInfo);
  $('#inp-translator').val(paramChapter.translator);
  $('#inp-page').val(paramChapter.page);
}

function resetChapter() {
  $('#inp-chapterName').val('');
  $('#inp-chapterInfo').val('');
  $('#inp-translator').val('');
  $('#inp-page').val('');
}
