import { useState } from 'react'
import axios from 'axios'
import './App.css'

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

  return (
    <div className="App">
      Hello, jesterJS!

      This is live.
      {data.map(joke => {
        return <p>{joke.title}{joke.joke}</p>
      })}
      <button onClick={fetchData}>Get Data</button>
    </div>
  )
}

export default App
