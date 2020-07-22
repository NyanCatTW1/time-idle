var getDefaultPlayer = () => ({
  lastUpdate: new Date().getTime(),
  countdown: new Decimal(1/0),
  timePoints: new Decimal(0),
  timePointsEver: new Decimal(0)
})
var player = getDefaultPlayer()
var diff = 0
var diffMultiplier = 1
let gameLoopIntervalId = 0

function updateDisplay() {
  ue("countdown", timeDisplay(player.countdown))

  const gain = resetGain()
  const single = gain.eq(1)
  de("resetBtn", player.countdown.eq(0) || player.timePointsEver.gt(0), "", function() {
    ue("resetGain", single ? "a" : nf(gain))
    ue("resetGainS", single ? "" : "s")
  })

  de("timePointDisplay", player.timePointsEver.gt(0), "", function() {
    ue("timePointAmount", nf(player.timePoints))
    ue("timePointAmountS", player.timePoints.gt(1) ? "s" : "")
  })
}

function gameLoop(diff) {
  // 1 diff = 0.001 seconds
  var thisUpdate = new Date().getTime()
  diff = (diff || Math.min(thisUpdate - player.lastUpdate, 21600000)) * diffMultiplier
  //if (diffMultiplier > 1) console.log("SHAME")
  //else if (diffMultiplier < 1) console.log("SLOWMOTION")

  player.countdown = Decimal.min(countdownStart(), Decimal.max(0, player.countdown.sub(diff/1000)))

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
