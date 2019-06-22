import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import builtins from 'rollup-plugin-node-builtins'

export default {
  input: './packages/yiguana/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
  },
  plugins: [
    json(),
    builtins(),
    resolve({
      preferBuiltins: true
    }),
    commonjs({
      namedExports: {
        'uuid': ['v4'],
        'path': ['extname'],
        'url': ['parse'],
      },
    }),
    typescript()
  ],
  external: [
    'aws-sdk',
  ],
}
