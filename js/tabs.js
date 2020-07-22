var tabList = [
  "countdown",
  "resetLayer",
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
  return !player.hiddenTabs.includes(tab)
}