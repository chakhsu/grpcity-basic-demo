import { ProtoLoader } from 'grpcity'
import path from 'node:path'

// __dirname for esm
import { fileURLToPath } from 'node:url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default new ProtoLoader({
    location: path.join(__dirname, './proto'),
    files: [
        'helloworld/service.proto'
    ]
})