//* ------------------- DEPENDENCIES ------------------ *\\

//* Component imports
import { FunctionComponent } from 'react';

//* Style imports
import styles from '../styles/Layout.module.scss';

//* -------------------- COMPONENTS ------------------- *\\

const Layout: FunctionComponent = ({ children }) => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

//* --------------------- EXPORTS --------------------- *\\

export default Layout;
