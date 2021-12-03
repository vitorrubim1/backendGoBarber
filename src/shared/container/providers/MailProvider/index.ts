import { container } from 'tsyringe';

import IMailProvider from './models/IMailProvider';

import EtherealMailProvider from './implementations/EtherealMailProvider';

const providers = {
  ethereal: container.resolve(EtherealMailProvider), // este resolve que faz a injeção de dependência no service Ethereal
};

container.registerInstance<IMailProvider>('MailProvider', providers.ethereal);
