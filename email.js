const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const fs = require("fs");

pathToAttachment = `${__dirname}/attachment.pdf`;
attachment = fs.readFileSync(pathToAttachment).toString("base64");

function sendEmailConfirmationHTML (customerName, orderNro, toEmail, prod01, prod02, prod03, prod04){
    return ` <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset= "UTF-8">
            <meta http-equiv = "X-UA-Compatible" content="IE-edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
    		<title>Document</title>

            <style>
                table, th, td {
                border: 1px solid black;
                align: center;
                }
                table {
                border-spacing: 40px;
    			background:#00000020;
                }
                h2 {text-align: center;}
            </style>
      
    	</head>

        <body>
            <div class= "container">

                <table role="presentation" style="width:800px;border-collapse:collapse;border:1px solid #ff0103;background:#ff00034d;border-spacing:1;text-align:center;"><tr><td style="padding:0;"><h1>Bienvenido a Pizzeria NIZ</h1></td></tr></table><br>
                     
                    <form action="/action_page.php" background:#ff00034d >
                        <label for="fname">De: </label><br>
                        <input type="text" style="width:300px; margin-left:1px"  value="pizzero@pizzerianiz.com"><br>
                        <label for="fname">Para: </label><br>
                        <input type="text" style="width:300px; margin-left:1px" value=${toEmail}><br>        <label for="lname">Asunto:</label><br>
                        <input type="text" style="width:300px; margin-left:1px" value="Envio pedido, factura ${orderNro}"><br>
                    </form><br><hr>
                   
                    <img src= "https://home2med.com/photos/titulo.png">

                    
                    <h3><strong>¡PEDIDO CONFIRMADO!</strong></h3>
                    <p> Tu factura ha sido emitida satisfactoriamente, a nombre de <b>${customerName}</b>, con el número <b>${orderNro}</b> ¡Espera tu pedido!</p>

                    <h3><b>A continuación tu orden: </b></h3>

                    <table style="width:85%">
                    <tr>
                        <td><img src="https://home2med.com/photos/pizza02.png">
                        <br><h2><b>${prod01}</b></h2></td>
                        <td><img src="https://home2med.com/photos/pizza05.png">
                        <br><h2><b>${prod02}</b></h2></td>
                    </tr>
                    <tr>
                        <td><img src="https://home2med.com/photos/pizza11.png">
                        <br><h2><b>${prod03}</b></h2></td>
                        <td><img src="https://home2med.com/photos/pizza08.png">
                        <br><h2><b>${prod04}</b></h2></td>
                    </tr>
                </table><br>
                <h2>GRACIAS POR SU COMPRA!!</h2>

            </div>
        </body>
    </html>`
}

function getMessage(emailParams){

    return{
        to: emailParams.toEmail,
        text:`hola ${emailParams.customerName}, te enviamos las imagenes del producto y la factura con numero ${emailParams.orderNro}`,
        from: 'lorenafd96@gmail.com',
        subject:'Confirmación de información',
        attachments: [
            {
              content: attachment,
              filename: "attachment.pdf",
              type: "application/pdf",
              disposition: "attachment"
            }
          ],
        html:sendEmailConfirmationHTML(emailParams.customerName, emailParams.orderNro, emailParams.toEmail, emailParams.prod01, emailParams.prod02, emailParams.prod03, emailParams.prod04,)
    }
}


async function sendOrder(emailParams){
	try{
		await sgMail.send(getMessage(emailParams))
		return{message: 'Confirmación de compra enviada'}
	}catch(error){
		const message = 'No se pudo enviar la OC. Valide errores'
		console.error(message);
		console.error(error);
		if(error.responde) {
			console.error(err.response.body)
		}
		return{message};
	}
}

module.exports={
	sendOrder
}
