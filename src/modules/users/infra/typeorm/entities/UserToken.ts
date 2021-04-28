import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
} from 'typeorm'; /*
  Entity: entidade que será salva no banco de dados
  Column: colunas do banco de dados
  PrimaryGeneratedColumn: para a coluna id, por ser primario e gerado automaticamente
  CreateDateColumn, UpdateDateColumn: created_at e updated_at é uma integração do TypeORM
*/

// Model está relacionado com uma tabela do banco de dados

@Entity(
  'user_tokens',
) /*
  @Entity: é um decorator, que funciona como uma função e como parametro enviará a classe Appointment abaixo
  'user_tokens': tabela do banco de dados
*/
class UserToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Generated('uuid') // token único
  token: string;

  @Column()
  user_id: string; // a qual user o token pertence

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserToken;
