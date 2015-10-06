(function(chrome) {
  'use strict';

  var inserirInformacoesNoForm = function inserirInformacoesNoForm(usuario, senha) {
    var inputUsuario = document.getElementById('user_name'),
      inputSenha = document.getElementById('user_pwd');

    if (inputUsuario == null || inputSenha == null) return false;

    inputUsuario.value = usuario;
    inputSenha.value = senha;
    return true;
  };

  chrome.runtime.onMessage.addListener(function (request, sender, callback) {
    var form = document.getElementById('Login');
    if (form == null) return;

    if (inserirInformacoesNoForm(request.usuario, request.senha)) {
      form.submit();
    }
  });
}(chrome));
