class Transacao {
    static transferencia(contaOrigem,contaDestino,idTransacao,dataTransacao,valorTransferencia){
        if(contaOrigem.saldo >= valorTransferencia){
            contaOrigem.historico.push({
                idTransacao: idTransacao,
                dataTransacao: dataTransacao,
                valorTransferencia: valorTransferencia,
                tipo: "pagamento"
            })
            contaDestino.historico.push({
                idTransacao: idTransacao,
                dataTransacao: dataTransacao,
                valorTransferencia: valorTransferencia,
                tipo: "recebimento",
            })
            contaOrigem.saldo -= valorTransferencia
            contaDestino.saldo += valorTransferencia

            return { mensagem: "Transferência realizada com sucesso!" }
        }
        return { mensagem: "Saldo insuficiente para transferência!" }
    }
    static deposito(contaDestino,idDeposito,dataDeposito,valorDeposito){
        contaDestino.saldo += valorDeposito
        contaDestino.historico.push({
            idDeposito: idDeposito,
            dataDeposito: dataDeposito,
            valorDeposito: valorDeposito,
            tipo: "recebimento",
          })
          return { mensagem: "Depósito realizado com sucesso!" }
    }
    static pagamentoSalario(contaOrigem,contaDestino,idPagamento,dataPagamento,valorSalario){
        if(contaOrigem instanceof PessoaFisica && valorSalario > 1000){
            return {
                mensagem: "Seu limite máximo para este tipo de operação é de 1000. Entre em contato com o banco."
              }
        }
        if(contaOrigem.saldo < valorSalario){
            return {
                mensagem: "Saldo insuficiente para realizar o pagamento!"
              }
        }
        contaDestino.saldo += valorSalario
        contaOrigem.saldo -= valorSalario

        contaDestino.historico.push({
            idPagamento: idPagamento,
            dataPagamento: dataPagamento,
            valorSalario: valorSalario,
            tipo: "recebimento",
          })
          contaOrigem.historico.push({
            idPagamento: idPagamento,
            dataPagamento: dataPagamento,
            valorSalario: valorSalario,
            tipo: "pagamento"
          })
          return { mensagem: "Pagamento realizado com sucesso!" }
    }
}