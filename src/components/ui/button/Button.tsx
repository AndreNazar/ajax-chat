import styles from "./Button.module.scss"

interface Props {
  label?: string
  onClick?: () => void
  submit?: boolean
}

export default function Button({ label, onClick, submit }: Props) {
  return (
    <button type={submit ? "submit" : "button"} className={styles.button} onClick={onClick}>
      {label}
    </button>
  )
}
