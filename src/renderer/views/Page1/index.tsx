import Sidebar from '../../components/Sidebar';

import styles from './Page1.module.css';

export default function Page1() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <span>Page 1</span>
    </div>
  );
}
