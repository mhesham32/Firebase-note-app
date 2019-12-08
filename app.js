const firebaseConfig = {
  apiKey: 'AIzaSyCo86Cjo3BSIgBhdax9MCqelI4Lb_0GZfo',
  authDomain: 'note-app-f7a7c.firebaseapp.com',
  databaseURL: 'https://note-app-f7a7c.firebaseio.com',
  projectId: 'note-app-f7a7c',
  storageBucket: 'note-app-f7a7c.appspot.com',
  messagingSenderId: '526244492109',
  appId: '1:526244492109:web:f08d6746778a0cd5687d04',
  measurementId: 'G-R2ENCYLHQZ'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();

(function init() {
  //initilizing the app
  getNotes();

  // fetching Firebase data
  async function getNotes() {
    const loadingNode = createLoadingNode();
    notesContainer.append(loadingNode);
    const notes = await db.collection('notes').get();
    notesContainer.removeChild(loadingNode);
    notesContainer.innerHTML = '';
    if (notes.empty) {
      notesContainer.innerHTML = '<span>add some notes to show here</span>';
      return;
    }
    notes.forEach(note => {
      const { id } = note;
      const singleNote = note.data();
      notesContainer.innerHTML += createNoteNode(singleNote.text, id);
    });
  }

  // add data to Firebase
  async function addNote(text) {
    try {
      await db.collection('notes').add({ text });
      getNotes();
    } catch (error) {
      console.error(error);
    }
  }

  addFormNode.addEventListener('submit', event => {
    event.preventDefault();
    const { value } = addFormInputNode;
    if (value === '' || value === null) {
      console.warn('you must write some text!');
      addFormInputNode.focus();
      return;
    }
    addNote(value);
    // clear the input text
    addFormInputNode.value = '';
  });

  // make the handle edit and delete single note global to use
  // them in the ui-functions file

  window.handleEditSingleNote = function(id, text) {
    showEditField();
    editFormInputNode.value = text;
    editFormInputNode.setAttribute('data-id', id);
  };

  window.handleDeleteNote = function(id) {
    deleteNote(id);
  };

  // update Note
  async function updateNote(id, text) {
    await db
      .collection('notes')
      .doc(id)
      .set({ text });
    getNotes();
  }

  // delete the doc from Firebase
  async function deleteNote(id) {
    await db
      .collection('notes')
      .doc(id)
      .delete();
    getNotes();
  }

  editFormNode.addEventListener('submit', event => {
    event.preventDefault();
  });

  // submit the edit
  editButton.addEventListener('click', e => {
    const { value } = editFormInputNode;
    const id = editFormInputNode.dataset.id;
    updateNote(id, value);
  });

  cancelButton.addEventListener('click', e => {
    hideEditField();
  });
})();
