import React, { Component } from 'react';
import Backdrop from '../../../UI/Button/Backdrop/Backdrop';
import s from './Drawer.module.css';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Список', exact: true },
  { to: '/auth', label: 'Авторизация', exact: false },
  { to: '/quiz-creator', label: 'Создать тест', exact: false },
];

class Drawer extends Component {
  clickHandler = () => {
    //есть готовая ф-ция которая закрывае backdrop просто вызываем её
    this.props.onClose();
  };
  renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={s.active}
            onClick={this.clickHandler}
          >
            {link.label}
          </NavLink>
        </li>
      );
    });
  }

  render() {
    const cls = [s.Drawer];

    if (!this.props.isOpen) {
      cls.push(s.close);
    }

    return (
      <>
        <nav className={cls.join(' ')}>
          <ul>{this.renderLinks()}</ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </>
    );
  }
}

export default Drawer;
