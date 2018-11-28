# jinglepuff

## About
Oh no, Team Rocket has stolen the townspeople's Pokemon and is getting away! But lucky for us, we can count on our hero, the dependable Jigglypuff, to save the day.

## Gameplay
Jigglypuff must jump to navigate platforms and avoid falling off the map. As the clumsy villains they are, Team Rocket has dropped some of the PokeBalls they stole - it's up to Jigglypuff to pick them up to return them to their Trainers (and receive bonus points).

## Functionality and MVP
Gameplay will involve a moving background & platforms for the player to jump on. Players will be able to:
* Jump on keystroke (spacebar)
* Collect Pokeballs for points

In addition, the following will be included:
* Modal for game instructions
* Input their names for high score leaderboard
* Production README

## Technologies
* Vanilla JavaScript for game logic
* HTML5 Canvas for graphics

## Scripts
* player.js - handles jumping and collision with Pokeballs & bottom of map
* platform.js - handles creation/movement of platforms
* pokeball.js - handles appearance and collection of Pokeballs
* game.js - handles running of whole game

## Timeline
### Part One
Set up rendering of game box. Implement player that is able to jump.

### Part Two
Implement and render moving platforms. Enable player to walk on platforms. Player loses if fall off map.

### Part Three
Implement pokeballs and scores. Polish graphics.

## Bonus Features
* Have different platform speeds (difficulty)
* Have Team Rocket occassionally attack Jigglypuff (more obstacles)
