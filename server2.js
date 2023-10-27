import loader from "./loader.js"

let count = 0
const Greeter = {
    sayGreet: async (ctx) => {
        const { name } = ctx.request
        count++
        return {
            message: `hello ${name || "world"} by Greeter`,
            count
        }
    }
}

const Hellor = {
    sayHello: async (ctx) => {
        const { name } = ctx.request
        return { 
            message: `hello ${name || "world"} by Hellor` 
        }
    }
}

const start = async (addr) => {
    await loader.init()

    const server = loader.initServer()
    server.addService(loader.service('test.helloworld.Greeter'), loader.callbackify(Greeter))
    server.addService(loader.service('test.helloworld.Hellor'), loader.callbackify(Hellor))

    await server.listen(addr)
    console.log('gRPC Server is started: ', addr)
}

start('127.0.0.1:9099')
