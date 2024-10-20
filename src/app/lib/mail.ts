import nodemailer from "nodemailer";
import mail from "@/config/mail";

export default nodemailer.createTransport(mail);
