import styles from './styles.module.scss';
import { VscGithubInverted } from 'react-icons/vsc';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

export function LoginBox() {
  const { signInUrl, user } = useContext(AuthContext);

  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Manda Mensagem</strong>
      <a href={signInUrl} className={styles.signInWithGithub}>
        <VscGithubInverted size="24" />
        Entrar com github
      </a>
    </div>
  );
}
