let dayContainer = "";
let appState = {
  'sun': [],
  'mon': [],
  'tue': [],
  'wed': [],
  'thu': [],
  'fri': [],
  'sat': [],
};

function initialize() {
  initializeDayButtons();
  initializeAddButtons();
  const bg = document.getElementById("modal-background");
  const editArea = document.getElementById("edit-container");
  const addButton = document.getElementById("add-button");
  const noteArea = document.getElementById("note-content");
  editArea.addEventListener("click", e => e.stopPropagation());
  bg.addEventListener("click", (e) => {
    toggleModal();
  });
  document.addEventListener("keypress", e => {
    if (e.key === 'q' && !bg.classList.contains("hidden")) {
      toggleModal();
    }
  });
  addButton.addEventListener("click", () => {
    appendToDay(noteArea.value, dayContainer);
    const [day] = dayContainer.split("-");
    toggleModal();
    document.getElementById(dayContainer).classList.remove("hidden");
  });
}

async function dbGetDay(day) {
  const res = await fetch(`http://localhost:9001/notes/${day}`);
  const data = res.json();
  return data;
}

function dbRender() {
  Object.entries(appState).forEach(dayPair => {
    const [day, noteArr] = dayPair;
    console.log(day, noteArr);
    const dayContainer = document.getElementById(`${day}-note-container`);
    noteArr.forEach(note => {
      if (!document.getElementById(`${day}-${note.id}`)) {
	const storedNote = document.createElement("li");
	storedNote.setAttribute('id', `${day}-${note.id}`);
	storedNote.innerText = note.note;
	dayContainer.appendChild(storedNote);
      }
    });
  });
}

function initializeDayButtons() {
  const days = ["sunday", "monday",
		"tuesday", "wednesday",
		"thursday", "friday", "saturday"];
  const dayButtons = days.map(d => document.getElementById(d));
  const dayNotes = days.map(d => document
			    .getElementById(`${d.slice(0,3)}-note-container`));

  dayNotes.forEach((note, dNum) => {
    dayButtons[dNum].addEventListener("click", async () => {
      note.classList.toggle("hidden");
      const updatedDay = await dbGetDay(days[dNum]);
      appState = {...appState, [days[dNum].slice(0,3)]: updatedDay};
      dbRender();
    });
  });
}

function initializeAddButtons() {
  const days = ["sunday", "monday",
		"tuesday", "wednesday",
		"thursday", "friday", "saturday"];
  const addButton = days.map(d => document.getElementById(`add-${d}`));
  addButton.forEach((d,i) => {
    d.addEventListener("click", () => {
      toggleModal();
      dayContainer = `${days[i].slice(0,3)}-note-container`;
    });
  });
}

function toggleModal() {
  const bg = document.getElementById("modal-background");
  bg.classList.toggle("hidden");
}

function appendToDay(note,id) {
  const target = document.getElementById(id);
  const newNote = document.createElement("li");
  newNote.innerText = note;
  target.appendChild(newNote);
}

window.onload = initialize;
