import loader from "./loader.js"

let count = 0
const Greeter = {
    sayGreet: async (ctx) => {
        const { name } = ctx.request
        count++
        return {
            message: `hello ${name || "world"} by Greeter in server2`,
            count
        }
    }
}

const Hellor = {
    sayHello: (ctx, callback) => {
        const { name } = ctx.request
        callback(null, {
            message: `hello ${name || "world"} by Hellor in server2`
        })
    }
}

const start = async (addr) => {
    await loader.init()

    const server = loader.initServer()
    server.addService('test.helloworld.Greeter', Greeter)
    server.addService('test.helloworld.Hellor', Hellor)

    await server.listen(addr)
    console.log('gRPC Server is started: ', addr)
}

start('127.0.0.1:9099')
