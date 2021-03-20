class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    // statusCode = 400: erro padrão, caso não seja informado
    // statusCode = 401: erro usuário não tem autorização
    // statusCode = 404: erro usuário não encontrado

    this.message = message;

    this.statusCode = statusCode;
  }
}

export default AppError;
