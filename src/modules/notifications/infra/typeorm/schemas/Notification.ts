import {
  ObjectID,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity('notifications') // nome do schema(tabela)
class Notification {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  content: string; // texto da notificação

  @Column('uuid')
  recipient_id: string; // user id

  @Column({ default: false })
  read: boolean; // já foi lida ou não

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Notification;
