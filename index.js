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
let hintRange = null;
let hints = 3;

function setup() {
  createCanvas(windowWidth, windowHeight)
  setTargetSpot()
  setCurrentEmoji()
  frameRate(30)
  fill('white')
  textAlign(CENTER, CENTER)
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

function hint() {
  if (!!hints) {
    const left = spreadX(Math.round(targetSpot.x - count / 4 < 1 ? 1 : targetSpot.x - count / 4));
    const right = spreadX(Math.round(targetSpot.x + count / 4 > count ? count : targetSpot.x + count / 4));
    const top = spreadY(Math.round(targetSpot.y - count / 4 < 1 ? 1 : targetSpot.y - count / 4));
    const bottom = spreadY(Math.round(targetSpot.y + count / 4 > count ? count : targetSpot.y + count / 4));

    hintRange = { left, right, top, bottom };
    hints--
  }
}

function spreadX(val) {
  return map(val, 1, count, 50, width - 50)
}

function spreadY(val) {
  return map(val, 1, count, 50, height - 50)
}

function draw() {
  if (lives < 1) {
    restart()
  }

  if (!pause) {
    background(bg)
    textSize(size)


    size = 1 / count * 4 * 175

    for (var y = 1; y <= count; y++) {
      for (let x = 1; x <= count; x++) {
        const pos = { x: map(x, 1, count, 50, width - 50), y: map(y, 1, count, 50, height - 50) }
        if (y === targetSpot.y && x === targetSpot.x) {
          currentEmoji.pos = { ...pos }
          if (!!hintRange) {
            if (pos.x >= hintRange.left && pos.x <= hintRange.right && pos.y >= hintRange.top && pos.y <= hintRange.bottom) text(currentEmoji.emoji.target, pos.x, pos.y)
          } else {
            text(currentEmoji.emoji.target, pos.x, pos.y)
          }
        } else {
          if (!!hintRange) {
            if (pos.x >= hintRange.left && pos.x <= hintRange.right && pos.y >= hintRange.top && pos.y <= hintRange.bottom) text(currentEmoji.emoji.decoy, pos.x, pos.y)
          } else {
            text(currentEmoji.emoji.decoy, pos.x, pos.y)
          }
        }
      }
    }
    textSize(20)
    text("Level: " + level, windowWidth - 50, windowHeight - 15)
    text("Lives: " + lives, 50, windowHeight - 15)
    text("Hints: " + hints, windowWidth * 0.4, windowHeight - 15)
    text(Math.round(frameCount / 30), windowWidth * 0.6, windowHeight - 15);
  }
}

function setCurrentEmoji() {
  currentEmoji = { emoji: random(emojis[difficulty]), pos: {} }
}

function setTargetSpot() {
  targetSpot = { x: Math.round(random(1, count)), y: Math.round(random(1, count)) }
  console.log("targetSpot", targetSpot)
}

function mousePressed(e) {
  // they clicked the wrong one
  if (Math.abs(mouseX - currentEmoji.pos.x) > size / 2 || Math.abs(mouseY - currentEmoji.pos.y) > size / 2) {
    wrong()
    return
  }
  // they clicked the right one
  count += inc
  level++

  if (level % 5 == 0) difficulty = difficulty > 4 ? 4 : difficulty + one

  setCurrentEmoji()
  setTargetSpot()
  hintRange = null;
}

function keyPressed() {
  if (keyCode == 72) hint()
  if (keyCode == 32) pause = !pause
  if (pause) noLoop()
  else loop()
}