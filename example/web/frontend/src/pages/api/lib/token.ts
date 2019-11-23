import {scryptSync} from 'crypto'

const DDB_ENCRYPT_KEY = 'dummy dynamodb encrypt key'
export const SALT = scryptSync(DDB_ENCRYPT_KEY!, 'salt', 24)
