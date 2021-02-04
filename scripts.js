const Modal = {
  open() {
    //Abrir Modal
    //Adicionar a classe ao Modal!
    document
      .querySelector('.modal-overlay')
      .classList
      .add('active')
  },
  close() {
    //Fechar Modal
    //Remover a classe active do Modal!
    document
      .querySelector('.modal-overlay')
      .classList
      .remove('active') //Pesquisar outra forma de modal com "toogle"
  }
}

const transactions = [
  {
    id: 1,
    description: 'Luz',
    amount: -50001,
    date: '02/02/2021',
  },
  {
    id: 2,
    description: 'Website',
    amount: 500000,
    date: '02/02/2021',
  },
  {
    id: 3,
    description: 'Internet',
    amount: -20012,
    date: '02/02/2021',
  },
  {
    id: 4,
    description: 'App',
    amount: 200000,
    date: '02/02/2021',
  },
]

/*Eu preciso somar as entradas, depois somar as saídas 
  e remover das entradas o valor das saídas, obtendo o total 
*/
const Transaction = {
  all: transactions,
  add(transaction){
    Transaction.all.push(transaction)

    console.log(transaction)

  },

  incomes() {
    let income = 0;
    //pegar todas as transações
    //para cada transação,
    Transaction.all.forEach((transaction) => {
      //se ela for maior que 0
      if (transaction.amount > 0) {
        //somar a uma variável e retornar a variável
        income += transaction.amount;
      }
    })
    return income;
  },

  expenses() {
    let expense = 0;
    //pegar todas as transações
    //para cada transação,
    Transaction.all.forEach((transaction) => {
      //se ela for menor que 0
      if (transaction.amount < 0) {
        //somar a uma variável e retornar a variável
        expense += transaction.amount;
      }
    })
    return expense
  },

  total() {
    return Transaction.incomes() + Transaction.expenses()
  }
}

/*Agora eu preciso pegar as minhas transações do meu objeto
e colocar lá no meu HTML 
ou melhor substituir os dados do HTML com os dados do JS*/

const DOM = {
  transactionsContainer: document.querySelector('#data-table tbody'),

  addTransaction(transaction, index) {
    const tr = document.createElement('tr')
    tr.innerHTML = DOM.innerHTMLTransaction(transaction)

    DOM.transactionsContainer.appendChild(tr)

  },
  innerHTMLTransaction(transaction) {

    const CSSclass = transaction.amount > 0 ? "income" : "expense"

    const amount = Utils.formatCurrency(transaction.amount)

    const html = `
        <td class="description"> ${transaction.description}</td>
        <td class=${CSSclass}> ${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
        <img src="./assets/minus.svg" alt="Remover transação">
        </td>
    `
    return html
  },

  updateBalance() {
    document
      .getElementById('incomeDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.incomes())
    document
      .getElementById('expenseDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.expenses())
    document
      .getElementById('totalDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.total())
  }
}

const Utils = {
  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : ""

    value = String(value).replace(/\D/g, "")

    value = Number(value) / 100

    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })

    return signal + value
  }
}

transactions.forEach(function (transaction) {
  DOM.addTransaction(transaction)
})

DOM.updateBalance()

Transaction.add({
  id: 39,
  description: 'Eu',
  amount: 200,
  date: '03/02/2021'
})