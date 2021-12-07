import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate, isAfter } from 'date-fns'; // getDaysInMonth: quantos dias tem no mês, getDate: retorna o dia

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

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

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
      {
        provider_id,
        year,
        month,
      },
    );

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1)); // aq já tenho o número de dias no mês passado por parâmetro, ex: 31

    // criando um array com a quantidade de dias (numberOfDaysInMonth)
    const eachDayArray = Array.from(
      {
        length: numberOfDaysInMonth,
      },
      (_, index) => index + 1,
    );

    const availability = eachDayArray.map(day => {
      const compareDate = new Date(year, month - 1, day, 23, 59, 59); // 23, 59, 59: fim do dia atual

      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day; // verifico se o dia que recebo por parâmetro está disponível
      });

      console.log(compareDate, new Date());

      return {
        day,
        available:
          isAfter(compareDate, new Date()) && appointmentsInDay.length < 10, // um prestador só pode ter 10 agendamentos diários, então se for menor tem algum horário disponível (true)
      };
    });

    return availability;
  }
}

export default ListProviderMonthAvailabilityService;
