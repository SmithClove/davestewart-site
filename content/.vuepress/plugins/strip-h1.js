function findIndex (state, tag, type) {
  return state.tokens.findIndex(token => {
    return token.tag === tag && token.type === type
  })
}

function stripH1 (state) {
  const start = findIndex(state, 'h1', 'heading_open')
  if (start > -1) {
    const end = findIndex(state, 'h1', 'heading_close')
    state.tokens.splice(start, (end - start) + 1 )
  }
}

function plugin (md) {
  md.core.ruler.push('strip_h1', stripH1)
}

module.exports = {
  plugin
}
