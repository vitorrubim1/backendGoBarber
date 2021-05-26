import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'; /*
  Entity: entidade que será salva no banco de dados
  Column: colunas do banco de dados
  PrimaryGeneratedColumn: para a coluna id, por ser primario e gerado automaticamente
  CreateDateColumn, UpdateDateColumn: created_at e updated_at é uma integração do TypeORM
  ManyToOne: Muitos pra um
  JoinColumn: identificação da coluna
*/

import User from '@modules/users/infra/typeorm/entities/User';

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
  provider_id: string; // isso é um provedor de serviço

  // muitos agendamentos pra um usuário
  @ManyToOne(() => User) // qual é a tabela que está se referindo
  @JoinColumn({ name: 'provider_id' }) // identificação da coluna de relacionamento
  provider: User;

  @Column()
  user_id: string; // isso é um usuário

  // (isso só é um relacionamento, essa informação não existe no bd)
  @ManyToOne(() => User) // qual é a tabela que está se referindo
  @JoinColumn({ name: 'user_id' }) // identificação da coluna de relacionamento
  user: User;

  @Column('time with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
