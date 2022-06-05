import * as React from 'react';
import Menu from './Menu';


const Layout = ({ children }) => {
  return (
    <>
      <Menu />
      <main>{children}</main>
    </>
  )
};

export default Layout;
