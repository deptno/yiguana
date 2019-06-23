import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'

export default {
  input: './packages/yiguana/index.ts',
  output: {
    file: './packages/yiguana/dist/index.js',
    format: 'cjs',
  },
  plugins: [
    json(),
    resolve({
      preferBuiltins: true
    }),
    commonjs({
      namedExports: {
        'uuid': ['v4'],
      },
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
