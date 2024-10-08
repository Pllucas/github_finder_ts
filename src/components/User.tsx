//ROUTES
import { Link } from "react-router-dom"

//TYPES
import { UserProps } from "../types/user"


//ICON
import { MdLocationPin } from "react-icons/md"

//CSS
import styles from './User.module.css'

const User = ({
    login, 
    avatar_url, 
    followers, 
    following, 
    location,
}: UserProps) => {
  return (
    <div className={styles.user}>
        <img src={avatar_url} alt={login} />
        <h2>{login}</h2>
        {location && (
            <p className={styles.location}>
            <MdLocationPin/>
            <span>{location}</span>
        </p>
        )}
        <div className={styles.stats}>
            <div>
                <p>Seguidores:</p>
                <p>{followers}</p>
            </div>
            <div>
                <p>Seguindo:</p>
                <p>{following}</p>
            </div>
        </div>
        <Link to={`/repos/${login}`}>Ver melhores projetos</Link>
    </div>
  )
}

export default User