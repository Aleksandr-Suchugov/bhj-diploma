/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const sidebarBtn = document.querySelector('a.sidebar-toggle');
    sidebarBtn.addEventListener('click', (ev) => {
      ev.preventDefault();
      const sidebarMini = document.querySelector('body.sidebar-mini');
      sidebarMini.classList.toggle('sidebar-open');
      sidebarMini.classList.toggle('sidebar-collapse'); //для совместимости с Fire-Fox
    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const sidebarCtrlBtns = document.querySelectorAll('.sidebar-menu');
    sidebarCtrlBtns.forEach(button => {
      button.addEventListener('click', (ev) => {
        ev.preventDefault();
        switch (ev.target.innerText) {
          case 'Вход':
            App.getModal('login').open();
          break;
          case 'Регистрация':
            App.getModal('register').open();
          break;
          case 'Выйти':
            User.logout(response => {
              if (response.success) {
                App.setState('init');
              }
            })
          break;
        }
      });
    });
  }
}