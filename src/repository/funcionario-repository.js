const Funcionario = require("../model/funcionario-model.js");

class FuncionarioRepository {
  /**
   * @param {AWS.DynamoDB}
   */
  constructor(DynamoDB) {
    this.DynamoDB = DynamoDB;
  }

  async getFuncionarios() {
    const data = await this.DynamoDB.scan({
      TableName: "funcionario-crud-funcionario",
    }).promise();

    return data;
  }

  async getFuncionarioById(id) {
    const data = await this.DynamoDB.getItem({
      TableName: "funcionario-crud-funcionario",
      Key: { id: { S: id } },
    }).promise();

    return data;
  }

  async addFuncionario(funcionario) {
    await this.DynamoDB.putItem({
      TableName: "funcionario-crud-funcionario",
      Item: {
        id: { S: funcionario.id },
        nome: { S: funcionario.nome },
        cargo: { S: funcionario.cargo },
        idade: { N: funcionario.idade.toString() },
      }    
    }).promise();
  }

  async deleteFuncionario(id) {
    await this.DynamoDB.deleteItem({
      TableName: "funcionario-crud-funcionario",
      Key: {
        id: id,
      },
    }).promise();
  }

  async updateFuncionario(funcionario) {}
}

module.exports = FuncionarioRepository;
