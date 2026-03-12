const { sendMail } = require("../utils/mailer");

/**
 * Contact form controller
 * User sends message -> Website developer receives email
 */

exports.sendMessage = async (req, res) => {
    const { name, email, subject, message } = req.body;

    // validation
    if (!name || !email || !message) {
        return res.status(400).json({
            error: "Name, email and message are required"
        });
    }

    const mailSubject = subject ? subject : "New Contact Message";

    const textBody = `
New message from contact form

Name: ${name}
Email: ${email}

Message:
${message}
`;

    const htmlBody = `
<h3>New Contact Message</h3>

<p><b>Name:</b> ${name}</p>
<p><b>Email:</b> ${email}</p>

<p><b>Message:</b></p>
<p>${message.replace(/\n/g, "<br>")}</p>
`;

    try {
        await sendMail({
            to: process.env.CONTACT_RECEIVER || process.env.SMTP_USER, // developer email
            replyTo: process.env.CONTACT_RECEIVER, // when developer clicks reply -> goes to user
            subject: mailSubject,
            text: textBody,
            html: htmlBody
        });

        res.json({
            success: true,
            message: "Message sent successfully"
        });

    } catch (error) {
        console.error("Email error:", error.message);
        console.error("Full error:", error);

        res.status(500).json({
            error: "Failed to send email",
            details: error.message
        });
    }
};