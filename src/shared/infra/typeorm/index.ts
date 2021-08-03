// arquivo de conexão com o banco de dados

import { createConnections } from 'typeorm';

createConnections(); /*
  essa função vai procurar pela aplicação o arquivo de configuração do banco de dados, que no caso é ormconfig.json
*/
