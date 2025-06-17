👋 Olá , eu sou o Samuel Souto dos Santos / @sassa-afk 👀 ..
- Sou estudante de Sistemas de Informação e desenvolvedor em formação, com projetos voltados à aplicação prática dos conhecimentos adquiridos tanto na graduação quanto na experiência de trabalho.
- Atualmente estudo e crio projetos com intenção aplicar meus conhecimentos passados ao longo de minha experiência academica e no mercado de trabalho 
- 📫 Você consegue chegar até mim através do email samuelsouto21@gmail.com .

# Backend Utils Node
 

 Api proxy é um projeto misto de varias apis usuáis no quais apliquei em alguns trabalhos freelance  com interações  alguns serviços no node, sendo eles 

é um projeto integrado que reúne diversas APIs úteis, desenvolvidas e aplicadas em trabalhos freelance. O objetivo foi centralizar e facilitar a comunicação com serviços externos por meio de uma estrutura em Node.js.

Serviços integrados:

- Nodemailer (Envio de e-mails, uso confirmado para caixa de mail GMAIL)
- Google Calendar API (agendamento de eventos)
- OCR API (leitura de texto a partir de imagens)
 
 Esse projeto demonstra minha habilidade em consumir e integrar APIs, construir middlewares personalizados e automatizar processos em aplicações Node.js.

**OBS :** Este projeto projeto está ativo no serviço Render

-- Link swagger das apis construidas :  https://sendmesage.onrender.com/api-docs/#/
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