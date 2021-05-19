// listar os dias disponíveis de um mês

import { injectable, inject } from 'tsyringe';

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
    @inject('AppointmentRepository')
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

    console.log(appointments);

    return [{ day: 1, available: false }];
  }
}

export default ListProviderMonthAvailabilityService;
