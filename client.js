import loader from "./loader.js"

const start = async (addr) => {
    await loader.init()

    const clients = await loader.initClients({
        services: {
            'helloworld.Greeter': addr,
            'helloworld.Hellor': addr
        }
    })

    // greeter client
    const greeterClient = clients.get('helloworld.Greeter')
    const greeterResult = await greeterClient.sayGreet({ name: 'greeter' })
    console.log('greeterClient.sayGreet', greeterResult.response)

    // hellor client
    const hellorClient = clients.get('helloworld.Hellor')
    const hellorResult = await hellorClient.sayHello({ name: 'hellor' })
    console.log('hellorClient.sayHello', hellorResult.response)
}

start('127.0.0.1:9098')
