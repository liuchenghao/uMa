const constantsContext = require.context('./modules/', true, /types\/.*\.js$/)

export default constantsContext.keys().reduce((constants, key) => {
  return Object.assign(constants, constantsContext(key))
}, {})
