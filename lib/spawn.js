const Koffing = require('./enemy_koffing');
const Meowth = require('./enemy_meowth');
const Pokeball = require('./pokeball');

const Spawn = (level) => {
  const randXPos = Math.floor(Math.random() * 50) + 950;
  const generator = Math.random();
  // Level 1
  if (level <= 400) {
    return [
      new Koffing({speed: 5, xPos: randXPos, yPos: 250})
    ];
  // Level 2
} else if (level <= 1500) {
    if (generator < 0.6) {
      return [
        new Koffing({speed: 5, xPos: randXPos + 200, yPos: 250}),
        new Pokeball({xPos: randXPos, yPos: 300})
      ];
    } else {
      return [
        new Koffing({speed: 5, xPos: randXPos, yPos: 250}),
        new Pokeball({xPos: randXPos, yPos: 200})
      ];
    }
  // Level 3
} else if (level <= 2500) {
    if (generator < 0.3) {
      return [
        new Koffing({speed: 6.5, xPos: randXPos + 100, yPos: 250}),
        new Pokeball({xPos: randXPos, yPos: 200})
      ];
    } else {
      return [
        new Meowth({xPos: randXPos + 100}),
        new Pokeball({xPos: randXPos, yPos: 200})
      ];
    }
  // Level 4
  } else {
    if (generator < 0.2) {
      return [
        new Koffing({speed: 7, xPos: randXPos + 200, yPos: 250}),
        new Pokeball({xPos: randXPos, yPos: 300})
      ];
    } else if (generator < 0.4) {
      return [
        new Meowth({xPos: randXPos + 100}),
        new Pokeball({xPos: randXPos, yPos: 200})
      ]
    } else if (generator < 0.7) {
      return [
        new Koffing({speed: 7, xPos: randXPos, yPos: 250}),
        new Koffing({speed: 7, xPos: randXPos, yPos: 180}),
        new Pokeball({xPos: randXPos, yPos: 200})
      ];
    } else {
      return [
        new Koffing({speed: 7, xPos: randXPos, yPos: 180}),
        new Meowth({xPos: randXPos - 20})
      ]
    }
  }
}

module.exports = Spawn;
