import styles from './checkbox.module.css'

function Checkbox (props) {
  return (
    <label className={styles.checkbox}>
      <input type="checkbox" {...props} />
      <span className={styles.checkmark}></span>
    </label>
  )
}

export default Checkbox