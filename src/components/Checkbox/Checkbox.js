import { useEffect, useState } from 'react'
import styles from './checkbox.module.scss'

function Checkbox ({ value, ...props }) {
  const [isChecked, setChecked] = useState(value)

  useEffect(() => {
    setChecked(value)
  }, [value])

  return (
    <label className={styles.checkbox}>
      <input type="checkbox" checked={isChecked} {...props} />
      <span className={styles.checkmark}></span>
    </label>
  )
}

export default Checkbox