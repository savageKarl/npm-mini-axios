import {adapter} from './adapter'

export function dispatchRequest(config: any) {
  return adapter(config)
}