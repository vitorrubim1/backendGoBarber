// define quais são os métodos que o serviço de email terá

export default interface IMailProvider {
  sendMail(to: string, body: string): Promise<void>;
}
