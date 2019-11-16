import {context} from './context'
import {dataSources} from './dataSource'

export type Context = ReturnType<typeof context> & {
  dataSources: ReturnType<typeof dataSources>
}
