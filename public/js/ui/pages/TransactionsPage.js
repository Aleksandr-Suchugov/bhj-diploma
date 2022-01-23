/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if (!element) {
      throw new Error("Невалидное значение для TransactionsWidget"); 
    }
    this.element = element;
    this.registerEvents();
    this.lastOptions;
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render();
    /*В случае, если метод render() был ранее вызван с какими-то опциями, при вызове update() эти опции необходимо передать повторно <- каким образо это можно проверить?*/
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    const deleteBtns = document.querySelectorAll('button.btn-danger');
    deleteBtns.forEach(button => {
      button.addEventListener('click', (ev) => {
        ev.preventDefault();
        if (button.classList.contains('remove-account')) {
          TransactionsPage.removeAccount();
        }
        else if (button.classList.contains('transaction__remove')) {
          TransactionsPage.removeTransaction(button.dataset.id);
        }
      });
    });
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets(),
   * либо обновляйте только виджет со счетами
   * для обновления приложения
   * */
  removeAccount() {
    if (this.lastOptions) {
      if (window.confirm('Вы действительно хотите удалить счет и все связанные транзакции?')) {
        TransactionsPage.clear();
        Account.remove(null, callback => {
          if (callback.success) {
            App.getWidget("accounts").update();
          }
        })
      }
    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction( id ) {
    if (window.confirm('Вы действительно хотите удалить эту транзакцию?')) {
      Transaction.remove(id, callback => {
        if (callback.success) {
          App.getWidget("accounts").update();
        }
      })
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options){
    if (options) {
      /*Для работы метода update следует сохранить options в свойство lastOptions. <- св-во какого класса?*/
      this.lastOptions = options;
      Account.get(options, callback => {
        if (callback.success) {
          TransactionsPage.renderTitle(options.name);
        }
      });
      /*список доходов и расходов пользователя <- каким образом получить/откуда? */
      Transaction.list(this.element, callback => {
        if (callback.success) {
          TransactionsPage.renderTransactions(this.element);
        }
      })
    }
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    TransactionsPage.renderTransactions();
    TransactionsPage.renderTitle('Название счёта');
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name){
    document.querySelector('.content-title').textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date){
    (new Intl.DateTimeFormat('ru-RU', {dateStyle: 'long', timeStyle: 'short'}).format(date)).replace(',', ' в');
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item){
    `<div class="transaction ${item.type === 'income' ? 'transaction_income' : 'transaction_expense'} row">
      <div class="col-md-7 transaction__details">
        <div class="transaction__icon">
            <span class="fa fa-money fa-2x"></span>
        </div>
        <div class="transaction__info">
          <h4 class="transaction__title">Новый будильник</h4>
          <div class="transaction__date">${TransactionsPage.formatDate(item.created_at)}</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="transaction__summ">
          ${item.sum} <span class="currency">₽</span>
        </div>
      </div>
      <div class="col-md-2 transaction__controls">
        <button class="btn btn-danger transaction__remove" data-id="${item.id}">
          <i class="fa fa-trash"></i>  
        </button>
      </div>
    </div>`
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data){
    const trnzList = document.querySelector('.content');
    if (data) {
      data.forEach(obj => trnzList.insertAdjacentHTML('beforeend', TransactionsPage.getTransactionHTML(obj)));   
    }
    else {
      trnzList.children.forEach(element => element.remove());
    }
  }
}