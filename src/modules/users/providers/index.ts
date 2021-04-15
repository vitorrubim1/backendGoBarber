// injetar dependência

import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

// toda vez que uma classe injetar uma dependência 'HashProvider', como essa daqui foi registrada(registerSingleton) retornará uma instância da classe BCryptHashProvider;
container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
