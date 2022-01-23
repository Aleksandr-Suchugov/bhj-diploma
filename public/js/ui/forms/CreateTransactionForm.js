/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const dropdownList = document.getElementById('expense-accounts-list');
    const data = User.current();
    Account.list( data, (err, response) => { 
      console.log('ответ от Account.list - CreateTransactionForm: ', response);
      dropdownList.insertAdjacentHTML('beforeend', `<option value="${response.id}">${response.name}</option>`)
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response.success) {
        console.log('CreateTransactionForm.onSubmit(data): ', data);
        document.forms['createAccount'].addEventListener('submit', (ev) => {
          ev.preventDefault();
          const form = ev.currentTarget;
          form.reset();
        });        
        App.getModal('createAccount').close();
        App.update();
      }
    });
  }
}