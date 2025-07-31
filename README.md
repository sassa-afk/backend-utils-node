👋 Olá , eu sou o Samuel Souto dos Santos / @sassa-afk 👀 ..
- Sou estudante de Sistemas de Informação e desenvolvedor em formação, com projetos voltados à aplicação prática dos conhecimentos adquiridos tanto na graduação quanto na experiência de trabalho.
- Atualmente estudo e crio projetos com intenção aplicar meus conhecimentos passados ao longo de minha experiência academica e no mercado de trabalho 
- 📫 Você consegue chegar até mim através do email samuelsouto21@gmail.com .

# Backend Utils Node Js
 

Esté é um projeto integrado que reúne diversas APIs úteis desenvolvido com o serviço node.js atraves de apis que desenvolvidas e aplicadas em trabalhos freelance. O objetivo foi centralizar e facilitar a comunicação com serviços externos por meio de uma estrutura em Node.js.

Serviços integrados:

- **Nodemailer** (Envio de e-mails, uso confirmado para caixa de mail GMAIL)
- **Google Calendar** API (agendamento de eventos)
- **OCR API** (leitura de texto a partir de imagens)
 
 Esse projeto demonstra minha habilidade em consumir e integrar APIs, construir middlewares personalizados e automatizar processos em aplicações Node.js.

**ℹ️ Observação:**
As rotas descritas neste projeto estão disponíveis na documentação Swagger hospedada no serviço web Render.

Sinta-se à vontade para testar a aplicação! Porém, vale lembrar que o servidor utiliza o plano gratuito da Render, o que ativa a funcionalidade de "sleep mode" — ou seja, o servidor entra em repouso quando não há requisições por um tempo.

Por isso, o primeiro acesso após um período inativo pode levar alguns segundos a mais para carregar. Após isso, as requisições funcionam normalmente. 

**Link swagger das apis construidas :**
	  https://sendmesage.onrender.com/api-docs/#/

# Estrutra do projeto 

	│
	├── package.json
	├── public
	│   ├── Calender.js
	│   ├── Default.js
	│   ├── index.js
	│   ├── Mail.js
	│   ├── OCRSpace.js
	│   ├── swagger.js
	│   └── SwgDoc.js
	└── README.md

---

# Tecnologias e middlewares Node.js utilizados no projeto

- **express** – Framework para criação do servidor HTTP.
- **cors** – Middleware para habilitar CORS (Cross-Origin Resource Sharing).
- **dotenv** – Carrega variáveis de ambiente a partir de um arquivo `.env`.
- **body-parser** – Faz o parsing do corpo das requisições (JSON, URL-encoded).
- **jsonwebtoken** – Geração e verificação de tokens JWT.
- **nodemailer** – Envio de e-mails via SMTP.
- **googleapis** – Integrações com APIs do Google (ex: Google Calendar).
- **axios** – Cliente HTTP para requisições externas.
- **form-data** – Manipulação de dados no formato `multipart/form-data`.
- **multer** – Middleware para upload de arquivos.
- **mime-types** – Detecta o tipo MIME de arquivos.
- **swagger-jsdoc** – Geração da documentação Swagger a partir de comentários JSDoc.
- **swagger-ui-express** – Interface web para visualização da documentação Swagger.

---

# Como adquirir token de autenticação de permições das apis do google ?
>
>**Senha de acesso  Gmail para enviar e-mails**
>
---
 https://support.google.com/accounts/answer/185833?hl=pt-BR
---
>
>**Auth2 Google Calender**
>
---
[ https://support.google.com/accounts/answer/185833?hl=pt-BR
](https://developers.google.com/identity/protocols/oauth2?hl=pt-br)
---

>**Token de Auth do ORCSpace**
>
> 1 - Acesse a página de registro em ocr.space/ocrapi
>
> 2 - Insira seu e-mail (nome é opcional) e finalize o cadastro
>
>3 - Você receberá por e-mail sua API key (token de acesso) imediatamente
>
>4 - Acesse a documentação com exemplos de uso da chave em diferentes linguagens
>
---
https://ocr.space/ocrapi
---
