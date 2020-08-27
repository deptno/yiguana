import {users} from '@constant'
import {createContext} from 'react'

export const UserContext = createContext<any>(users[0])