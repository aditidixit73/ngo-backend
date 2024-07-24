import { Recipient, MailerSend, EmailParams, Sender } from "mailersend";
import { Router } from "express";
const router = Router()

const mailersend = new MailerSend({
    apiKey: process.env.MAILSENDER,
});

const sendEmail = async (req, res) => {
    var data = req.body
    try {
        const recipients = [new Recipient("dr.anshulpandey@gmail.com", "Recipient")];
        var naam=data.name
        naam=naam.replace(" ","")
        const sender = new Sender(`${naam}@trial-7dnvo4dr933g5r86.mlsender.net`, data.name);

        const emailParams = new EmailParams().setFrom(sender).setTo(recipients).setSubject(data.subject).setHtml(data.message).setText(data.message);

        await mailersend.email.send(emailParams);
        res.send({ msg: "success" })
    } catch (error) {
        console.log(error)

        res.send({ msg: "error" })
    }
}

router.post("/send", sendEmail)
export { router as SendEmail }