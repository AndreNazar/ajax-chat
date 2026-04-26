import type { User } from "../../types"
import styles from "./UsersList.module.scss"

interface Props {
  userList: User[]
}

export default function UsersList({ userList }: Props) {
  return (
    <div className={styles.users_list}>
      <h4>Сейчас онлайн ({userList.length}):</h4>
      {userList.map((user) => (
        <div style={{ color: user.color }} className={styles.user_item} key={user.name}>
          {user.name}
        </div>
      ))}
    </div>
  )
}
