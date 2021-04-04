# Esse arquivo terá detalhamentos sobre a estrutura do projeto `backendGoBarber`

    A aplicação está divida em duas camadas, a de domínio e a de infra

    A de domínio é aonde fica a regra de negócio da aplicação. A de infra, como se comunica com as dependências, ferramentas...

# Estrutura de algumas pastas

## Pasta **@types**

A pasta **@types** dentro de **src** tem responsabilidade de redeclarar tipos de bíbliotecas instaladas na aplicação

## Pasta **config**

A pasta **config** dentro de **src** é responsável pelos arquivos de configuração

## Pasta **modules**

A pasta **modules** dentro de **src**, será responsável por ter os módulos da aplicação.
Assim reduzindo a quantidade de arquivo que outras pastas teriam, sem ter ligação como o módulo em si.
Levando essa responsabilidade para dentro do repositório responsável,
ex: _Pasta Appointments, terá os services(que são os arquivos responsáveis pela regra de negócio),
os controllers e as entities(que seria o "model")._

## Pasta **shared**

A pasta **shared** dentro de **src**, tem como função compartilhar informações.
Informações que os dois módulos(User, Appointments) utilizam;

## Pasta **infra**

A pasta **infra** dentro de **src** > **shared**, e tbm no **modules**, será responsável por armazenar informações de vários pacotes/bibliotecas (coisas que podem mudar, tipo o banco de dados)

## Pasta **typeorm**

Pasta relacionada com a base de dados.

## Pasta **http**

A pasta **infra** dentro de **src** > **shared** > **infra**, será arquivos que se comunicam com o cliente final através de http

## Pastas **controllers**

As pastas **controller** dentro dos **modules** > **infra** > **typeorm**, são "controllers" que representam o typeorm em si, se um dia mudar de sql pra nosql por exemplo, a alteração virá somente nesse arquivo e não terei que mudar regras dentro da aplicação, como métodos que já foram definidos

## Pasta **controller** da raiz do infra

Somente terá uma interface que diz quais será os métodos que não poderão ser diferente, independente do typeorm ou banco de dados que tiver usando.
