
export default function (model, type, mode) {
  const options = { weekday: 'short', month: 'long', day: 'numeric' }
  const date = new Date(model)
  const modelDate = date.getDate()

  date.setDate(date.getDate() + 1)

  if (mode === 'time') {
    return date.toLocaleString()
  }

  if (modelDate === new Date().getDate()) {
    return 'Today'
  }

  if (modelDate > new Date().getDate() && modelDate < (new Date().getDate() + 2)) {
    return 'Tomorrow'
  }

  return date.toLocaleDateString(type, options)
}
