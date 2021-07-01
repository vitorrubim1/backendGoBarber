// listar as horas disponíveis de um prestador em um mês

import { injectable, inject } from 'tsyringe';
import { getHours, isAfter } from 'date-fns'; // getDaysInMonth: quantos dias tem no mês, getDate: retorna o dia

import IAppointmentRepository from '../repositories/IAppointmentRepository';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable() // digo que essa classe abaixo, é injetavel, recebe injeção de dependência, através do inject()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentRepository,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        day,
        month,
        year,
      },
    );

    // horas disponíveis

    const hourStart = 8; // horário de início

    // criando array
    const eachArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart, // pra começar as 8h da manhã
    ); // vai ter um length de 10, pq só é possível em um dia 10 agendamentos

    const currentDate = new Date(Date.now());

    // verificando quais são as horas disponíveis
    const availability = eachArray.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      );

      const compareDate = new Date(year, month - 1, day, hour); // informações que recebo por parâmetro

      return {
        hour,
        available: !hasAppointmentInHour && isAfter(compareDate, currentDate), // se a hora do parâmetro já passou, não terá mais disponibilidade
      };
    });

    return availability;
  }
}

export default ListProviderDayAvailabilityService;
