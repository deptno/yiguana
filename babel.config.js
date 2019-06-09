module.exports = (api) => {
  api.cache(true)
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets    : {
            node: '10.15'
          },
          useBuiltIns: 'entry'
        }
      ],
      '@babel/preset-typescript',
    ]
  }
}