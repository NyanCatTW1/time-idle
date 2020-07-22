function updateDisplay() {
  updateResetLayer()
  updateToggleDisplay()
  updateTabs()
}

function updateResetLayer() {
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

function updateToggleDisplay() {
  de("resetLayerToggle", player.timePointsEver.gt(0))
  for (let tab of tabList) {
    ue(`${tab}Shown`, showTab(tab) ? "On" : "Off")
  }
}

function updateTabs() {
  for (let tab of tabList) {
    de(`${tab}Tab`, showTab(tab))
  }
}