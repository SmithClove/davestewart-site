import Vue from 'vue'

const req = require.context('./', true, /\.(vue|js)$/i)
req.keys().forEach(key => {
  const name = key.split('/').pop().match(/\w+/).shift()
  if (name !== 'index') {
    // console.log('registering component: ' + name)
    Vue.component(name, req(key).default)
  }
})
