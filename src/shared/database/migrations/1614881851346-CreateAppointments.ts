import { MigrationInterface, QueryRunner, Table } from 'typeorm';

// SÓ PODE ALTERAR UMA MIGRATION CASO ELA NÃO TENHA SIDO ENVIADA PRA UM SISTEMA DE CONTROLE DE VERSÃO, COMO: git

export default class CreateAppointments1614881851346
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // metódo assíncrono
    await queryRunner.createTable(
      new Table({
        name: 'appointments', // nome da tabela
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
            name: 'provider', // prestador de serviço
            type: 'varchar',
          },
          {
            name: 'date',
            type: 'timestamp with time zone', // timestamp: só existe esse tipo no postgres (além do horário, salva tbm o fuso horário local)
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
    await queryRunner.dropTable('appointments'); // deleta a table
  }
}
