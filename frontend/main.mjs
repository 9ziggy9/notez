import fetch from 'node-fetch';

let dayContainer = "";
let dataBase = {
  'sun': [],
  'mon': [],
  'tue': [],
  'wed': [],
  'thu': [],
  'fri': [],
  'sat': [],
};

function initialize() {
  dbInitialize();
  console.log(dataBase);
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
    dbAdd(noteArea.value, day);
    toggleModal();
    document.getElementById(dayContainer).classList.remove("hidden");
  });
}

function dbAdd(note, day) {
  dataBase[day].push(note);
  dbUpdate();
}

function dbGetAll(day) {
  fetch('http://localhost:9001/notes/sunday')
    .then(res => res.json())
    .then(data => console.log(data));
}

function dbUpdate() {
  localStorage.setItem("database", JSON.stringify(dataBase));
}

function dbInitialize() {
  const db = localStorage.getItem("database");
  if (!db) {
    localStorage.setItem("database", JSON.stringify(dataBase));
  } else {
    dataBase = JSON.parse(localStorage.getItem("database"));
    dbRender();
  }
}

function dbRender() {
  Object.entries(dataBase).forEach(dayPair => {
    const [day, noteArr] = dayPair;
    const dayContainer = document.getElementById(`${day}-note-container`);
    noteArr.forEach(note => {
      const storedNote = document.createElement("li");
      storedNote.innerText = note;
      dayContainer.appendChild(storedNote);
    });
  });
}

function initializeDayButtons() {
  // BUTTONS
  const sunButton = document.getElementById("sunday");
  const monButton = document.getElementById("monday");
  const tueButton = document.getElementById("tuesday");
  const wedButton = document.getElementById("wednesday");
  const thuButton = document.getElementById("thursday");
  const friButton = document.getElementById("friday");
  const satButton = document.getElementById("saturday");

  // NOTE AREA
  const sunNotes = document.getElementById("sun-note-container");
  const monNotes = document.getElementById("mon-note-container");
  const tueNotes = document.getElementById("tue-note-container");
  const wedNotes = document.getElementById("wed-note-container");
  const thuNotes = document.getElementById("thu-note-container");
  const friNotes = document.getElementById("fri-note-container");
  const satNotes = document.getElementById("sat-note-container");

  sunButton.addEventListener("click", () => {
    sunNotes.classList.toggle("hidden");
    dbGetAll();
  });
  monButton.addEventListener("click", () => {
    monNotes.classList.toggle("hidden");
  });
  tueButton.addEventListener("click", () => {
    tueNotes.classList.toggle("hidden");
  });
  wedButton.addEventListener("click", () => {
    wedNotes.classList.toggle("hidden");
  });
  thuButton.addEventListener("click", () => {
    thuNotes.classList.toggle("hidden");
  });
  friButton.addEventListener("click", () => {
    friNotes.classList.toggle("hidden");
  });
  satButton.addEventListener("click", () => {
    satNotes.classList.toggle("hidden");
  });
}

function initializeAddButtons() {
  const addSun = document.getElementById("add-sunday");
  const addMon = document.getElementById("add-monday");
  const addTue = document.getElementById("add-tuesday");
  const addWed = document.getElementById("add-wednesday");
  const addThu = document.getElementById("add-thursday");
  const addFri = document.getElementById("add-friday");
  const addSat = document.getElementById("add-saturday");

  addSun.addEventListener("click", ()=> {
    toggleModal();
    dayContainer = "sun-note-container";
  });
  addMon.addEventListener("click", ()=> {
    toggleModal();
    dayContainer = "mon-note-container";
  });
  addTue.addEventListener("click", ()=> {
    toggleModal();
    dayContainer = "tue-note-container";
  });
  addWed.addEventListener("click", ()=> {
    toggleModal();
    dayContainer = "wed-note-container";
  });
  addThu.addEventListener("click", ()=> {
    toggleModal();
    dayContainer = "thu-note-container";
  });
  addFri.addEventListener("click", ()=> {
    toggleModal();
    dayContainer = "fri-note-container";
  });
  addSat.addEventListener("click", ()=> {
    toggleModal();
    dayContainer = "sat-note-container";
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
