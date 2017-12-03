const functions = require('firebase-functions')

exports.giannitize = functions.database.ref('/messages/{pushId}')
  .onWrite(event => {
    let data = event.data.val()

    console.log('Giannitizing', event.params.pushId, data)
    data.message = giannitize = data.message.replace('giannis', '🐄')
    return event.data.ref.update(data)
  })
