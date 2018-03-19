import dev from './environment.dev.js'
import prod from './environment.prod.js'

let environment

if (process.env.NODE_ENV === 'development') {
  environment = dev
} else if (process.env.NODE_ENV === 'production') {
  environment = prod
}

export default environment
