import Logo from '../Logo';

import styles from './Sidebar.module.css';

export default function Sidebar() {
  function navPage2() {
    window.electron.nav('/Page2');
  }
  return (
    <div className={styles.sidenav}>
      <Logo />
      <a href="#">Meu dia</a>
      <a href="#">Importante</a>
      <a href="#">Planejado</a>
      <a href="#">Trabalho</a>
      <a href="/">Home</a>
      <a href="/Page1">Page 1</a>
      <a href="/Page2.html">Page 2</a>
    </div>
  );
}
