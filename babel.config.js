module.exports = (api) => {
  api.cache(true)

  return {
    plugins: [
      ['@babel/plugin-proposal-class-properties', {loose: true}]
    ],
    presets: [
      ['@babel/preset-env', {targets: {node: '12'}}],
      '@babel/preset-typescript',
    ]
  }
}
