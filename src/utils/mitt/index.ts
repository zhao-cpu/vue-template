import mitt from 'mitt'

type Events = {
  'get-name': string
}

export const emitter = mitt<Events>()
