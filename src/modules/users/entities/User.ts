import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'; /*
  Entity: entidade que será salva no banco de dados
  Column: colunas do banco de dados
  PrimaryGeneratedColumn: para a coluna id, por ser primario e gerado automaticamente
  CreateDateColumn, UpdateDateColumn: created_at e updated_at é uma integração do TypeORM
*/

// Model está relacionado com uma tabela do banco de dados

@Entity(
  'users',
) /*
  @Entity: é um decorator, que funciona como uma função e como parametro enviará a classe Appointment abaixo
  'users': tabela do banco de dados
*/
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
