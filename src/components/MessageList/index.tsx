import styles from './styles.module.scss'
import { api } from '../../services/api'
import logoImg from '../../assets/logo.svg'
import { useEffect } from 'react'

export function MessageList() {
  useEffect(() => {
    api.get('/messages/last3').then(response => {
      console.log(response.data)
    })
  }, [])

  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} />

      <ul className={styles.messageList}>
        <li className={styles.message}>
          <p className={styles.messageContent}>
            Lorem ipsum dolor sit amet, consectetur adip
          </p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img src="https://github.com/mecbonjourno.png" />
            </div>
            <span>Guilherme Zago</span>
          </div>
        </li>
      </ul>
    </div>
  )
}
