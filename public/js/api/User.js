/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.setItem(`user`, JSON.stringify(user));
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    return JSON.parse(localStorage.getItem('user')); // <-- при условии пустого значения для user возвращает null, хотя в ТЗ требуется возвращать undefined
    //const userObj = localStorage['user'];
    //return userObj ? JSON.parse(userObj) : userObj; // <-- при условии false возвращает undefined
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
    createRequest({
      url: '/user/current',
      method: 'GET',
      responseType: 'json',
      data: this.current(),
      callback: (err, response) => {
        console.log('User.fetch: ', response);
        if (response && response.user) {
          const user = { 
            name: response.user.name,
            id: response.user.id
          }
          this.setCurrent(user);
        }
        else {
          this.unsetCurrent();
        } 
        callback(err, response);
      }
    });
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    createRequest({
      url: '/user/login',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        console.log('User.login: ', response);
        if (response && response.user) {
          const user = { 
            name: response.user.name,
            id: response.user.id
          }
          this.setCurrent(user);
        }
        callback(err, response);
      }
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
    createRequest({
      url: '/user/register',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        console.log('User.register: ', response);
        if (response && response.user) {
          const user = { 
            name: response.user.name,
            id: response.user.id
          }
          this.setCurrent(user);
        }
        callback(err, response);
      }
    });
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
    createRequest({
      url: '/user/logout',
      method: 'POST',
      responseType: 'json',
      data: this.current(),
      callback: (err, response) => {
        if (response) {
          this.unsetCurrent();
        } 
        callback(err, response);
      }
    });
  }
}
