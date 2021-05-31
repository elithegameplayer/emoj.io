let count = 10
const inc = 1
let targetSpot;
let currentEmoji;
let size = 35
let level = 1
let lives = 5
let bg = "green"
let difficulty = 1
const one = 1
let pause = false

function setCurrentEmoji() {
  currentEmoji = { emoji: random(emojis[difficulty]), pos: {} }
}

function setTargetSpot() {
  targetSpot = { x: Math.round(random(1, count)), y: Math.round(random(1, count)) }
  console.log("targetSpot", targetSpot)
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  setTargetSpot()
  setCurrentEmoji()
  frameRate(30)
  setTimeout(function () {
    bg = 51
  }, 250)
}

function restart() {
  window.location.reload()
}

function wrong() {
  lives -= 1;
  bg = 'red'
  setTimeout(function () {
    bg = 51
  }, 250)
}

function draw() {
  if (!pause) {
    background(bg)
    textSize(size)
    fill('white')
    textAlign(CENTER, CENTER)

    size = 1 / count * 4 * 175

    for (var y = 1; y <= count; y++) {
      for (let x = 1; x <= count; x++) {
        const pos = { x: map(x, 1, count, 50, width - 50), y: map(y, 1, count, 50, height - 50) }
        if (y === targetSpot.y && x === targetSpot.x) {
          currentEmoji.pos = { ...pos }
          text(currentEmoji.emoji.target, pos.x, pos.y)
        } else {
          text(currentEmoji.emoji.decoy, pos.x, pos.y)
        }
      }
    }
    textSize(20)
    text("Level: " + level, windowWidth - 50, windowHeight - 15)
    text("Lives: " + lives, 50, windowHeight - 15)
    text(Math.round(frameCount / 30), windowWidth - 300, windowHeight - 15);

    if (lives < 1) {
      restart()
    }
  }
}

function mousePressed(e) {
  if (Math.abs(mouseX - currentEmoji.pos.x) > size / 2) {
    wrong()
    return
  }

  if (Math.abs(mouseY - currentEmoji.pos.y) > size / 2) {
    wrong()
    return
  }
  // they clicked the right one
  count += inc
  level++
  if (level % 5 == 0) {
    difficulty += one
  }
  setCurrentEmoji()
  setTargetSpot()
}

function keyPressed(key) {
  if (key == " ") {
    pause = !pause
  }
}