const qrcode = require('qrcode-terminal');
const {Client,LocalAuth,MessageMedia} = require('whatsapp-web.js');

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
  if(isThisWordInTheString("hola",message.body)){
    client.sendMessage(message.from, 'Hola!😄 Somos Academia Prometeo. Te comparto las siguientes opciones de interes sobre la Academia');
    client.sendMessage(message.from, '1. Libro *Medicina* 👈');
    client.sendMessage(message.from, '2. Libro *Matematica* 👈');
    client.sendMessage(message.from, '3. Tarjetas *Terminología* Médica 👈');
    client.sendMessage(message.from, 'Escribe la opción de tu interes, ejemplo: "Medicina"');    
  }
  if(isThisWordInTheString("medicina",message.body)){
    client.sendMessage(message.from, '*Libro 1000 MED*')
    client.sendMessage(message.from, 'Este material es un banco de preguntas y problemas típicos de: - biología - anatomía - lenguaje - matemáticas - física - química Con todos los distintos temas incluidos en las guías otorgadas para el ingreso a la facultad de Medicina y Tecnología Médica. *Costo*: 30 BS');
  }
  if(isThisWordInTheString("matematica",message.body)){
    client.sendMessage(message.from, '*Libro Matemática Preuniversitaria*')
    client.sendMessage(message.from, 'Prepárate para ingresar a: Facultad de Ciencias Económicas y Financieras  🔹Facultad de Ingeniería 🔹Facultad de Tecnología 🔹Facultad de Medicina     Consta de todos los contenidos que se consideran en las pruebas de suficiencia académica. ❗️❗️ Teoría y práctica  ❗️❗️ Ejercicios resueltos de exámenes pasados ❗️❗️ Más de 900 ejercicios propuestos. *Costo*: 25 Bs ');
  }
  if(isThisWordInTheString("terminologia",message.body)){
    client.sendMessage(message.from, '*Tarjetas de Terminología Médica*')
    client.sendMessage(message.from, 'Son más de 100 tarjetas con los prefijos, sufijos y raíces de terminología médica que preguntan en el examen de ingreso a la facultad de medicina, enfermería, tecnología médica nutrición y dietética. Cada ficha tiene el prefijo sufijo raíz su significado, una imagen para asociar el significado, y un respectivo ejemplo de uso. *Costo*: 20 Bs.');
  }
  if(isThisWordInTheString("adios",message.body )){
    client.sendMessage(message.from, 'Que tengas un resto de jornada agradable.');
  }

});
client.initialize();
function isThisWordInTheString (word,text){
  const wordLower = word.toLowerCase();
  const textLower = text.toLowerCase();
  const arrayOfWords = textLower.split(' ');
  let wordExists = false;
  wordExists = arrayOfWords.some((w)=>{ return w===wordLower })
  return wordExists
}