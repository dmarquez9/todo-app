import { useState, useEffect } from 'react'

import styles from './button.module.css';
import { ReactComponent as DarkMode } from '../../assets/icon-moon.svg';
import { ReactComponent as LightMode } from '../../assets/icon-sun.svg';

function ThemeToggler() {
  const [theme, setTheme] = useState('light')
  const nextTheme = theme === 'light' ? 'dark' : 'light'

  useEffect(() => {
    document.body.dataset.theme = theme
  }, [theme])

  return (
    <button onClick={() => setTheme(nextTheme)} className={styles.btnToggler}>
      {(theme === 'light') ? <DarkMode /> : <LightMode />}
    </button>
  )
}

export default ThemeToggler