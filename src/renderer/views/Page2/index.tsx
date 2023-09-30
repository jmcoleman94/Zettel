import Sidebar from '../../components/Sidebar';

import styles from './Page2.module.css';

export default function Page2() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.container}>
        <h2>Page 2</h2>
      </div>
    </div>
  );
}
