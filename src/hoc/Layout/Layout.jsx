import React, { Component } from 'react';
import Drawer from '../../components/ActiveQuiz/Navigation/MenuToggle/Drawer/Drawer';
import MenuToggle from '../../components/ActiveQuiz/Navigation/MenuToggle/MenuToggle';
import s from './Layout.module.css';

class Layout extends Component {
  state = {
    menu: false,
  };

  toggleMenuHandler = () => {
    this.setState({
      menu: !this.state.menu,
    });
  };
  render() {
    return (
      <div className={s.Layout}>
        <Drawer isOpen={this.state.menu} />
        <MenuToggle
          onToggle={this.toggleMenuHandler}
          isOpen={this.state.menu}
        />
        <main>{this.props.children}</main>
      </div>
    );
  }
}

export default Layout;
