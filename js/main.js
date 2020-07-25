var getDefaultPlayer = () => ({
  lastUpdate: new Date().getTime(),
  tickTimeSpent: new Decimal(0),
  tick: new Decimal(0),
  tickEver: new Decimal(0),
  tickUpgradesBought: {},
  hiddenTabs: [],
  hideMaxedTickUpg: true,
  version: 1.5
})

var player = getDefaultPlayer()
var diff = 0
var diffMultiplier = 1
let gameLoopIntervalId = 0

function gameLoop(diff) {
  var thisUpdate = new Date().getTime()

  // 1 diff = 0.001 seconds
  diff = (diff || Math.min(thisUpdate - player.lastUpdate, 21600000)) * diffMultiplier
  //if (diffMultiplier > 1) console.log("SHAME")
  //else if (diffMultiplier < 1) console.log("SLOWMOTION")

  player.tickTimeSpent = player.tickTimeSpent.plus(diff/1000)
  runAuto()

  updateDisplay()
  player.lastUpdate = thisUpdate
}

function startGame() {
  // Some init job
  startInterval()
  loadGame()
  setInterval(saveGame, 3000)
}

function startInterval() {
  gameLoopIntervalId = setInterval(gameLoop, 33)
}
