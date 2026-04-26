import type { ChangeEvent } from "react"
import styles from "./Input.module.scss"

interface InputProps {
  value: string
  onChange: (value: string) => void
  label?: string
  multiLine?: boolean
}

export default function Input({ value, onChange, label, multiLine }: InputProps) {
  const onChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    onChange(e.target.value.replace(/\n/g, ""))
  }

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    onChange(e.target.value)
  }

  return (
    <div className={styles.input_container}>
      {label && <label className={styles.label}>{label}</label>}
      {multiLine ? (
        <textarea
          className={styles.textarea}
          value={value}
          onChange={onChangeTextArea}
          onPaste={(e) => {
            e.preventDefault()
            const text = e.clipboardData.getData("text/plain").replace(/\n/g, "")
            document.execCommand("insertText", false, text)
          }}
        />
      ) : (
        <input type="text" className={styles.input} value={value} onChange={onChangeInput} />
      )}
    </div>
  )
}
