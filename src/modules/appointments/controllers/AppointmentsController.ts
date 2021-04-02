import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../infra/typeorm/entities/Appointment';

// DTO: Data Transfer Object

// arquivo responsável por criar, armazenar, ler, editar

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  /*
   extendendo Repository que possui todos metódos pronto, ex: (create, all, delete, update).
   <Appointment>: tipagem da classe, que é o model
  */

  // METÓDO PARA ENCONTRAR UM AGENDAMENTO PELA MESMA DATA
  public async findByDate(date: Date): Promise<Appointment | null> {
    // Promise<>: pq a função é assincrona
    // caso encontre na mesma data retorna o próprio Appointment, caso não retorna null

    const findAppointment = await this.findOne({
      where: { date }, // encontrar um agendamento que a data que eu recebo seja igual a alguma data no bd
    });

    return findAppointment || null; // se não encontrar por padrão vem undefined, mas eu quero q seja null
  }
}

export default AppointmentsRepository;
