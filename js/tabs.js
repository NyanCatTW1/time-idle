var tabList = [
  "tick",
  "tickLayer",
  "tickUpgrade",
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

function showTab(tab) {
  let unlocked = true
  switch(tab) {
    case "tickUpgrade":
      unlocked = player.tickEver.gt(0)
  }

  return unlocked && !player.hiddenTabs.includes(tab)
}