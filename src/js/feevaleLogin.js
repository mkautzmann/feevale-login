'use strict';

class FeevaleLogin {
  get feevaleUrl() {
    return 'https://authportal.feevale.br/net-auth.php?&hwc_ip=10.100.0.146&hwc_port=32768&token=oTn2ePW2AqpRE8CWP2PwUA!!';
  }

  verificarDirecionamento(url) {
    return url.indexOf('https://authportal.feevale.br') > -1;
  }

  verificarDirecionamentoDestino(url) {
    return url.indexOf('http://www.feevale.br/') > -1;
  }

  criarTab(urlStateCallback, callback) {
    var self = this;

    chrome.tabs.onUpdated.addListener(function onUpdatedTabCallback(tabId, informacoes, tab) {
      if (self.tabId == null || tabId !== self.tabId) return;

      {
        let i = 0,
          urlStatesLength = urlStateCallback.length;

        for (; i < urlStatesLength; i++) {
          if (informacoes.status !== urlStateCallback[i].status) continue;
          if (urlStateCallback[i].testUrl(tab.url)) callback(tab);
        }
      };
    });

    chrome.tabs.create({url: this.feevaleUrl, active: false}, function criarTabCallback(tab) {
      self.tabId = tab.id;
    });
  }

  inserirDados(usuario, senha) {
    chrome.tabs.sendMessage(this.tabId, {
      usuario: usuario,
      senha: senha
    });
  }

  fecharTab() {
    if (this.tabId == null) return;

    chrome.tabs.remove(this.tabId);
  }
}
