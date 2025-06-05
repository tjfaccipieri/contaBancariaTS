import { Conta } from "../model/Conta"

export interface ContaRepository {
  // CRUD da Conta
  procurarPorNumero(numero: number): void
  listarTodas(): void // assinatura do metodo
  cadastrar(conta: Conta): void
  atualizar(conta: Conta): void
  deletar(numero: number): void 

  // Métodos Bancarios
  sacar(numero: number, valor: number): void;
  depositar(numero: number, valor: number): void;
  transferir(numeroOrigem: number, numeroDestino: number, valor: number): void;
}