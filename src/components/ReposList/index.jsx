import { useState ,useEffect } from "react";
import styles from './ReposList.module.css';

const ReposList = ({ nomeUsuario }) => {
    const [repos, setRepos] = useState([]);
    const [estaCarregando, setEstaCarregando] = useState(true);
    const [deuErro, setDeuErro] = useState(false);

    useEffect(() => {
        setEstaCarregando(true);
        fetch(`https://api.github.com/users/${nomeUsuario}/repos`)
        .then((res) => {
            if (!res.ok) {
              throw new Error("Usuário não encontrado");
            }
            return res.json();
          })
          .then((resJson) => {
            setTimeout(() => {
              setEstaCarregando(false);
              setRepos(resJson);
            }, 3000);
          })
          .catch((e) =>{
            setEstaCarregando(false);
            setDeuErro(true);
            console.error("Erro ao carregar repositórios: ",e.message);
          });
    }, [nomeUsuario]);

    return (
        <div className="container"> 
            {estaCarregando ? (
                <h1>Carregando...</h1>
            ) : deuErro ? (
                <p>Erro ao carregar os repositórios. Verifique o nome do usuário.</p>
            ) : (
                <ul className={styles.list}>
                {repos.map(repositorio => (
                    <li class={styles.listItem} key={repositorio.id}>
                        <div className={styles.itemName}>
                            <b>Nome:</b> 
                            {repositorio.name} 
                        </div>
                        <div className={styles.itemLanguage}>
                            <b>Linguagem:</b> 
                            {repositorio.language} 
                        </div>
                        <a className={styles.itemLink} target="_blank" href={repositorio.html_url}>Visitar no Github</a> 
                    </li>
                ))}
            </ul>
            )}
        </div>
    )
}

export default ReposList;