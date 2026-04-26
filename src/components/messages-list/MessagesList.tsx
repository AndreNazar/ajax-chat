import styles from "./MessagesList.module.scss"
import Message from "../message/Message"
import type { MessageType } from "../../types"

interface Props {
  messageList: MessageType[]
}

export default function MessagesList({ messageList }: Props) {
  return (
    <div className={styles.chat_container}>
      {messageList.length > 0 ? (
        <div className={styles.message_list}>
          {messageList.map((message) => (
            <Message color={message.color} name={message.name} message={message.message} time={message.time} />
          ))}
        </div>
      ) : (
        <div className={styles.no_messages}>Начните чатиться первый!</div>
      )}
    </div>
  )
}
