import nodemailer from "nodemailer";
import transport from "../config/mailer.js";

const forgetPasswordEmail = async veterinarian => {
  const { name, email, token } = veterinarian;

  try {
    const info = await transport.sendMail({
      from: "APV - Administrador de pacientes Veterinaria <apv_veterinaria@mail.com>",
      to: email,
      subject: "Reestablece tu contraseña",
      text: "Reestablece tu contraseña",
      html: `
        <p>Hola ${name}, has solicitado un link para reestablecer tu contraseña en APV</p>
        <p>Sigue el siguiente enlace para crear una nueva contraseña: </p>
        <a href="${process.env.FRONTEND_URL}/change_password/${token}">Cambiar Contraseña</a>
  
        <p>Si tu no solicitado este link, puedes omitir este mensaje.</p>
      `,
    });

    console.log("Message sent: %s", info.messageId);
    // Preview URL is only available when using an Ethereal test account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("Error while sending mail:", error);
  }
};

export default forgetPasswordEmail;
