import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm'; /*
  TableColumn: pra adicionar uma coluna assim q a tabela já foi criada
  TableForeignKey: adicionar uma chave estrangeira
  */

export default class AlterProviderFieldToProviderIdAndCreatedAndUpdatedAT1615924235095
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'provider');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        // alterando o provider, pra ser provider_id
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentProvider',
        columnNames: ['provider_id'], // qual será a coluna que receberá a chave estrangeira, que vai receber o id do usuario
        referencedColumnNames: ['id'], // qual é o nome da coluna na tabela de usuário que vai representar o provider_id
        referencedTableName: 'users', // tabela de referência
        onDelete: 'SET NULL', // cascade: oq acontece caso o usuário seja deletado, nesse caso vai seta pra null, pra não perdemos o log de agendamentos..
        onUpdate: 'CASCADE', // caso o id do usuário altere, o cascade irá alterar em todos os lugares
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // esse metódo sempre faz a situação contrária do que é feito no metódo 'up'

    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

    await queryRunner.dropColumn('appointments', 'provider_id');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider', // prestador de serviço
        type: 'varchar',
      }),
    );
  }
}
