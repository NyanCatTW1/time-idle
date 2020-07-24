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
    updateCountdownStart()
  })

  const gain = resetGain()
  const single = gain.eq(1)
  de("resetBtn", player.countdown.lte(0), "", function() {
    ue("resetGain", single ? "a" : nf(gain))
    ue("resetGainS", single ? "" : "s")
  })

  de("timePointDisplay", player.timePointsEver.gt(0), "", function() {
    ue("timePointAmount", nf(player.timePoints))
    ue("timePointAmountS", player.timePoints.gt(1) ? "s" : "")
  })
}

function updateCountdownStart() {
  const linearPart = getLinearPart(false)
  const expoPart = getExpoPart()
  let str = ""

  if (expoPart.neq(1)) {
    if (linearPart.lt(1)) {
      str += `Max(1, ${nf(linearPart)}) * `
    } else {
      str += `${nf(linearPart)} * `
    }
    str += `${nf(expoPart)} = `
  }
  
  str += timeDisplay(countdownStart())

  ue("countdownStart", str)
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

function RUMaxed(id) {
  return getRULevel(id).gte(resetUpgrades[id][3])
}

function showRU(id) {
  let ret = RUUnlocked(id)
  ret = ret && !(player.hideMaxedResetUpg && RUMaxed(id))
  return ret
}

function updateRUDisplay(force = false) {
  if (!showTab("resetUpgrade") && !force) return false

  ue("maxedShown", player.hideMaxedResetUpg ? "Yes" : "No")

  for (let id = 0; id < resetUpgrades.length; id++) {
    de(`RU${id}`, showRU(id), "", function() {
      ue(`RU${id}`, getRUBtnText(id))
    })
  }
}

function getRUBtnText(id) {
  const RU = resetUpgrades[id]
  const RUCost = getRUCost(id)
  return `${RU[0]}
Cost: ${ RUMaxed(id) ? "MAXED" : `${nf(RUCost)} Time Point${RUCost.gt(1) ? "s" : ""}`}
Current Level: ${nf(getRULevel(id))}/${nf(resetUpgrades[id][3])}`
}

function updateTabs() {
  for (let tab of tabList) {
    de(`${tab}Tab`, showTab(tab))
  }
}

function toggleMaxedResetUpg() {
  player.hideMaxedResetUpg = !player.hideMaxedResetUpg
}