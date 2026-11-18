import nodemailer from "nodemailer";
import transport from "../config/mailer.js";

const registerEmail = async veterinarian => {
  const { name, email, token } = veterinarian;

  try {
    const info = await transport.sendMail({
      from: "APV - Administrador de pacientes Veterinaria <apv_veterinaria@mail.com>",
      to: email,
      subject: "Confirma tu cuenta en APV",
      text: "Comprueba tu cuenta en APV",
      html: `
        <p>Hola ${name}, comprueba tu cuenta en APV</p>
        <p>Tu cuenta esta lista, solo debes confirmarla en el siguiente enlace: </p>
        <a href="${process.env.FRONTEND_URL}/confirm_account/${token}">Confirmar Cuenta</a>
  
        <p>Si tu no creaste esta cuenta, puedes omitir este mensaje.</p>
      `,
    });

    console.log("Message sent: %s", info.messageId);
    // Preview URL is only available when using an Ethereal test account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("Error while sending mail:", error);
  }
};

export default registerEmail;
