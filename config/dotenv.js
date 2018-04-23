const fs = require('fs')
const path = require('path')

const DOTENV_PATH = path.resolve('.env')
const NODE_ENV = process.env.NODE_ENV
if (!NODE_ENV) {
  throw new Error(
    'The NODE_ENV environment variable is required but was not specified.',
  )
}

var dotenvFiles = [
  `${DOTENV_PATH}.${NODE_ENV}.local`,
  `${DOTENV_PATH}.${NODE_ENV}`,
  NODE_ENV !== 'test' && `${DOTENV_PATH}.local`,
  DOTENV_PATH,
].filter(Boolean)

dotenvFiles.forEach((dotenvFile) => {
  if (fs.existsSync(dotenvFile)) {
    require('dotenv-expand')(
      require('dotenv').config({
        path: dotenvFile,
      }),
    )
  }
})
