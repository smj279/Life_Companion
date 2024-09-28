import nodemailer from 'nodemailer';
import "dotenv/config";

const transporter= nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port:587,
    secure: false,
    auth:{
        user:process.env.SENDER,
        pass:process.env.PASSWORD
    },
});


async function main(){
    const info= await transporter.sendMail({
        from: "aspia.amir24@gmail.com",
        to: ["aspia.amir24@gmail.com"],
        subject: "Hello",
        text: "this is a test mail",
    });
    console.log("Message sent:%s", info.messageID);
}
main().catch(console.error);