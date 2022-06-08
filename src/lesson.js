'use strict';
let gId = 0;
let gChapterId = 0;
let gLesson = {
  lesson: '',
  onGetLessonClick() {
    $.ajax({
      url: `http://127.0.0.1:8080/book/lesson/all`,
      method: 'GET',
      dataType: 'json',
      success: getAllLesson,
      error: (err) => alert(err.responseText),
    });
  },
  onEditLessonClick() {
    let vSelectedRow = $(this).parents('tr');
    let vSelectedData = gLessonTable.row(vSelectedRow).data();
    gId = vSelectedData.id;
    $.ajax({
      url: `http://127.0.0.1:8080/book/lesson/${gId}`,
      method: 'GET',
      dataType: 'json',
      success: showLessonDetail,
      error: (err) => alert(err.responseText),
    });
  },
  onCreateLessonClick() {
    gChapterId =  $('#select-chapter').val();
    this.lesson = {
      lessonName: $('#inp-lessonName').val().trim(),
      lessonInfo: $('#inp-lessonInfo').val().trim(),
      page: $('#inp-page').val().trim(),
    };
    if (validateCreateLesson(this.lesson)) {
      $.ajax({
        url: 'http://127.0.0.1:8080/book/lesson/create/' + gChapterId,
        method: 'POST',
        data: JSON.stringify(this.lesson),
        contentType: 'application/json;charset=utf-8',
        success: () => {
          alert('Đã tạo Lesson thành công');
          gLesson.onGetLessonClick();
          resetInput();
        },
        error: (err) => alert(err.responseText),
      });
    }
  },
  onSavelessonClick() {
    this.lesson = {
      lessonName: $('#inp-lessonName').val().trim(),
      lessonInfo: $('#inp-lessonInfo').val().trim(),
      page: $('#inp-page').val().trim(),
    };
    if (validateLesson(this.lesson)) {
      $.ajax({
        url: `http://127.0.0.1:8080/book/lesson/update/${gId}`,
        method: 'PUT',
        data: JSON.stringify(this.lesson),
        contentType: 'application/json;charset=utf-8',
        success: () => {
          alert('Đã cập nhật Lessson thành công');
          gLesson.onGetLessonClick();
          resetInput();
        },
        error: (err) => alert(err.responseText),
      });
    }
  },
  onDeleteLessonClick() {
    $('#modal-delete-lesson').modal('show');
    let vSelectedRow = $(this).parents('tr');
    let vSelectedData = gLessonTable.row(vSelectedRow).data();
    $('#text-delete-lesson').text('Bạn có chắc muốn xóa lesson');
    gId = vSelectedData.id;
  },
  onDeleteAllLessonsClick() {
    $('#modal-delete-lesson').modal('show');
    gId = 0;
    $('#text-delete-lesson').text('Bạn có chắc muốn xóa tất cả lesson');
  },
  onConfirmDeleteLessonClick() {
    if (gId === 0) {
      $.ajax({
        url: `http://127.0.0.1:8080/book/lesson/delete/all`,
        type: 'DELETE',
        success: () => {
          alert('Đã xóa tất cả lesson');
          $('#modal-delete-lesson').modal('hide');
          gLesson.onGetLessonClick();
        },
        error: (err) => alert(err.responseText),
      });
    } else {
      $.ajax({
        url: `http://127.0.0.1:8080/book/lesson/delete/${gId}`,
        type: 'DELETE',
        success: () => {
          alert('Đã xóa lesson thành công');
          $('#modal-delete-lesson').modal('hide');
          gLesson.onGetLessonClick();
        },
        error: (err) => alert(err.responseText),
      });
    }
  },
  onGetChapter() {
    $.ajax({
      url: `http://127.0.0.1:8080/book/chapter/all`,
      type: 'GET',
      success: function(responsive) {
        addChapterToSelect(responsive);
      },
      error: (err) => alert(err.responseText),
    });
  }
};
gLesson.onGetChapter();
gLesson.onGetLessonClick();
// add event listener cho các dòng
$('#lesson-table').on('click', 'tr', gLesson.onGetLessonClick);
// add event listener cho icon edit
$('#lesson-table').on('click', '.fa-edit', gLesson.onEditLessonClick);
// add event listener cho button tạo mới data
$('#create-lesson').click(gLesson.onCreateLessonClick);
// add event listener cho button tạo mới data
$('#update-lesson').click(gLesson.onSavelessonClick);
// add event listener cho icon delete
$('#lesson-table').on('click', '.fa-trash', gLesson.onDeleteLessonClick);
// add event listener cho icon delete lesson
$('#delete-lesson').click(gLesson.onConfirmDeleteLessonClick);
// add event listener cho button delete All lessons
$('#delete-all-lesson').click(gLesson.onDeleteAllLessonsClick);

// tạo bảng lesson bằng data Table
let gLessonTable = $('#lesson-table').DataTable({
  order: [],
  columns: [
    { data: 'lessonName' },
    { data: 'lessonInfo' },
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

// load lesson vào table
function loadLessonToTable(paramLesson) {
  'use strict';
  gLessonTable.clear().rows.add(paramLesson).draw();
}

// hàm hiển thị lên website
function getAllLesson(paramLessons) {
  'use strict';
  loadLessonToTable(paramLessons);
}

function showLessonDetail(paramLesson) {
  $('#inp-lessonName').val(paramLesson.lessonName);
  $('#inp-lessonInfo').val(paramLesson.lessonInfo);
  $('#inp-page').val(paramLesson.page);

}

// hàm dùng để validate dữ liệu
function validateLesson(paramLesson) {
  'use strict';
  let vValidated = true;
  try {
    if (paramLesson.lessonName == '') {
      vValidated = false;
      throw 'Chưa nhập Tên bài học';
    }
    if (paramLesson.lessonInfo == '') {
      vValidated = false;
      throw 'Chưa nhập Giới thiệu bài';
    }
    if (paramLesson.page == '') {
      vValidated = false;
      throw 'Chưa nhập Page';
    }
  } catch (err) {
    alert('Error: ' + err);
  }
  return vValidated;
}
function validateCreateLesson(paramLesson) {
  'use strict';
  let vValidated = true;
  try {
    if (gChapterId == 0) {
      vValidated = false;
      throw 'Chưa chọn Chương phù hợp để lưu bài';
    }
    if (paramLesson.lessonName == '') {
      vValidated = false;
      throw 'Chưa nhập Tên bài học';
    }
    if (paramLesson.lessonInfo == '') {
      vValidated = false;
      throw 'Chưa nhập Giới thiệu bài';
    }
    if (paramLesson.page == '') {
      vValidated = false;
      throw 'Chưa nhập Page';
    }
  } catch (err) {
    alert('Error: ' + err);
  }
  return vValidated;
}

// hàm dùng để reset input
function resetInput() {
  $('#inp-lessonName').val('');
  $('#inp-lessonInfo').val('');
  $('#inp-page').val('');
}
// add Chapter to Select
function addChapterToSelect(paramChapter) {
  var chapterElement = $("#select-chapter");
  for(var chapter of paramChapter) {
    $("<option>")
      .val(chapter.id)
      .text(chapter.chapterName)
      .appendTo(chapterElement);
  }
}