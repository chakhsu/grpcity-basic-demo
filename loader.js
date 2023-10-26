import GrpcLoader from 'grpcity'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
 
// get this file dir path
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default new GrpcLoader({
    location: path.join(__dirname, './proto'),
    files: [
        'test/helloworld/service.proto'
    ]
})
