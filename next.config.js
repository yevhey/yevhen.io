module.exports = (phase, { defaultConfig }) => {
  return {
    ...defaultConfig,
    webpack: (config) => {
      config.resolve = {
        ...config.resolve,
        fallback: {
          "fs": false,
          "child_process": false,
          "tls": false,
        }
      }
      return config
    },
  }
}