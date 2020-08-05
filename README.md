# Teste Sebastian Gonzalez

## **Desenvolver um coletor capaz de buscar uma lista de produtos**

- Use **yarn install** para adicionar as dependências


- Use **yarn start** para iniciar

- Use **yarn dev** para iniciar o modo de desenvolvimento

- Use **yarn secure-mode** para iniciar os testes (jest --watch)

- Use **yarn test** para iniciar os testes

- Pode usar o endpoint **/mlpags** que recebe um JSON por Ex. (´´´{"search": "mdr7506", "limit": 10}´´´), via POST, e ele devolve o numero limit de produtos sobre cadeado

- Pode usar o endpoint **/scraping** que recebe um JSON por Ex. (´´´{"search": "cadeado"}´´´),, via POST. e ele devolve os produtos da primeira página


## Como alternativa pode usar **Curl** para testar

```
curl -H "Content-Type: application/json" -X POST --data '{"search": "mdr7506", "limit": 60 }' http://localhost:3000/mlpags 
curl -H "Content-Type: application/json" -X POST --data '{"search": "cadeado"}' http://localhost:3000/scraping 
```


## Jornada - Observações

- Foi a minha primeira vez em usar ferramentas de Sraping e Crowling para JavaScript; eu já tinha usado o Python então eu já tinha uma ideia de como funcionam na teorìa as técnicas para raspagem de dados.

- Estudando na rede para fazer a escolha da ferramenta certa sobre a raspagem, segundo o artigo [Advanced Web Scraping Tactics link](https://www.pluralsight.com/guides/advanced-web-scraping-tactics-python-playbook); Eu reparei que a primeira coisa a se fazer para obter informação seria procurar a API do Mercado Livre (ML), então achei a (API do ML link)[https://developers.mercadolivre.com.br/pt_br/api-docs-pt-br], que seria o jeito mais obvio de obter as informações, e **essa seria a primeira solução**.

- Supondo que **não temos um API disponivel**, analizei as requisições do site e o funcionamento por ex. as urls, como funcionam os links dos botões, por ex o botão da seguinte página.

- Como ML funciona de um jeito bem simples com requisições, minha escolha da ferramenta certa foi o cheerio entre outros (got, jsdom, puppeteer, dramaturgo) por simples e útil no propósito e a ampla documentação. 

- Como alternativas para coletar vários itens em várias páginas do ML atè completar o número de itens da requisição,  eu pensei em duas soluções das quais eu só implementei a primeira:  

1. Capturar os itens da primeira página: e **coletar o link da página siguiente**; em seguida entra num loop onde se ainda não completou o **limit** então chama a siguiente pagina e coleta os itens e o novo link da página siguiente. O loop fecha quando terminar de coletar o **limit** ou se não houver mais páginas para coletar.

2. A segunda solução seria requisitar várias páginas em paralelo atè chegar ao número **limit** desejado, mas teria que chama página siguiente se ainda não completou o  valor **limit**.

3. Uma outra solução seria combinar as duas soluções anteriores.

- Sobre a arquitetura, daria para usar um, index.js e rodar o Servidor e o Coletor aí, mas preferi usar uma arquitetura projetada para ser escalada e compartilhada com outros programadores então criei uma estrutura assim:


## Mapa
```
__tests__
│
└───app.spec.js ...............# TDD app
└───mlpags.spec.js ...............# TDD mplpags
└───mlthread.spec.js ...............# TDD mlthreads
src
└───app.js ...............# Configurações, Middlewares, Classe app, (Porta **3000** ou .env, usa morgan)
└───server.js ...............# Server para iniciar o app porta 
└───api             
  └───controllers ...............# Funções da controllers do express route
    └───mlpags ...............# **Endpoint** Recebe, via POST, o JSON: Ex. {"search": "cadeado" }
    └───scraping ...............# **Endpoin+** Recebe, via POST, o JSON: Ex. {"search": "mdr7506", "limit": 60 }
    └───mlthread ...............# **Endpoint** Recebe, via POST, o JSON: Ex. {"search": "cadeado", "limit": 10 }
└───config ...............# Middlewares
└───erros ...............# Erros ValidationError
└───routes ...............# Definição de rotas express
  └───index ...............# routes.post('/mlpags' para mlpags, routes.post('/search'... para scraping, e .get('/'... para index, 
```


