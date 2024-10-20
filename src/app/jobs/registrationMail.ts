import mail from "../lib/mail";

type RegistrationMailData = {
  data: {
    user: {
      name: string;
      email: string;
    };
  };
};

export default {
  key: "RegistrationMail",
  async handle({ data }: RegistrationMailData) {
    const { user } = data;

    await mail.sendMail({
      from: "Queue Test <queue@queuetest.com.br>",
      to: `${user.name} <${user.email}>`,
      subject: "Cadastro de usuário",
      html: `Olá ${user.name}, bem-vindo ao sistema de filas =)`,
    });
  },
};
