import { Header } from "../../components/Header";
import background from "../../assets/background.png";
import ItemList from "../../components/ItemList";
import { useState} from "react";
import "./styles.css";

function App() {
const [user, setUser] = useState('');
const [currentUser, setCurrentUser] = useState(null);
const [repos, setRepos] = useState(null);
const token = process.env.REACT_APP_GITHUB_TOKEN

const handleGetData = async () => {

       const userData = await fetch(`https://api.github.com/users/${user}`,{
    headers: {
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": "2022-11-28"
  }});
  const newUser = await userData.json();

 
  if(newUser.name){
    const {avatar_url, name, bio, login} = newUser;
    setCurrentUser(newUser);

   
    const repostData = await fetch(`https://api.github.com/users/${user}/repos`);
    //info html_url, homepage, description, full_name
    const newRepos = await repostData.json();
    console.log(newRepos);

    if(newRepos.length > 0){
      setRepos(newRepos);
    }   

  }
}


  return (
    <div className="App">
      <Header/>
      <div className="conteudo">
        <img src={background} className="background" alt="background app" />
        <div className="info">
          <div>
            <input name="usuario" value={user} 
            onChange={(e) => setUser(e.target.value)} 
            placeholder="username"/>
            <button onClick={handleGetData}>Buscar</button>
          </div>
          <div>
            {currentUser?.name ? (<>
            <div className="perfil">
            <img src={currentUser.avatar_url} className="profile" alt="profile img"/>
              <div>
                <h3>{currentUser.name}</h3>
                <span>@{currentUser.login}</span>
                <p>{currentUser.bio}</p>
              </div>
            </div> 
            <hr/>
            </>): null}

            {repos?.length ? (
            <div>
              <h4 className="repositorio">Repositórios</h4>
              {repos.map((repo) => (
                <ItemList key={repo.id} title={repo.name} description={repo.description}/>
              ))}

            </div>
            ):null}
          </div> 
        </div>
      </div>
    </div>
  );
}

export default App;
