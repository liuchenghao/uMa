const constantsContext = require.context('./modules/', false, /\.js$/)

export default constantsContext.keys().reduce((constants, key) => {
  return Object.assign(constants, constantsContext(key))
}, {})
