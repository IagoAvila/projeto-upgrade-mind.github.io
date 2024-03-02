document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.querySelector('.menu-icon');
    const menu = document.querySelector('.menu');
  
    menuIcon.addEventListener('click', function () {
      menu.classList.toggle('show');
    });
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    var header = document.getElementById("header");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) { // Ajuste a altura conforme necessário
            header.classList.add("fixed");
        } else {
            header.classList.remove("fixed");
        }
    });
});
function mostrarTexto(id) {
    const elemento = document.getElementById(id);
    
    if (elemento.style.display === 'block') {
        elemento.style.display = 'none';
    } else {
        // Esconde todos os outros textos
        ocultarTodosTextos();
        elemento.style.display = 'block';
    }
}

function ocultarTodosTextos() {
    const textos = document.querySelectorAll('[id^="textoAdicional"]');
    textos.forEach(texto => {
        texto.style.display = 'none';
    });
}

function enviarFormulario(event) {
    event.preventDefault();

    // Aqui você pode adicionar lógica para enviar os dados para um servidor
    // Exemplo: use Fetch API para enviar os dados para um endpoint no servidor
    // e trate a resposta conforme necessário.
    
    // Exemplo:
    // fetch('/endpoint-do-servidor', {
    //     method: 'POST',
    //     body: new FormData(document.getElementById('formContato'))
    // })
    // .then(response => response.json())
    // .then(data => {
    //     console.log('Resposta do servidor:', data);
    // })
    // .catch(error => {
    //     console.error('Erro ao enviar dados:', error);
    // });
}





const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/enviar-dados', (req, res) => {
    const dadosFormulario = req.body;
    console.log('Dados do formulário recebidos:', dadosFormulario);

    // Configuração do nodemailer (substitua com suas próprias configurações)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'seu-email@gmail.com', // Substitua pelo seu e-mail
            pass: 'sua-senha' // Substitua pela sua senha
        }
    });

    // Conteúdo do e-mail
    const conteudoEmail = `
        Nome: ${dadosFormulario.nome}
        Telefone: ${dadosFormulario.telefone}
        Assunto: ${dadosFormulario.assunto}
        Email: ${dadosFormulario.email}
    `;

    // Configurações do e-mail
    const opcoesEmail = {
        from: 'seu-email@gmail.com', // Substitua pelo seu e-mail
        to: 'iagoavilabat@gmail.com', // Substitua pelo e-mail de destino
        subject: 'Novo Formulário de Contato',
        text: conteudoEmail
    };

    // Envie o e-mail
    transporter.sendMail(opcoesEmail, (erro, info) => {
        if (erro) {
            console.error('Erro ao enviar e-mail:', erro);
            res.status(500).json({ mensagem: 'Erro ao enviar e-mail' });
        } else {
            console.log('E-mail enviado:', info.response);
            res.json({ mensagem: 'Dados recebidos e e-mail enviado com sucesso!' });
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor está rodando em http://localhost:${port}`);
});

