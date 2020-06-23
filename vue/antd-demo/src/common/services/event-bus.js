import PubSub from 'pubsub-js'

function on(name, callback) {
  return PubSub.subscribe(name, (msg, envelope) => {
    callback(envelope.event, envelope.data)
  })
}

function off(token) {
  return PubSub.unsubscribe(token)
}

function emit(name, data) {
  const event = {
    name,
    preventDefault: function() {
      event.defaultPrevented = true
    },
    defaultPrevented: false,
  }
  PubSub.publishSync(name, { event, data })
  return event
}

function once(name, callback) {
  return PubSub.subscribeOnce(name, (msg, envelope) => {
    callback(envelope.event, envelope.data)
  })
}
const eventBus = {
  on,
  off,
  emit,
  once,
}
export default eventBus
