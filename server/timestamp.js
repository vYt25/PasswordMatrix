let timestamp = new Date().toISOString().split('T')
timestamp[1] = timestamp[1].split('.')[0]
const now = timestamp.join(' ')



module.exports = now