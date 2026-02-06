//import './App.css'
import Joke from "./components/JokeComponent"
import JokeData from "./components/JokeData"

function App() {
  const jokeElement = JokeData.map((joke)=> {
    return <Joke {...joke} key={joke.id}/>
  })

  return (
    <main>
      {jokeElement}
    </main>
  )
}

export default App
