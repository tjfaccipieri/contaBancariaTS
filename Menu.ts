import readlinesync from 'readline-sync';
import { colors } from './src/util/Colors';
import { ContaCorrente } from './src/model/ContaCorrente';
import { ContaPoupanca } from './src/model/ContaPoupanca';
import { ContaController } from './src/controller/ContaController';

export function main() {
  let contas: ContaController = new ContaController();
  let opcao: number, numero: number, agencia: number, tipo: number, saldo: number, limite: number, aniversario: number, valor: number, numeroDestino: number;
  let titular: string
  const tiposContas = ['Conta Corrente', 'Conta Poupanca']

  console.log("\nCriar Contas\n");

  let cc1: ContaCorrente = new ContaCorrente(contas.gerarNumero(), 123, 1, "João da Silva", 1000, 100.0);
  contas.cadastrar(cc1);

  let cc2: ContaCorrente = new ContaCorrente(contas.gerarNumero(), 124, 1, "Maria da Silva", 2000, 100.0);
  contas.cadastrar(cc2);

  let cp1: ContaPoupanca = new ContaPoupanca(contas.gerarNumero(), 125, 2, "Mariana dos Santos", 4000, 12);
  contas.cadastrar(cp1);

  let cp2: ContaPoupanca = new ContaPoupanca(contas.gerarNumero(), 125, 2, "Juliana Ramos", 8000, 15);
  contas.cadastrar(cp2);

  contas.listarTodas();

  while (true) {
    console.log(colors.fg.green, '');
    console.log('*****************************************************');
    console.log('                                                     ');
    console.log('                BANCO DO BRAZIL COM Z                ');
    console.log('                                                     ');
    console.log('*****************************************************');
    console.log('                                                     ');
    console.log('            1 - Criar Conta                          ');
    console.log('            2 - Listar todas as Contas               ');
    console.log('            3 - Buscar Conta por Numero              ');
    console.log('            4 - Atualizar Dados da Conta             ');
    console.log('            5 - Apagar Conta                         ');
    console.log('            6 - Sacar                                ');
    console.log('            7 - Depositar                            ');
    console.log('            8 - Transferir valores entre Contas      ');
    console.log('            9 - Sair                                 ');
    console.log('                                                     ');
    console.log('*****************************************************');
    console.log('                                                     ');

    console.log('Entre com a opção desejada:', colors.reset);
    opcao = readlinesync.questionInt('');

    if (opcao === 9) {
      console.log('\nBanco do Brazil com Z - O seu futuro começa aqui!');
      sobre();
      process.exit(0);
    }

    switch (opcao) {
      case 1:
        console.log('\n\nCriar Conta\n\n');
        console.log('\nDigite o número da agência: ');
        agencia = readlinesync.questionInt('')

        console.log('\nDigite o Nome do Titular da conta: ');
        titular = readlinesync.question('')

        console.log('\nDigite o tipo da conta: ');
        tipo = readlinesync.keyInSelect(tiposContas, '', {cancel: false}) + 1

        console.log('\nDigite o saldo inicial da conta: ');
        saldo = readlinesync.questionFloat('')

        switch(tipo) {
          case 1:
            console.log('\nDigite o limite inicial da conta (R$):');
            limite = readlinesync.questionFloat('')
            contas.cadastrar(new ContaCorrente(contas.gerarNumero(), agencia, tipo, titular, saldo, limite))
            break;

          case 2:
            console.log('\nDigite o dia do aniversário da Conta Poupança:');
            aniversario = readlinesync.questionInt('')
            contas.cadastrar(new ContaPoupanca(contas.gerarNumero(), agencia, tipo, titular, saldo, aniversario))
            break;
        }
        keyPress();
        break;

      case 2:
        console.log('\n\nListar todas as Contas\n\n');
        contas.listarTodas()
        keyPress();
        break;

      case 3:
        console.log('\n\nConsultar dados da Conta - por número\n\n');

        console.log('Digite o número da conta: ');
        numero = readlinesync.questionInt('')
        contas.procurarPorNumero(numero)

        keyPress();
        break;

      case 4:
        console.log('\n\nAtualizar dados da Conta\n\n');

        console.log('\nDigite o número da conta: ');
        numero = readlinesync.questionInt('')

        let conta = contas.buscarNoArray(numero);

        if(conta !== null) {
          console.log('\nDigite o número da agência: ');
          agencia = readlinesync.questionInt('')

          console.log('Digite o nome do titular da conta: ');
          titular = readlinesync.question('')

          tipo = conta.tipo

          console.log('Digite o saldo da conta (R$): ');
          saldo = readlinesync.questionFloat('')

          switch(tipo) {
            case 1:
              console.log('Digite o limite da conta (R$): ');
              limite = readlinesync.questionFloat('')
              contas.atualizar(new ContaCorrente(numero, agencia, tipo, titular, saldo, limite))
              break;
            case 2:
              console.log('Digite o dia do aniversário da conta poupança: ');
              aniversario = readlinesync.questionInt('')
              contas.atualizar(new ContaPoupanca(numero, agencia, tipo, titular, saldo, aniversario))
              break;
          }
        } else {
          console.log(`\nA conta número ${numero} não foi encontrada`);
        }
        keyPress();
        break;

      case 5:
        console.log('\n\nApagar uma Conta\n\n');

        console.log('\nDigite o número da conta: ');
        numero = readlinesync.questionInt('')
        contas.deletar(numero)

        keyPress();
        break;

      case 6:
        console.log('\n\nSaque\n\n');

        console.log('\nDigite o número da conta: ');
        numero = readlinesync.questionInt('')

        console.log('\nDigite o valor do Saque (R$): ');
        valor = readlinesync.questionFloat('')

        contas.sacar(numero, valor)

        keyPress();
        break;
      
      case 7:
      console.log('\n\nDepósito\n\n');

      console.log('Digite o número da Conta: ');
      numero = readlinesync.questionInt('')

      console.log('Digite o valor do Depósito (R$): ');
      valor = readlinesync.questionFloat('')

      contas.depositar(numero, valor)

      keyPress();
      break;
    
      case 8:
      console.log('\n\nTransferência entre Contas\n\n');

      console.log('Digite o número da conta de Origem: ');
      numero = readlinesync.questionInt('')

      console.log('\nDigite o número da conta de Destino: ');
      numeroDestino = readlinesync.questionInt('')

      console.log('\nDigite o valor da transferência (R$): ');
      valor = readlinesync.questionFloat('')

      contas.transferir(numero, numeroDestino, valor)

      keyPress();
      break;

      default:
        console.log('\nOpção Inválida!\n');
        keyPress();
        break;
    }
  }
}

function sobre(): void {
  console.log('\n*****************************************************');
  console.log('Projeto Desenvolvido por: ');
  console.log('Generation Brasil - generation@generation.org');
  console.log('github.com/conteudoGeneration');
  console.log('*****************************************************');
}

function keyPress(): void {
  console.log(colors.reset, '');
  console.log('\nPressione enter para continuar');
  readlinesync.prompt();
}

main();