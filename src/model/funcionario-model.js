class Funcionario {
  constructor(idade, nome, cargo, id) {
    this.idade = idade;
    this.nome = nome;
    this.cargo = cargo;
    this.id = id || (new Date());
  }
}

module.exports = Funcionario;