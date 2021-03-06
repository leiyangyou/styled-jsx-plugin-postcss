const postcss = require('postcss')
const loader = require('postcss-load-plugins')
const path = require('path')

let plugins
let _processor

function processor(src, options) {
  options = options || {}

  let loaderPromise
  if (!plugins) {
    loaderPromise = loader(options.env || process.env, path.join(__dirname, ".."), { argv: false })
      .then(pluginsInfo => {
        plugins = pluginsInfo.plugins || []
      })
  } else {
    loaderPromise = Promise.resolve()
  }

  return loaderPromise
    .then(() => {
      if (!_processor) {
        _processor = postcss(plugins)
      }
      return _processor.process(src, { from: false })
    })
    .then(result => result.css)
}

module.exports = processor
