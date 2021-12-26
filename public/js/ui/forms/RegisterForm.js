/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    console.log(data);
    User.register(data, response => {
      console.log(response);
      if (response.success) {
        App.setState('user-logged');
        Modal.close();
      }
    });
  }
}