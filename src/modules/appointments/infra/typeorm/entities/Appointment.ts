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
  PrimaryGeneratedColumn: para a coluna id, por ser primário e gerado automaticamente
  CreateDateColumn, UpdateDateColumn: created_at e updated_at é uma integração do TypeORM
  ManyToOne: Muitos pra um
  JoinColumn: identificação da coluna
*/

import User from '@modules/users/infra/typeorm/entities/User';

@Entity(
  'appointments',
) /*
  @Entity: é um decorator, que funciona como uma função e como parâmetro enviará a classe Appointment abaixo
  'appointments': tabela do banco de dados
*/
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  // Muitos agendamentos pra um usuário
  @ManyToOne(() => User) // Qual é a tabela que está se referindo
  @JoinColumn({ name: 'provider_id' }) // Identificação da coluna de relacionamento
  provider: User;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
