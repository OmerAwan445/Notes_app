'use strict';
const addNotesBtn = document.querySelector('.add');
const notesContainer = document.querySelector('.notes');

addNotesBtn.addEventListener('click', () => {
  addNotes();
});

function addNotes(text = "") {

  const note = document.createElement('div');
  note.classList.add('note');
  note.innerHTML = `<div class="tool-bar">
  <button class="icons" id="edit"><i class="fa-regular fa-pen-to-square"></i></button>
  <button class="icons" id="delete"><i class="fa-solid fa-trash"></i></button>
</div>
<div class="main hidden"></div>
<textarea></textarea> `;
  notesContainer.appendChild(note);
  const editBtn = note.querySelector('#edit');
  const main = note.querySelector('.main');
  const deleteBtn = note.querySelector('#delete');
  const textArea = note.querySelector('textarea');

  if (text) {
    textArea.value = text;
    main.innerHTML = marked.parse(text)
    main.classList.toggle('hidden');
    textArea.classList.toggle('hidden');
  }

  editBtn.addEventListener('click', () => {
    main.classList.toggle('hidden');
    textArea.classList.toggle('hidden');
  })

  deleteBtn.addEventListener('click', () => {
    note.remove();
    updateLS();
  })

  textArea.addEventListener('input', (e) => {
    const { value } = e.target;
    main.innerHTML = marked.parse(value);
    updateLS();
  })
}

function updateLS() {
  let notesText = [];
  const allTextAreas = document.querySelectorAll('textarea');
  allTextAreas.forEach(textArea => {
    notesText.push(textArea.value)
  })
  window.localStorage.setItem('notes', JSON.stringify(notesText));
}


function getNotesFromLS() {
  return JSON.parse(window.localStorage.getItem('notes'));
}

const notesText = getNotesFromLS();
if (notesText)
  for (let i = 0; i < notesText.length; i++) {
    addNotes(notesText[i]);
  }
// window.localStorage.clear();