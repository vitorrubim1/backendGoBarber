import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm'; /*
  Entity: entidade que será salva no banco de dados
  Column: colunas do banco de dados
  PrimaryGeneratedColumn: para a coluna id, por ser primario e gerado automaticamente
*/

// Model está relacionado com uma tabela do banco de dados

@Entity(
  'appointments',
) /*
  @Entity: é um decorator, que funciona como uma função e como parametro enviará a classe Appointment abaixo
  'appointments': tabela do banco de dados
*/
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider: string;

  @Column('time with time zone')
  date: Date;
}

export default Appointment;
