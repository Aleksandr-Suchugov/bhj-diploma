/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  constructor() {
    this.URL = '/account';
  }
  /**
   * Получает информацию о счёте
   * */
  static get(id = '', callback){
    createRequest({
      url: `${this.URL}/${id}`,
      method: 'GET',
      callback: (err, response) => callback(err, response) 
    });
  }
}
