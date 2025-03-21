import  nodemailer from 'nodemailer'
import hbs from "nodemailer-express-handlebars";

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


var transporter = nodemailer.createTransport({
    // service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    // secure: true,
    auth: {
      user: "intelisynctechnology@gmail.com",
      pass: "dwwovfomxufibdgj"
    },
});

const handlebarOptions = {
    viewEngine: {
      extName: '.handlebars',
      partialsDir: join(__dirname, '../view/'),
      layoutsDir: join(__dirname, '../view/'),
      defaultLayout: false,
    },
    viewPath: join(__dirname, '../view/'),
    extName: '.handlebars',
 };
  
transporter.use("compile", hbs(handlebarOptions));

export const mail = async function (name,lastName, contactNumber, email){
    let mailOptions = {
        from: "intelisynctechnology@gmail.com",
        to: process.env.EMAIL,
        subject: "New user",
        template: "email",
        context: {
            name,
            lastName,
            email,
            contactNumber
        
        },
    };

    // Send email using transporter
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) { // If error occurs while sending email
            console.log("Error -"+ err); // Log the error
        } else { // If email sent successfully
            console.log("Email sent successfully", info.response); // Log the success message with email response info
        }
    });
};