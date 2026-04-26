import { useState, type RefObject } from "react"
import Button from "../ui/button/Button"
import Input from "../ui/input/Input"
import styles from "./FormMessage.module.scss"

interface Props {
  wsRef: RefObject<WebSocket | null>
}

export default function FormMessage({ wsRef }: Props) {
  const [message, setMessage] = useState<string>("")
  const sendMessage = () => {
    if (!message.trim()) return
    if (message.length > 1040) return
    wsRef.current?.send(JSON.stringify({ type: "message", message }))
    setMessage("")
  }

  return (
    <form className={styles.form_send_message} action={sendMessage} onKeyDown={(e) => e.key === "Enter" && sendMessage()}>
      <Input value={message} onChange={(m) => setMessage(m)} multiLine />
      <div className={styles.button_zone}>
        <Button label="Отправить" submit />
        <p>{message.length}/1040</p>
      </div>
    </form>
  )
}
