require ('dotenv').config()

const express = require('express')
const port =3000 || process.env.port

const email = require ('./email')
const sgMail = require ('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const accountSID = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

const app= express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
  res.json({message: 'success'})
})

app.listen(port,()=>{
  console.log(`Accede al siio web dando clic aqui: http://localhost:${port}`)
})

app.post('/api/email/confirmacion',async(req,res,next)=>{
  try{
    res.json(await email.sendOrder(req.body))
  }catch(err){
    next(err)
  }
})

app.use((err,req,res,next)=>{
  const statusCode = err.statusCode || 500
  console.error(err.message, err.stack)
  res.status(statusCode).json({'message':error.message})
  return
})

/*
function getMessage(){
  const body = 'Mensaje enviado el 19/11/2021'
  return{
      to:'lorena.fajardo@udea.edu.co',
      from: 'lorenafd96@gmail.com',
      subject:'Prueba SendGrid 2',
      text:body,
      html:`!DOCTYPE html
      <html lang="en">
      <head>
        <meta charset= "UTF-8">
        <meta http-equiv = "X-UA-Compatible" content="IE-edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
     <div class="container section">
     
     <table role="presentation" style="width:602px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:center;"><tr><td style="padding:0;"><h2>
     Bienvenido a Pizzeria NIX
     </h2></td></tr></table>
      
 
     <tr>
     <td style="padding:36px 30px 42px 30px;color:blue;font-size:22;">
     ¡PEDIDO CONFIRMADO!   Tu factura ha sido emitida satisfactoriamente, ¡espera tu pedido próximamente!.
     </td>
     </tr>
 
      <td align="center" style="padding:40px 0 30px 0;background:#70bbd9;">
      <img src="https://home2med.com/photos/paisaje01.png">
      </td>
     
     </div>
    </body>
    </html>`
  }
}

async function sendEmail(){
  try{
    await sgMail.send(getMessage())
    console.log('El correo ha sido enviado')
  }catch(err){
    console.error('No se pudo enviar el mensaje')
    console.error(err)
    if(err.response)console.error(err.response.body)
  }
}

(async()=>{
  console.log('Enviando correo electronico')
  await sendEmail()
})




function sendEmailConfirmationHTML (customerName, orderNro){
    return ` <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset= "UTF-8">
        <meta http-equiv = "X-UA-Compatible" content="IE-edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <div class="container section">

        <table role="presentation" style="width:602px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:center;"><tr><td style="padding:0;"><h2>
        Bienvenido a Pizzeria NIX
        </h2></td></tr></table>
         
    
        <tr>
        <td style="padding:36px 30px 42px 30px;color:blue;font-size:22;">
        ¡PEDIDO CONFIRMADO!   Tu factura ha sido emitida satisfactoriamente, ¡espera tu pedido próximamente!.
        </td>
        </tr>
    
         <td align="center" style="padding:40px 0 30px 0;background:#70bbd9;">
         <img src="./Images/image2.jpg"
         alt="Estado de pedido"
         width="400"
         height="341"
         title="Estado de pedido">
         </td>
     
    </div>
    </body>
    </html>`
}


<td align="center" style="padding:25px 150px 75px 100px;background:#ffbbd9;">
         <img src="https://home2med.com/photos/imagen2.png"
         alt="Estado de pedido"
         width="400"
         height="341"
         title="Estado de pedido">
         </td>


*/