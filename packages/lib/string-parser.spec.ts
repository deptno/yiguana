import {getLinks, isImageUrl} from './string-parser'

describe('extractor', function () {
  it('getLinks', function () {
    const links = `
http://www.foufos.gr
https://www.foufos.gr
http://foufos.gr
http://www.foufos.gr/kino
http://werer.gr
www.foufos.gr
www.mp3.com
www.t.co
http://t.co
http://www.t.co
https://www.t.co
www.aa.com
    http://aa.com
      http://www.aa.com
        https://www.aa.com

      www.foufos
      www.foufos-.gr
    www.-foufos.gr
    foufos.gr
    http://www.foufos
      http://foufos
        www.mp3#.com
`
    const result = getLinks(links)
    const expected = 12
    expect(result).toHaveLength(expected)
  })
  it('isImageUrl', function () {
    const links = `
http://www.foufos.gr
https://www.foufos.gr
http://foufos.gr/bb.png
http://www.foufos.gr/kino
http://werer.com/aa.webp
www.foufos.gr
www.mp3.com
www.t.co
http://t.co
http://www.t.co
https://www.t.co
www.aa.com
    http://aa.com
      http://www.aa.com
        https://www.aa.com/cc.jpeg

      www.foufos.jpeg
      www.foufos-.gr
    www.-foufos.gr
    foufos.gr
    http://www.foufos
      http://foufos
        www.mp3#.com
`
    const linkUrls = getLinks(links)
    const result = linkUrls.filter(isImageUrl)
    const expected = 3
    expect(result).toHaveLength(expected)
  })
})
