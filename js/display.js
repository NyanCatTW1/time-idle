function updateDisplay() {
  updateResetLayer()
  updateToggleDisplay()
  updateRUDisplay()
  updateTabs()
}

function updateResetLayer(force = false) {
  if (!showTab("resetLayer") && !force) return false

  ue("countdown", timeDisplay(player.countdown))

  de("countdownStartContainer", player.timePointsEver.gt(10) || getRULevel(0).gt(0), "", function() {
    ue("countdownStart", timeDisplay(countdownStart()))
  })

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

function updateToggleDisplay(force = false) {
  if (!showTab("tabbing") && !force) {
    ue("tabbingShown", "Off")
    return false
  }

  de("resetLayerToggle", player.timePointsEver.gt(0))
  de("resetUpgradeToggle", player.timePointsEver.gt(0))
  for (let tab of tabList) {
    ue(`${tab}Shown`, showTab(tab) ? "On" : "Off")
  }
}

function updateRUDisplay(force = false) {
  if (!showTab("resetUpgrade") && !force) return false

  for (let id = 0; id < resetUpgrades.length; id++) {
    ue(`RU${id}`, getRUBtnText(id))
  }
}

function getRUBtnText(id) {
  const RU = resetUpgrades[id]
  const RUCost = getRUCost(id)
  return `${RU[0]}
Cost: ${getRULevel(id).eq(resetUpgrades[id][3]) ? "MAXED" : `${nf(RUCost)} Time Point${RUCost.gt(1) ? "s" : ""}`}
Current Level: ${nf(getRULevel(id))}/${nf(resetUpgrades[id][3])}`
}

function updateTabs() {
  for (let tab of tabList) {
    de(`${tab}Tab`, showTab(tab))
  }
}