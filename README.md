# Recuperação de senha

**RF**

- Usuário(a) deve poder recuperar sua senha informando o seu e-mail;
- Usuário(a) deve receber um e-mail com instruções de recuperação de senha;
- Usuário(a) deve poder resetar sua senha;

**RNF**

- Utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**RN**

- O link enviado por email para resetar senha, deve expirar em 2h;
- Usuário(a) precisa confirmar a nova senha ao resetar sua senha;

# Atualização do perfil

**RF**

- Usuário(a) deve poder atualizar seu nome, email e senha;

**RN**

- Usuário(a) não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha, o(a) usuário(a) deve informar a senha antiga;
- Para atualizar sua senha, o(a) usuário(a) precisa confirmar a nova senha;

# Painel do prestador

**RF**

- Usuário(a) deve poder listar seus agendamentos de um dia específico;
- Prestador(a) deve receber uma notificação sempre que houver um novo agendamento;
- Prestador(a) deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN**

- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

# Agendamento de serviços

**RF**

- Usuário(a) deve poder listar todos prestadores de serviço cadastrados;
- Usuário(a) deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- Usuário(a) deve poder listar horários disponíveis em um dia específico de um prestador;
- Usuário(a) deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache;

**RN**

- Os agendamentos devem estar disponíveis entre 8h às 18h (Primeiro às 8h, último às 17h);
- Usuário(a) não pode agendar em um horário que já passou;
- Usuário(a) não pode agendar serviços consigo mesmo;
- Cada agendamento deve durar 1h exatamente;
- Usuário(a) não pode agendar em um horário já ocupado;
