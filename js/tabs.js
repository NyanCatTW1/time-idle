var tabList = [
  "tick",
  "tickLayer",
  "tickUpgrade",
  "rebuild",
  "options",
  "tabbing"
]

function removeByValue(arr, value) {
  let index = arr.indexOf(value)
  if (index >= 0) delete arr[index]
  return index >= 0
}

function toggleTab(tab) {
  let wasHidden = removeByValue(player.hiddenTabs, tab)
  if (!wasHidden) player.hiddenTabs.push(tab)
}

function tabUnlocked(tab) {
  switch(tab) {
    case "tickLayer":
      return player.tickEver.gt(0) || canTick()
    case "tickUpgrade":
      return player.tickEver.gt(0)
    case "rebuild":
      return player.tickEver.gte(100)
    default:
      return true
  }
}

function showTab(tab) {
  return tabUnlocked(tab) && !player.hiddenTabs.includes(tab)
}