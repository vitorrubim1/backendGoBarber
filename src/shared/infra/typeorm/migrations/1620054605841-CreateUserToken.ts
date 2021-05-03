import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUserToken1620054605841
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_tokens',
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
            name: 'token',
            type: 'uuid',
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
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
        foreignKeys: [
          {
            name: 'TokenUser',
            referencedTableName: 'users', // tabela que terá relação
            referencedColumnNames: ['id'], // nomeio a coluna que terá a chave estrangeira
            columnNames: ['user_id'], // nome da coluna na tabela de users
            onDelete: 'CASCADE', // oq acontece se um user for deletado
            onUpdate: 'CASCADE', // oq acontece se um user for atualizado
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_tokens');
  }
}
