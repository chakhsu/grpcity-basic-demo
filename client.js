import loader from "./loader.js"

const start = async (server1Addr, server2Addr) => {
    await loader.init()

    await loader.initClients({
        services: {
            'test.helloworld.Greeter': server1Addr,
            'test.helloworld.Hellor': server2Addr
        }
    })

    // server1
    // greeter client
    const server1Client = loader.client('test.helloworld.Greeter')
    const greetResult = await server1Client.sayGreet({ name: 'greeter' })
    console.log('server1Client.sayGreet', greetResult.response)

    // server2
    // hellor client
    const server2Client = loader.client('test.helloworld.Hellor')
    const hellorResult = await server2Client.sayHello({ name: 'hellor' })
    console.log('server2Client.sayHello', hellorResult.response)

}

start('127.0.0.1:9098', '127.0.0.1:9099')
