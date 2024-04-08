const { Resend } = require("resend");
const resend = new Resend(process.env.RESENDKEY);

const sendMail = async (email,subject,text) =>{
    await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: [email],
        subject: subject,
        text: text,
        headers: {
          "X-Entity-Ref-ID": "123456789",
        },
    });
}

module.exports = sendMail;