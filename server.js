import loader from "./loader.js"

class Greeter {
    constructor() {
        this.count = 0
    }

    init(server) {
        server.addService("test.helloworld.Greeter", this, { exclude: ["init"] })
    }

    async sayGreet(ctx) {
        const { name } = ctx.request
        this.count++

        return {
            message: `hello ${name || "world"} by Greeter in server1`,
            count: this.count
        }
    }
}

class Hellor {
    init(server) {
        server.addService("test.helloworld.Hellor", this, { exclude: ["init"] })
    }

    async sayHello(ctx) {
        const { name } = ctx.request
        return { message: `hello ${name || "world"} by Hellor in server1` }
    }
}

const start = async (addr) => {
    await loader.init()

    const server = loader.initServer()
    const servicers = [new Greeter(), new Hellor()]
    await Promise.all(servicers.map(async s => s.init(server)))

    await server.listen(addr)
    console.log('gRPC Server is started: ', addr)
}

start('127.0.0.1:9098')
