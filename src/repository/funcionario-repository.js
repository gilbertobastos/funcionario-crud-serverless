const Funcionario = require("../model/funcionario-model.js");

class FuncionarioRepository {
  /**
   * @param {AWS.DynamoDB}
   */
  constructor(awsDocumentClient) {
    this._awsDocumentClient = awsDocumentClient;
  }

  async getFuncionarios() {
    return await this._awsDocumentClient.get({
      TableName: 'funcionario-crud-funcionario'
    }).data;
  }

  async getFuncionarioById(id) {
    return await this._awsDocumentClient.get({
      TableName: 'funcionario-crud-funcionario',
      Key: {
        "id": id
      }
    }).data;
  }

  async addFuncionario(funcionario) {
    this._awsDocumentClient.putItem({
      TableName: 'funcionario-crud-funcionario',
      Item: funcionario
    });
  }

  async updateFuncionario(funcionario) {}

  async deleteFuncionario(id) {}
}

module.exports = FuncionarioRepository;
