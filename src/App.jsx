import { useState } from 'react'
import axios from 'axios'
import './App.css'

import JokeCard from './Components/JokeCard'

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState([])

  const fetchData = async () => {
    const result = await axios.get('http://localhost:3001/')
    console.log(result.data);
    setData(result.data)
    console.log(typeof(result.data))
    console.log(typeof(data))
  }

  if ((data.length) === 0) {
    fetchData()
  }

  return (
    <div className="App">
      <div className="App-header">jesterJS</div>
      {data.map(joke => {
        return <JokeCard title={joke.title} joke={joke.joke} />
      })}
    </div>
  )
}

export default App
