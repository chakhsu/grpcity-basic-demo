import loader from "./loader.js"

class Greeter {
    constructor() {
        this.count = 0
    }

    async sayGreet(call) {
        const { name } = call.request
        this.count++
        return {
            message: `hello ${name || "world"} by Greeter`,
            count: this.count
        }
    }
}

class Hellor {
    async sayHello(call) {
        const { name } = call.request
        return { message: `hello ${name || "world"} by Hellor` }
    }
}

const log = async (ctx, next) => {
    console.log(ctx)
    await next()
    console.log(ctx)
}

const start = async (addr) => {
    await loader.init()

    const server = await loader.initServer()
    server.use(log)

    server.add('helloworld.Greeter', new Greeter())
    server.add('helloworld.Hellor', new Hellor())

    await server.listen(addr)
    console.log('helloworld server is started: ', addr)
}

start('127.0.0.1:9098')