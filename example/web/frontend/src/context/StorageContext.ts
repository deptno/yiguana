import {createContext} from 'react'
import {User} from '../../../../../lib/entity'

export const StorageContext = createContext<Storage>({} as Storage)

type Storage = {
  user: User
}
