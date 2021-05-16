// define quais são os métodos que o serviço de email terá

import ISendMailDTO from '../dtos/ISendMailDTO';

export default interface IMailProvider {
  sendMail(data: ISendMailDTO): Promise<void>;
}
