import ThemeToggler from '../ThemeToggler'
import styles from './app.module.css'

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <header className={styles.appHeader}>
          <h1>TODO</h1>
          <ThemeToggler />
        </header>
      </div>
    </div>
  );
}

export default App;
