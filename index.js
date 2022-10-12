const express = require("express");

const server = express();

const empregados = [
  {
    nome: "Caroline Helena",
    funcao: "Product Owner",
    salario: 6000,
  },
  {
    nome: "Matheus Porto",
    funcao: "Desenvolvedor",
    salario: 5000,
  },
  {
    nome: "Melissa Morelo",
    funcao: "Desenvolvedora",
    salario: 6000,
  },
  {
    nome: "Nayara Pratz",
    funcao: "Coordenadora do Financeiro",
    salario: 10000,
  },
  {
    nome: "Peterson Pereira",
    funcao: "Bancário",
    salario: 4000,
  },
];

server.use(express.json());

server.get("/", (req, res) => {
  let empregado = "";
  empregados.forEach((value, index) => {
    empregado += `<tr>
      <td>${index}</td>
      <td>${value.nome}</td>
      <td>${value.funcao}</td>
      <td>${value.salario}</td>
    </tr>`;
  });

  return res.send(`
    <!DOCTYPE html>
    <html>
      <body>
        <title>T1 - PS</title>
        <h1 style="text-align: center;"> Trabalho - Programação Script</h1>
        <h3 style="text-align: center;"> Segue abaixo a lista de funcionários cadastrados (<i class="metodo">Método findAll</i>):</h3>
        <table class="tabela-empregados">
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Função</th>
            <th>Salário</th>
          </tr>
          ${empregado}
        </table>
        <style>
          .tabela-empregados {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
          }
          .tabela-empregados td, .tabela-empregados th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
          }

          .tabela-empregados tr:nth-child(even) {
            background-color: #dddddd;
          }
          .metodo {
            color: #ff0000;
          }
        </style>
      </body>
    </html>
  `);
});

server.get("/:id", (req, res) => {
  const index = req.params.id;

  if (Number.isNaN(Number(index))) return;

  return res.send(`
    <!DOCTYPE html>
    <html>
      <body style="text-align: center">
        <title>T1 - PS</title>
        <h1 style="text-align: center;"> Trabalho - Programação Script</h1>
        <h3 style="text-align: center;"> Segue abaixo o usuário específico a ser filtrado (<i class="metodo">Método find</i>):</h3>
        <table class="tabela-empregados">
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Função</th>
            <th>Salário</th>
          </tr>
          <tr>
            <td>${index}</td>
            <td>${empregados[index].nome}</td>
            <td>${empregados[index].funcao}</td>
            <td>${empregados[index].salario}</td>
          </tr>
        </table>
        <style>
          .tabela-empregados {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
          }
          .tabela-empregados td, .tabela-empregados th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
          }

          .tabela-empregados tr:nth-child(even) {
            background-color: #dddddd;
          }
          .metodo {
            color: #ff0000;
          }
        </style>
      </body>
    </html>
  `);
});

server.post("/", (req, res) => {
  const empregado = req.body;
  empregados.push(empregado);

  return res.json(empregados);
});

server.put("/:id", (req, res) => {
  const index = req.params.id;
  const empregado = req.body;

  empregados[index] = empregado;

  return res.json(empregados);
});

server.patch("/:id", (req, res) => {
  const index = req.params.id;
  const empregado = req.body;

  Object.keys(empregado).forEach(
    (indexE) => (empregados[index][indexE] = empregado[indexE])
  );

  return res.json(empregados);
});

server.delete("/:id", (req, res) => {
  const index = req.params.id;

  empregados.splice(index, 1);

  return res.json(empregados);
});


server.listen(process.env.PORT || 3000);
