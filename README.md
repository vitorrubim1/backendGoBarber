<!-- Mapeando funcionalidades do sistema -->

# Recuperação de senha

**RF (requisitos funcionais)** <!-- funcionalidade -->

- O usuário deve poder recuperar sua senha informando seu email
- O usuário deve receber um email com instruções de recuperação de senha
- O usuário deve poder resetar sua senha

**RNF (requisitos não funcionais)** <!-- questões técnicas, lib... -->

- Utilizar o Mailtrap para testar os envios de email em desenvolvimento
- Utilizar o Amazon SES para envio de email em produção
- O envio de senha deve acontecer em segundo plano (background job || fila);

**RN (regras de negócios)**

- O Link enviado por email para resetar a senha deve expirar em 2h
- O usuário deve confirmar a senha ao resetar

# Atualização do perfil

**RF (requisitos funcionais)** <!-- funcionalidade -->

- O usuário deve poder atualizar seu nome, email e senha

**RN (regras de negócios)**

- O usuário não pode atualizar seu email para um email já utilizado
- Para atualizar sua senha o usuário deve informar sua senha antiga
- Para atualizar sua senha o usuário precisa confirmar sua nova senha

# Painel do prestador (dashboard)

**RF (requisitos funcionais)** <!-- funcionalidade -->

- O prestador deve poder listar os agendamentos de um dia específico
- O prestador deve receber uma notificação sempre que houver um novo agendamento
- O prestador deve poder visualizar as notificações não lida

**RNF (requisitos não funcionais)** <!-- questões técnicas, lib... -->

- Os agendamentos do prestador devem ser mantidas em cache
- As notificações do prestador devem ser armazenadas no MongoDB
- As notificações do prestador devem ser enviadas em real time utilizando Socket.io


# Agendamentos de serviços

**RF (requisitos funcionais)** <!-- funcionalidade -->

- O usuário deve poder listar todos os prestadores de serviços
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador
- O usuário deve poder listar horários disponíveis em um dia especifíco de um prestador
- O usuário deve poder realizar um novo agendamento com um prestador

**RNF (requisitos não funcionais)** <!-- questões técnicas, lib... -->

- A listagem de prestadores devem ser mantidas em cache

**RN (regras de negócios)**

- Cada agendamento deve durar 1h exatamente
- Os agendamentos devem estar disponíveis entre 8h as 18h
- O usuário não pode agendar em um horário já agendado
- O usuário não pode agendar em um horário que já passou
- Um prestador não pode marcar horário consigo mesmo
