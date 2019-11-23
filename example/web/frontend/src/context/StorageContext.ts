import {createContext} from 'react'
import {User} from '../../../../../src/entity/user'

export const StorageContext = createContext<Storage>({} as Storage)

type Storage = {
  user: User
}
