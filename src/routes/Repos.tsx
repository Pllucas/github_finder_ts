//HOOKS
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

//COMPONENTS
import BackBtn from '../components/BackBtn'
import Loader from '../components/Loader'
import Repo from '../components/Repo'

//TYPES
import type { RepoProps } from '../types/repo'

//CSS
import styles from './Repos.module.css'

const Repos = () => {
    const { username } = useParams();

    const [repos, setRepos] = useState<RepoProps[]| [] | null>(null);

    const [isLoading, setIsLoading] = useState(false)
    
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
      useEffect(() => {
        
      setIsLoading(true);

      const loadRepos = async (userName: string) => {
        const res = await fetch(`https://api.github.com/users/${userName}/repos`)
      
        const data = await res.json();

        setIsLoading(false);

        let orderedRepos = data.sort(
          (a: RepoProps, b: RepoProps) => b.stargazers_count - a.stargazers_count
        );
      
        orderedRepos = orderedRepos.slice(0,5);

        setRepos(orderedRepos);
      };

      // chegando se o nome vem, para TS não considerar como erro
      if(username){
        loadRepos(username);
      };

    }, []);

    if(!repos && isLoading) return <Loader/>

  return (
    <div className={styles.repos}>
        <BackBtn/>
        <h2>Explorar os repositórios do usuário: {username}</h2>
        {repos && repos.length === 0 && <p>Não há repositórios</p>}
        {repos && repos.length > 0 && (
          <div className={styles.repos_container}>
            {repos.map((repo: RepoProps) => (
              <Repo key={repo.name} {...repo}/>
            ))}
          </div>
        )}
    </div>
  )
}

export default Repos