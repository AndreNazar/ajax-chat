import { useEffect, useRef, useState } from "react"
import FormInfo from "./components/formInfo/FormInfo"
import type { MessageType, User } from "./types"
import FormMessage from "./components/formmessage/FormMessage"
import MessagesList from "./components/messages-list/MessagesList"
import UsersList from "./components/users-list/UsersList"
import styles from "./App.module.scss"

const STATIC_USER: User = { name: "(аноним)", color: "#cccccc" }

function App() {
  const wsRef = useRef<WebSocket | null>(null)
  const [user, setUser] = useState<User>(() => {
    const ls = localStorage.getItem("user")
    return ls ? JSON.parse(ls) : STATIC_USER
  })
  const [userList, setUserList] = useState<User[]>([])
  const [messageList, setMessageList] = useState<MessageType[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isActive = true
    const ws = new WebSocket("wss://valid-heads-caught-intimate.trycloudflare.com")

    wsRef.current = ws

    ws.onopen = () => {
      if (!isActive) return
      ws.send(
        JSON.stringify({
          type: "join",
          name: user?.name,
          color: user?.color,
        })
      )
      setIsConnected(true)
      setIsLoading(false)
    }
    ws.onclose = () => {
      if (!isActive) return
      setIsConnected(false)
      setIsLoading(false)
    }

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data)

      if (data.type === "users") {
        setUserList(data.users.map((u: User) => ({ name: u.name, color: u.color })))
      }
      if (data.type === "message") {
        setMessageList((prev) => [...prev, data])
      }
      if (data.type === "init") {
        setMessageList(data.messages)
      }
    }

    return () => {
      isActive = false
      ws.close()
      wsRef.current = null
    }
  }, [])

  if (isLoading) {
    return <div>Загрузка...</div>
  }
  if (!isConnected) {
    return <div>У разработчика выключен компьютер, поэтому ничего не работает и писать сообщения нельзя...</div>
  } else {
    return (
      <div className={styles.app_container}>
        <h1>ЧАТ</h1>
        <div className={styles.chat_content}>
          <FormInfo wsRef={wsRef} user={user} setUser={setUser} />
          <div className={styles.main_lists}>
            <MessagesList messageList={messageList} />
            <UsersList userList={userList} />
          </div>
          <FormMessage wsRef={wsRef} />
        </div>
      </div>
    )
  }
}

export default App
