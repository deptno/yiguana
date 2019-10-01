import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: './src/index.ts',
  output: {
    file: './lib/index.js',
    format: 'cjs',
  },
  plugins: [
    resolve({
      preferBuiltins: true
    }),
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
        },
        exclude: [
          "**/__mocks__/*",
          "**/__tests__/*",
          "**/*.spec.*",
          "**/*.test.*",
          "**/dist/*",
          "**/serverless/*",
        ]
      }
    })
  ],
  external: [
    'aws-sdk',
    'crypto',
    'path',
    'url',
  ],
}
