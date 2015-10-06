'use strict';

class Dados {
  constructor() {
    this.usuarioStorage = 'feevaleLoginUsuario';
    this.senhaStorage = 'feevaleLoginSenha';
  }

  verificarExistemDados() {
    var usuario = localStorage[this.usuarioStorage],
      senha = localStorage[this.senhaStorage];

    return (usuario != null && usuario !== '') && (senha != null && senha !== '');
  }

  salvar(usuario, senha) {
    if (usuario == null || usuario === '' || senha == null || senha === '') return false;

    localStorage[this.usuarioStorage] = usuario;
    localStorage[this.senhaStorage] = senha;

    return true;
  }

  obter() {
    if (!this.verificarExistemDados()) return null;
    return {
      usuario: localStorage[this.usuarioStorage],
      senha: localStorage[this.senhaStorage]
    };
  }
}
