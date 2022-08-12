let appState = {
  'Andrea': 2,
  'Abe': 4,
  'Alec': 2,
  'Frank': 0,
  'Manda': -100
};

const names = ["Andrea", "Abe", "Alec", "Frank", "Manda"];

const randI = Math.floor(names.length * Math.random());

console.log({...appState, [names[randI]]: 1000});
