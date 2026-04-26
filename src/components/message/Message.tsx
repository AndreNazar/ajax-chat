import styles from "./Message.module.scss"

interface Props {
  name: string
  message: string
  time: number
  color: string
}

export default function Message({ name, message, time, color }: Props) {
  const date = new Date(time)
  const finalTime = date.toLocaleString()

  return (
    <div className={styles.message_item}>
      <span className={styles.time}>[{finalTime}]</span>
      <span style={{ color }} className={styles.username}>
        {name}:
      </span>
      <span className={styles.message}>{message}</span>
    </div>
  )
}
