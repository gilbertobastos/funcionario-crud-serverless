const Funcionario = require("../model/funcionario-model.js");

class FuncionarioRepository {
  /**
   * @param {AWS.DynamoDB}
   */
  constructor(DynamoDB) {
    this.DynamoDB = DynamoDB;
  }

  async getFuncionarios() {
    return await this.DynamoDB.scan({
      TableName: 'funcionario-crud-funcionario'
    });
  }

  async getFuncionarioById(id) {
    return await this.DynamoDB.scan({
      TableName: 'funcionario-crud-funcionario',
      Key: {
        "id": id
      }
    });
  }

  async addFuncionario(funcionario) {
    console.log(this.DynamoDB);
    await this.DynamoDB.putItem({
      TableName: 'funcionario-crud-funcionario',
      Item: funcionario
    });
  }

  async updateFuncionario(funcionario) {}

  async deleteFuncionario(id) {}
}

module.exports = FuncionarioRepository;
