import crypto from 'crypto'
import {ENCRYPTION_KEY} from '../../env'

export function createToken(obj: object) {
  if (obj) {
    return encrypt(JSON.stringify(obj))
  }
}

export function parseToken(base64: string) {
  return JSON.parse(decrypt(base64))
}

const ALGORITHM = 'aes-192-cbc'
const ENCODING = 'base64'
const key = crypto.scryptSync(ENCRYPTION_KEY, 'salt', 24);
const iv = Buffer.alloc(16, 0)

export function encrypt(text) {
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  let encrypted = cipher.update(text, 'utf8', ENCODING);
  encrypted += cipher.final(ENCODING)
  return encrypted
}

export function decrypt(encrypted) {
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  let decrypted = decipher.update(encrypted, ENCODING, 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted
}
