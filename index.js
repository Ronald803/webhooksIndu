const qrcode = require('qrcode-terminal');
const {Client,LocalAuth} = require('whatsapp-web.js');

const client = new Client({
  authStrategy: new LocalAuth()
});

console.log("hola tarolas");
client.on('qr',qr=>{
  qrcode.generate(qr,{small:true});
})
client.on('ready',()=>{
  console.log('Cliente logeado correctamente!');
});
client.on('message',message=>{
  const typeMessage = message._data.type;             // Esta variable puede llegar a ser 'chat' o tambien 'order'
  const bodyMessage = message._data.body;             // Esta variable es el cuerpo del mensaje cuando el tipo de mensaje es chat
                                                      // si el tipo de mensaje es 'order' este campo esta vacío
  const notifyNameMessage = message._data.notifyName  // Es el nickname de quien envió el mensaje
  const remoteMessageNumber = message._data.id.remote // Es el numero quien envia el mensaje
  const orderTitle = message._data.orderTitle         // si el tipo de mensaje es 'order' aca viene lo que se ordenó
  const itemCount = message._data.itemCount           // si el tipo de mensaje es 'order' parece que esta es la cantidad de lo que se pidio
  const totalAmount1000 = message._data.totalAmount1000//si el tipo de mensaje es 'order' este es el precio de lo que se ordeno multiplicado por 1000
  const totalCurrencyCode = message._data.totalCurrencyCode//si el tipo de mensaje es 'order' este es el tipo de moneda en este caso bolivianos

  console.log({typeMessage},{bodyMessage},{notifyNameMessage},{remoteMessageNumber},{orderTitle},{itemCount},{totalAmount1000},{totalCurrencyCode});
  console.log(message);
  if(message.body === "hello"){
    client.sendMessage(message.from, 'World!!!!!');
  }
});

client.initialize();