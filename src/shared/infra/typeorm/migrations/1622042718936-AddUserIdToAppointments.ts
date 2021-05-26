import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddUserIdToAppointments1622042718936
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        // adicionando quem tá agendando o horário, que é o user_id
        name: 'user_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentUser',
        columnNames: ['user_id'], // qual será a coluna que receberá a chave estrangeira, que vai receber o id do usuário
        referencedColumnNames: ['id'], // qual é o nome da coluna na tabela de usuário que vai representar o provider_id
        referencedTableName: 'users', // tabela de referência
        onDelete: 'SET NULL', // cascade: oq acontece caso o usuário seja deletado, nesse caso vai seta pra null, pra não perdemos o log de agendamentos..
        onUpdate: 'CASCADE', // caso o id do usuário altere, o cascade irá alterar em todos os lugares
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // esse método sempre faz a situação contrária do que é feito no método 'up'

    await queryRunner.dropForeignKey('appointments', 'AppointmentUser');

    await queryRunner.dropColumn('appointments', 'user_id');
  }
}
