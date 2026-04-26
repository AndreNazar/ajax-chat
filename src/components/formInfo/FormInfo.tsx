import { useState, type RefObject } from "react"
import Button from "../ui/button/Button"
import Input from "../ui/input/Input"
import styles from "./FormInfo.module.scss"
import type { User } from "../../types"

type Props = {
  user: User
  setUser: (user: User) => void
  wsRef: RefObject<WebSocket | null>
}

export default function FormInfo({ user, setUser, wsRef }: Props) {
  const [localUser, setLocalUser] = useState(user)

  const onEditUser = () => {
    wsRef.current?.send(JSON.stringify({ type: "close", name: localUser.name, color: localUser.color }))
    setUser(localUser)
    wsRef.current?.send(JSON.stringify({ type: "join", name: localUser.name, color: localUser.color }))
    localStorage.setItem("user", JSON.stringify(localUser))
  }

  return (
    <form className={styles.form_info} action={onEditUser}>
      <div className={styles.form_info_inputs}>
        <Input value={localUser.name} onChange={(name) => setLocalUser({ ...localUser, name })} label="Имя" />
        <Input value={localUser.color} onChange={(color) => setLocalUser({ ...localUser, color })} label="Цвет" />
      </div>
      <Button label="Сохранить" submit />
    </form>
  )
}
