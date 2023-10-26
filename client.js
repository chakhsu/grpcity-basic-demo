import loader from "./loader.js"

const start = async (addr) => {
    await loader.init()

    await loader.initClients({
        services: {
            'test.helloworld.Greeter': addr,
            'test.helloworld.Hellor': addr
        }
    })

  // greeter client
  const greeterClient = loader.client('test.helloworld.Greeter')
  const greeterResult = await greeterClient.sayGreet({ name: 'greeter' })
  console.log('greeterClient.sayGreet', greeterResult)

  // hellor client
  const hellorClient = loader.client('test.helloworld.Hellor')
  const hellorResult = await hellorClient.sayHello({ name: 'hellor' })
  console.log('hellorClient.sayHello', hellorResult)

}

start('127.0.0.1:9099')
