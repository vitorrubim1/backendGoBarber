// listar os dias disponíveis de um mês

import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate } from 'date-fns'; // getDaysInMonth: quantos dias tem no mês, getDate: retorna o dia

import IAppointmentRepository from '../repositories/IAppointmentRepository';

/*
service responsável por validar dias disponíveis de um prestador
*/

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable() // digo que essa classe abaixo, é injetavel, recebe injeção de dependência, através do inject()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentRepository,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
      { provider_id, month, year },
    );

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1)); // aq já tenho o número de dias no mês passado por parâmetro, ex: 31

    // criando um array com a quantidade de dias (numberOfDaysInMonth)
    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1,
    );

    const availability = eachDayArray.map(day => {
      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day; // verifico se o dia que recebo por parâmetro está disponível
      });

      return {
        day,
        available: appointmentsInDay.length < 10, // um prestador só pode ter 10 agendamentos diários, então se for menor tem algum horário disponível (true)
      };
    });

    return availability;
  }
}

export default ListProviderMonthAvailabilityService;
