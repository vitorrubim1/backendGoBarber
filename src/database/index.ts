// arquivo de conexão com o banco de dados

import { createConnection } from 'typeorm';

createConnection(); /*
  essa função vai procurar pela aplicação o arquivo de configuração do banco de dados, que no caso é ormconfig.json
*/
