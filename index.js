const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Bienvenido a mi forma");
});

app.post("/api/forma", (req, res) => {
  let data = req.body;
  let smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    auth: {
      user: "nodemailerlmc@gmail.com",
      pass: "nodemailer22",
    },
  });

  let mailOptions = {
    from: data.email,
    to: "nodemailerlmc@gmail.com",
    subject: `Mensaje de ${data.name} ${data.lastname}`,
    html: `
            <h3>Info</h3>
                <ul>
                    <li>Nombre: ${data.name}</li>
                    <li>Apellido: ${data.lastname}</li>
                    <li>E-mail: ${data.email}</li>
                </ul>
                <h3>Mensaje:</h3>
                <p>${data.message}</p>`,
  };

  smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) {
      res.send(error);
    } else {
      res.send("Success");
      console.log(response);
    }
  });

  smtpTransport.close();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server iniciado en el PORT ${PORT}`);
});
