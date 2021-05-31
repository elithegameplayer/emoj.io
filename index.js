const emojis = [
    {
      decoy: '🙂',
      target: '🙃' //0
    }, 
    {
      decoy: '🧁',
      target: '🎂' //1
    },
    {
      decoy: '🍐',
      target: '🍏'//2
    },
    {
      decoy: '😛',
      target: '😝'//3
    },
    {
      decoy: '👿',
      target: '😈'//4
    },
    {
      decoy: '😸',
      target: '😺'//5
    },
    {
      decoy: '👩‍👩‍👦',
      target: '👩‍👩‍👧'//8
    },
    {
      decoy: '🐱',
      target: '🐹'//9
    },
    {
      decoy: '🥇',
      target: '🏅'//10
    },
    {
      decoy: '📲',
      target: '📱'//11
    },
    {
      decoy: '📷',
      target: '📸'//12
    },
    {
      decoy: '💵',
      target: '💴'//13
    },
  ];

  const letters = 'abcdefghijklmnopqrstuvwxyz'
  
  let count = 10
  const inc = 2
  let targetSpot;
  let currentEmoji;
  let size = 35
  let level = 1
  let lives = 5
  let bg = "green"
  
  function setCurrentEmoji() {
    currentEmoji = {emoji: random(emojis), pos: {}}
  }
  
  function setTargetSpot() {
    targetSpot = {x: Math.round(random(0, count - 1)), y:Math.round(random(0, count - 1))}
  }
  
  function setup () {
    createCanvas(windowWidth, windowHeight)
    setTargetSpot()
    setCurrentEmoji()
    setTimeout(function(){
      bg = 51
    }, 250)
  }

  function restart() {
     window.location.reload()
  }

  function wrong() {
    lives -= 1;
    bg = 'red'
    setTimeout(function(){
      bg = 51
    }, 250)
  } 

  function draw () {
    background(bg)
    textSize(size)
    fill('white')
    textAlign(CENTER, CENTER)

    size = 1/count*2 * 200

    for(var y = 1; y <= count; y++) {
      for (let x = 1; x <= count; x++){
        const pos = {x: map(x, 1, count, 50, width-50), y: map(y, 1, count, 50, height-50)}
        if (y === targetSpot.y && x === targetSpot.x) {
          currentEmoji.pos = {...pos}
          text(currentEmoji.emoji.target, pos.x, pos.y)
        } else {
          text(currentEmoji.emoji.decoy, pos.x, pos.y)
        }
      }
    }
    textSize(20)
    text("Level: " + level, windowWidth - 50, windowHeight - 15)
    text("Lives: " + lives, 50, windowHeight - 15)

    if(lives == 0){
      restart()
    }
  }

  function mousePressed(e){
    if ( Math.abs(mouseX - currentEmoji.pos.x) > size/2) {
      wrong()
      return
    }

    if ( Math.abs(mouseY - currentEmoji.pos.y) > size/2) {
      wrong()
      return
    }
    // they clicked the right one
    count += inc
    setCurrentEmoji()
    level++
    setTargetSpot()
  }