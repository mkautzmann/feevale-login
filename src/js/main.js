(function () {
  'use strict';

  var logar = function logar(login, dados) {
    login.criarTab([
      {
        status: 'complete',
        testUrl: login.verificarDirecionamento
      },
      {
        status: 'loading',
        testUrl: login.verificarDirecionamentoDestino
      }
    ], function (tab) {
      if (tab === null) return;

      if (login.verificarDirecionamento(tab.url)) {
        let informacoes = dados.obter();
        login.inserirDados(informacoes.usuario, informacoes.senha);
      }
      else if (login.verificarDirecionamentoDestino(tab.url)) {
        login.fecharTab();
      }
    });
  };

  var dados = new Dados(),
    feevaleLogin = new FeevaleLogin();
  if (dados.verificarExistemDados()) {
    logar(feevaleLogin, dados);
  }
  else {
    document.getElementById('salvar').addEventListener('click', function () {
      var usuario = document.getElementById('usuario'),
        senha = document.getElementById('senha');

      if (usuario !== '' && senha !== '') {
        dados.salvar(usuario.value, senha.value);
        logar(feevaleLogin);
      }

      return false;
    });
  }
}());
