(function(dados) {
  dados.obter(function(informacoes) {
    var usuario = document.getElementById('usuario');
    if (informacoes === null || informacoes.usuario === null) return;

    usuario.value = informacoes.usuario;
  });

  document.getElementById('salvar').addEventListener('click', function() {
    var usuario = document.getElementById('usuario').value,
      senha = document.getElementById('senha').value;

    if (usuario === '' || senha === '') return;

    dados.salvar(usuario, senha, function() {
      alert('Dados salvos com sucesso!');
    });
  });
}(new Dados()));
