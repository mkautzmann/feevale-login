class Dados {
  verificarExistemDados(callback) {
    'use strict';

    chrome.storage.sync.get({
      usuario: null,
      senha: null
    }, function obterStorageCallback(itens) {
      var existemDados = ((itens.usuario !== null && itens.usuario !== '') && (itens.senha !== null && itens.senha !== ''));
      callback(existemDados);
    });
  }

  salvar(usuario, senha, callback) {
    'use strict';

    if (usuario === null || usuario === '' || senha === null || senha === '') return false;

    callback = callback || function() {};

    usuario = btoa(usuario);
    senha = btoa(senha);
    chrome.storage.sync.set({
      usuario: usuario,
      senha: senha
    }, callback);

    return true;
  }

  obter(callback) {
    'use strict';

    this.verificarExistemDados(function(existemDados) {
      if (!existemDados) callback(null);

      chrome.storage.sync.get({
        usuario: null,
        senha: null
      }, function obterStorageCallback(itens) {
        callback({
          usuario: atob(itens.usuario),
          senha: atob(itens.senha)
        });
      });
    });
  }
}
