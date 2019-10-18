const Sequencer = require('@jest/test-sequencer').default
const path = require('path')

module.exports = class PostCommentReplySequencer extends Sequencer {
  sort(tests) {
    return Array
      .from(tests)
      .sort(
        (p, c) => {
          const a = path.parse(p.path)
          const b = path.parse(c.path)

          if (a.dir === b.dir) {
            return score[a.name.split('.')[0]] > score[b.name.split('.')[0]]
              ? 1
              : -1
          }
          return a.dir > b.dir
            ? 1
            : -1
        }
      )
  }
}

const score = {
  post   : 1,
  comment: 2,
  reply  : 3
}

/*
(tests) {
    // Test structure information
    // https://github.com/facebook/jest/blob/6b8b1404a1d9254e7d5d90a8934087a9c9899dab/packages/jest-runner/src/types.ts#L17-L21
    const copyTests = Array.from(tests);
    console.table(copyTests)
    return copyTests.sort((testA, testB) => (testA.path > testB.path ? 1 : -1));
 */
