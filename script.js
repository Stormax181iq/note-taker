const createNoteButton = document.getElementById("create-note-btn");
const titleField = document.getElementById("title-field");
const textField = document.getElementById("text-field");
const outputPanel = document.getElementById("output");
const inputPanel = document.getElementById("input");

// -- Event Listeners -- //
document.addEventListener('DOMContentLoaded', function () {
  refreshOutputPanel();
});

createNoteButton.addEventListener('click', function () {
  createNote();
});
inputPanel.addEventListener('keydown', function (e) {
  if (e.key === "Enter" && e.ctrlKey) {
    e.preventDefault();
    createNote();
  }
});

outputPanel.addEventListener('click', function (e) {
  if (e.target.classList.contains('delete-note-btn')) {
    deleteNote(e.target);
  }
});
outputPanel.addEventListener('focusout', function (e) {
  if (e.target.classList.contains('content-area')) {
    editNote(e.target);
  }
});
titleField.addEventListener('focusin', function (e) {
  if (e.target.value === "Title") {
    e.target.value = "";
  }
});
titleField.addEventListener('focusout', function (e) {
  if (e.target.value === "") {
    defaultTitleField();
  }
});
textField.addEventListener('focusin', function (e) {
  if (e.target.value === "Create a note...") {
    e.target.value = "";
  }
});
textField.addEventListener('focusout', function (e) {
  if (e.target.value === "") {
    defaultTextField();
  }
});

// -- Input Panel methods -- //

function defaultTitleField() {
  titleField.value = "Title";
}

function defaultTextField() {
  textField.value = "Create a note...";
}

// -- Output Panel methods -- //
function refreshOutputPanel() {
  clearOutputPanel();

  for (let i = 0; i < localStorage.length; i++) {

    const itemStr = localStorage.getItem(localStorage.key(i));
    const splitStr = itemStr.split("\",\"");

    const date = new Date(parseInt(splitStr[1]));

    const dateStr = dateFormat(date);

    const newNote = new Note(splitStr[0], dateStr, splitStr[2]);

    outputPanel.innerHTML += `<div id="${localStorage.key(i)}" class="note">
    <div class="first-row-wrapper">
      <h2 class="title-area">${newNote.getTitle()}</h2>
      <p class="note-date">${newNote.getTime()}</p>
      <button class="delete-note-btn" aria-label="Delete Note Button"><i class="fas fa-solid fa-x"></i></button>
    </div>
    <div class="second-row-wrapper">
      <textarea class="content-area" aria-label="Content Area | Editable">${newNote.getContent()}</textarea>
    </div>
  </div>`
  };

}

function clearOutputPanel() {
  outputPanel.innerHTML = "";
}

// -- Note handling methods -- //
function createNote() {
  createNoteStor(titleField.value, textField.value);

  defaultTextField();
  defaultTitleField();
  refreshOutputPanel();
}

class Note {
  constructor(title, time, content) {
    this.title = title;
    this.time = time;
    this.content = content;
  }
  getTitle() {
    return this.title;
  }
  getTime() {
    return this.time;
  }
  getContent() {
    return this.content;
  }
}

function createNoteStor(title, content) {
  const newNoteArray = [title, Date.now(), content];
  const strValue = newNoteArray.join('","');

  localStorage.setItem(`note_${newNoteArray[1]}`, strValue);
}

function deleteNote(targettedButton) {
  localStorage.removeItem(targettedButton.parentNode.parentNode.id);
  refreshOutputPanel();
}

function editNote(targettedObj) {
  const noteArrStr = localStorage.getItem(targettedObj.parentNode.parentNode.id);

  const noteArr = noteArrStr.split("\",\"");

  console.log(noteArr);
  noteArr[2] = targettedObj.value;

  localStorage.setItem(targettedObj.parentNode.parentNode.id, noteArr[0] + "\",\"" + noteArr[1] + "\",\"" + noteArr[2]);
}


// -- Helpers -- //

function dateFormat(date) {
  let monthNum = date.getMonth();
  let monthStr;
  switch (monthNum) {
    case 0:
      monthStr = "January";
      break;
    case 1:
      monthStr = "February";
      break;
    case 2:
      monthStr = "March";
      break;
    case 3:
      monthStr = "April";
      break;
    case 4:
      monthStr = "May";
      break;
    case 5:
      monthStr = "June";
      break;
    case 6:
      monthStr = "July";
      break;
    case 7:
      monthStr = "August";
      break;
    case 8:
      monthStr = "September";
      break;
    case 9:
      monthStr = "October";
      break;
    case 10:
      monthStr = "November";
      break;
    case 11:
      monthStr = "December";
      break;
  }

  return date.getDate() + " " + monthStr + " " + date.getFullYear() + ", " + date.getHours() + ":" + date.getMinutes();

}

