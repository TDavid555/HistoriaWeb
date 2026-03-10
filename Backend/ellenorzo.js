require('dotenv').config();
const nodemailer=require("nodemailer");
function Email_kuldes(email,cim,uzenet){
    const transporter = nodemailer.createTransport({
        host: "74.125.140.108", // A ://google.com fix IPv4 címe
        port: 587,
        secure: false, 
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        },
        tls: {
            servername: "://gmail.com", // Ez kell a hitelesítéshez
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: cim,
        text: uzenet
    };


    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } 
        else {
            console.log('Email elküldve: ' + info.response);
        }
    });
}

module.exports={Email_kuldes};