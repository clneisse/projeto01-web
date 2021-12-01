export const AppRoutes = {
  Login: {
    base: () => "login",    
  },
  Fornecedores: {
    base: () => "fornecedores",
    Cadastro: () => { return AppRoutes.Fornecedores.base() + "/cad-fornecedor" },
  },
  Responsaveis: {
    base: () => "responsaveis",
    Cadastro: () => { return AppRoutes.Responsaveis.base() + "/cad-responsavel" },
  },
  Grupos: {
    base: () => "grupos",
    Cadastro: () => { return AppRoutes.Grupos.base() + "/cad-grupo" },
  },
  FormaPagamento: {
    base: () => "forma-pagamento",
    Cadastro: () => { return AppRoutes.FormaPagamento.base() + "/cad-forma-pagamento" },
  },
  Produto: {
    base: () => "produtos",
    Cadastro: () => { return AppRoutes.Produto.base() + "/cad-produto" },
  },
  Orcamento: {
    base: () => "orcamentos",
    Cadastro: () => { return AppRoutes.Orcamento.base() + "/cad-orcamento" },
  },
  Usuarios: {
    base: () => "usuarios",
    Cadastro: () => { return AppRoutes.Usuarios.base() + "/cad-usuario" },
  },
};