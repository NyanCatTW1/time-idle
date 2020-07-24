var getDefaultPlayer = () => ({
  lastUpdate: new Date().getTime(),
  countdown: new Decimal(30),
  timePoints: new Decimal(0),
  timePointsEver: new Decimal(0),
  resetUpgradesBought: {},
  hiddenTabs: [],
  hideMaxedResetUpg: true,
  version: 1.1
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

  player.countdown = Decimal.min(countdownStart(), player.countdown.sub(diff/1000))
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
