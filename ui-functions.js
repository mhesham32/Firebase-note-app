//declaring Node variables
const addFormNode = document.querySelector('#add-form');
const addFormInputNode = document.querySelector('#add-form input');
const editFormNode = document.querySelector('#edit-form');
const editFormInputNode = document.querySelector('#edit-form input');
const editButton = document.querySelector('.edit');
const cancelButton = document.querySelector('.cancel');
const singleNoteNode = document.querySelector('.single-note');
const notesContainer = document.querySelector('#notes-container');
const addNoteField = document.querySelector('#add-note');
const editNoteField = document.querySelector('#edit-note');

function createNoteNode(text, noteId) {
  const html = `
  <div class="single-note" data-id="${noteId}">
    <p class="note-text">${text}</p>
    <div class="note-buttons">
      <div class="edit-note" onclick="handleEditSingleNote('${noteId}','${text}')">
        <i class="material-icons">
          edit
        </i>
      </div>
      <div class="delete-note" onclick="handleDeleteNote('${noteId}')">
        <i class="material-icons">
          delete
        </i>
      </div>
    </div>
  </div>`;
  return html;
}

function createLoadingNode() {
  const node = document.createElement('h3');
  node.id = 'loading';
  node.innerText = 'Loading...';
  return node;
}

function showEditField() {
  editNoteField.style.display = 'block';
  editNoteField.style.opacity = 1;
  addNoteField.setAttribute('disabled', 'true');
}

function hideEditField() {
  addNoteField.removeAttribute('disabled');
  editNoteField.style.opacity = 0;
  editNoteField.style.display = 'none';
}
