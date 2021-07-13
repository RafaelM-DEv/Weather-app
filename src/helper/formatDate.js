let options = { weekday: 'short', month: 'long', day: 'numeric' }

export default function (model, type, mode) {
  let date = new Date(model)
  date.setDate(date.getDate() + 1)

  if (mode === 'time') {
    let date = new Date(model)
    return date.toLocaleString()
  }

  if (date.getDate() === new Date().getDate()) {
    return 'Today'
  }

  if (date.getDate() > new Date().getDate() && date.getDate() < (new Date().getDate() + 2)) {
    return 'Tomorrow'
  }

  return date.toLocaleDateString(type, options)
}
