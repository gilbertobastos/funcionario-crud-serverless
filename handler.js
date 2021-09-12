const Funcionario = require("./src/model/funcionario-model.js");
const FuncionarioRepository = require("./src/repository/funcionario-repository.js");

const AWS = require("aws-sdk");
AWS.config.update({ region: "sa-east-1" });

const DynamoDB = new AWS.DynamoDB();
const funcionarioRepository = new FuncionarioRepository(DynamoDB);

module.exports.getFuncionario = async function (event) {
  try {
    const id = event.pathParameters.id;
    if (typeof id !== "string") {
      throw new Error("Invalid id!");
    }
    
    const functionario = await funcionarioRepository.getFuncionarioById(id);

    return {
      statusCode: 200,
      body: JSON.stringify(functionario),
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: err.message,
      }),
    };
  }
};

module.exports.deleteFuncionario = async function (event) {
  try {
    const id = event.pathParameters.id;
    if (typeof id !== "string") {
      throw new Error("Invalid id!");
    }

    await funcionarioRepository.deleteFuncionario(id);
    return {
      statusCode: 200,
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: err.message,
      }),
    };
  }
};

module.exports.getAllFuncionarios = async function (event) {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify(funcionarioRepository.getFuncionarios()),
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: err.message,
      }),
    };
  }
};

module.exports.addFuncionario = async function (event) {
  try {
    const body = JSON.parse(event.body);

    if (
      !typeof body.idade === "number" ||
      !typeof body.nome === "string" ||
      !typeof body.cargo === "string"
    ) {
      throw new Error("Invalid values for creating the item.");
    }

    const funcionario = new Funcionario(
      body.idade,
      body.nome,
      body.cargo
    );

    funcionarioRepository.addFuncionario(funcionario);
    return { statusCode: 201 };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: err.message,
      }),
    };
  }
};
