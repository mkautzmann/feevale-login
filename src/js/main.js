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
        let informacoes = dados.obter(function(informacoes) {
          login.inserirDados(informacoes.usuario, informacoes.senha);
        });
      }
      else if (login.verificarDirecionamentoDestino(tab.url)) {
        login.fecharTab();
      }
    });
  };

  var dados = new Dados(),
    feevaleLogin = new FeevaleLogin();
  dados.verificarExistemDados(function(existemDados) {
    if (!existemDados) return;
    logar(feevaleLogin, dados);
  });
}());
