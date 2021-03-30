## Docker

``` bash
# Listar todas as imagens/containers criados ou rodando
$ sudo docker ps -a

# Criar um container(database)
$ sudo docker run --name `nome_container` -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

# Rodar um container
$ sudo docker start `id_do_container` ou `nome_container`

# Parar todos os container que estão rodando na máquina
$ sudo docker stop $(docker ps -a -q)

```


## TypeORM

``` bash

# Cria uma migration (-n: flag pra nomear).
$ yarn typeorm migration:create -n CreateAppointments

# Executa as migrations
$ yarn typeorm migration:run

# Refazer/Editar uma migration (SOMENTE SE NÃO TIVER SIDO VERSIONADA COM GIT POR EXEMPLO)
$ yarn typeorm migration:revert

  # Caso uma migration tiver sido versionada e já estiver em uso teremos que criar uma nova, pra assim ser considerada
  $ yarn typeorm migration:create -n EX: AlterProviderFieldToProviderId # mas tem que se atentar pq será uma migration de alteração, não de criação de uma nova tabela

# Visualizar as migrations que já foram executadas
$ yarn typeorm migration:show

```


