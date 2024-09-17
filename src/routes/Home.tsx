// TYPES
import type { UserProps } from '../types/user'

//HOOKS
import { useState } from "react"

//COMPONENTS
import Search from "../components/Search"
import User from "../components/User"
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import Error from '../components/Error'
import Loader from '../components/Loader'

const Home = () => {
    const [user, setUser] = useState<UserProps | null>(null);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const loadUser = async(userName: string) => {
        setIsLoading(true); // carregando da página

        setError(false);
        setUser(null); // parar de aparecer <Error/> mesmo quando tiver usuário

        const res = await fetch(`https://api.github.com/users/${userName}`)
        
        const data = await res.json();

        setIsLoading(false); // parar o carregar da página

        if(res.status === 404){
          setError(true);
          return;
        }

        const { avatar_url, login ,location, followers, following } = data

        const userData: UserProps = {
          avatar_url, 
          login ,
          location, 
          followers, 
          following,
        }

        setUser(userData);
    }

  return (
    <div>
        <Search loadUser={loadUser}/>
        {isLoading && <Loader/>}
        {user && <User {...user} /> }
        {error && <Error/>}
    </div>
  )
}

export default Home