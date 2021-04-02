import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUsers1615922049884 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // metódo assíncrono
    await queryRunner.createTable(
      new Table({
        name: 'users', // nome da tabela
        columns: [
          {
            // colunas da tabela em formato de objeto
            name: 'id',
            type: 'uuid', //  tipo uuid pra melhor segurança
            isPrimary: true,
            generationStrategy: 'uuid', // gerar o campo id de forma automática, sendo um uuid
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true, // email unico na tabela
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()', // horário que o registro foi inserido na tabela
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // esse metódo sempre faz a situação contrária do que é feito no metódo 'up'
    await queryRunner.dropTable('users'); // deleta a table
  }
}
