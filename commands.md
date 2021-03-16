## Docker

``` bash
# Listar todas as imagens/containers criados ou rodando
$ sudo docker ps -a

# Rodar um container
$ sudo docker start `id_do_container`


```


## TypeORM

``` bash

# Cria uma migration (-n: flag pra nomear).
$ yarn typeorm migration:create -n CreateAppointments

# Executa as migrations
$ yarn typeorm migration:run

# Refazer/Editar uma migration (SOMENTE SE NÃO TIVER SIDO VERSIONADA COM GIT POR EXEMPLO)
$ yarn typeorm migration:revert

# Visualizar as migrations que já foram executadas
$ yarn typeorm migration:show

```


