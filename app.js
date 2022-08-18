const cors = require("cors");
const nodemailer = require("nodemailer");
const express = require("express");
const app = express();
const port = process.env.PORT || "1000";
app.use(express.json());

const Euser = "helpline.ilmulislam@gmail.com";
const Epass = "dapyxzswsmrnneak";
const Tuser = "author.ilmulislam@gmail.com";

//functions
function listen() {
  console.log(`listening on port: ${port}`);
}
//----
app.post("/api/nodemail", cors(), (req, res) => {
  console.log(req.body);
  let { name_, gmail_, subject_, comments_ } = req.body;

  let html = `
    <div>
        <span style="color: #303030;font-size: 24px;">Subject: ${subject_}</span>
        <br/>
        <p style="color: #454545;font-size: 20px;"> ${comments_} </p>
        <br/>
        <span style="color: #303030;">Regards,</span>
        <br/>
        <span style="font-size: 16px;color: #606060;"> ${name_} | ${gmail_} </span>
    </div>
  `;

  let details = {
    from: `"Blogger Contact Form" <${Euser}>`,
    to: Tuser,
    subject: "[Ilmul Islam - ইলমুল ইসলাম।] New message received.",
    html,
  };

  try {
    nodemailer
      .createTransport({
        service: "gmail",
        auth: { user: Euser, pass: Epass },
      })
      .sendMail(details, (err) => {
        if (err) {
          throw Error(err);
        } else {
          res.json({ done: 1 });
        }
      });
  } catch (error) {
    res.json({ error: error.message, done: 0 });
  }
});
//----

app.listen(port, listen);
//me github
