import { createWriteStream } from 'fs'
import { Console } from 'console'

const fileStream = createWriteStream('./moyu-error.log');
const logger = new Console(fileStream);

export default logger