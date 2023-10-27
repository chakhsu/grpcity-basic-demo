import loader from "./loader.js"

class Greeter {
    constructor(loader) {
        this._loader = loader
        this.count = 0
    }

    init(server) {
        server.addService(
            this._loader.service("test.helloworld.Greeter"),
            this._loader.callbackify(this, { exclude: ["init"] })
        )
    }

    async sayGreet(ctx) {
        const { name } = ctx.request
        this.count++
        
        return {
            message: `hello ${name || "world"} by Greeter`,
            count: this.count
        }
    }
}

class Hellor {
    constructor(loader) {
        this._loader = loader
    }

    init(server) {
        server.addService(
            this._loader.service("test.helloworld.Hellor"),
            this._loader.callbackify(this, { exclude: ["init"] })
        )
    }

    async sayHello(ctx) {
        const { name } = ctx.request
        return { message: `hello ${name || "world"} by Hellor` }
    }
}

const start = async (addr) => {
    await loader.init()

    const server = loader.initServer()
    const servicers = [new Greeter(loader), new Hellor(loader)]
    await Promise.all(servicers.map(async s => s.init(server)))

    await server.listen(addr)
    console.log('gRPC Server is started: ', addr)
}

start('127.0.0.1:9099')
