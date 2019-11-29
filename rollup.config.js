import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'

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
    json(),
    commonjs(),
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
    'util',
    '@deptno/dynamodb',
    '@deptno/s3',
    'short-uuid',
    'debug',
  ],
}
