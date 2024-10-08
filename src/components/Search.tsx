// HOOKS
import { useState, KeyboardEvent } from "react"

// ICONS
import { BsSearch } from "react-icons/bs"

//CSS
import styles from './Search.module.css'

type SearchProps = {
    loadUser: (userName: string) => Promise<void>
}

const Search = ({ loadUser }: SearchProps) => {
    const [userName, setUserName] = useState("");

    //click enter
    const handleKeyDown = (e:KeyboardEvent) => {
        if(e.key === "Enter"){
            loadUser(userName)
        }
    };

  return (
    <div className={styles.search}>
        <h2>Busque por um usuário:</h2>
        <p>Conheco seus melhores repositórios</p>
        <div className={styles.search_container}>
            <input type="text" 
            placeholder="Digite o nome do usuário"
            onChange={(e) => setUserName(e.target.value)}
            onKeyDown={handleKeyDown}/>
            <button onClick={() => loadUser(userName)}>
                <BsSearch/>
            </button>
        </div>
    </div>
  )
}

export default Search