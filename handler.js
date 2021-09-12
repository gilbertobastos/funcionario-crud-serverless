const Funcionario = require("./src/model/funcionario-model.js");
const FuncionarioRepository = require("./src/repository/funcionario-repository.js");

const AWS = require("aws-sdk");
AWS.config.update({ region: "sa-east-1" });

const DynamoDB = new AWS.DynamoDB();
const funcionarioRepository = new FuncionarioRepository(DynamoDB);

module.exports.getFuncionario = async function (event) {
  try {
    const id = parseInt(event.pathParameters.id);
    if (isNaN(id) || typeof id !== "number") {
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
    if (
      !typeof event.body.idade === "number" ||
      !typeof event.body.nome === "string" ||
      !typeof event.body.cargo === "string"
    ) {
      throw new Error("Invalid values for creating the item.");
    }

    const funcionario = new Funcionario(
      event.body.idade,
      event.body.nome,
      event.body.cargo
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

// module.exports.hello = async (event) => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify(
//       {
//         message: 'Go Serverless v1.0! Your function executed successfully!',
//         input: event,
//       },
//       null,
//       2
//     ),
//   };

//   // Use this code if you don't use the http event with the LAMBDA-PROXY integration
//   // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
// };
