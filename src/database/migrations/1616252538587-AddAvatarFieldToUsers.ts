import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddAvatarFieldToUsers1616252538587
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      // adicionando uma coluna de avatar na tabela de users
      'users',
      new TableColumn({
        name: 'avatar',
        type: 'varchar', // não vou salvar a imagem, vou salvar o caminho da imagem
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'avatar');
  }
}
