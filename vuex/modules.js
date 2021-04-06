const modulesContext = require.context('./modules/', true, /modules\/.*\.js$/)

export default modulesContext.keys().reduce((modules, key) => {
  let _key = key.replace(/[^\/]*[\/]+/g, '').replace(/(^\.\/)|(\.js$)/g, '')
  modules[_key] = modulesContext(key).default
  return modules
}, {})