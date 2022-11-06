import { useState } from 'react'
import axios from 'axios'
import './App.css'

import JokeCard from './Components/JokeCard'

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState([])
  const [jokesPerPage, setJokesPerPage] = useState(100)
  const [pageNumber, setPageNumber] = useState(0)
  const [searchString, setSearchString] = useState('')

  const fetchData = async () => {
    const result = await axios.get(`http://localhost:3001/jokes/${pageNumber}/${jokesPerPage}`)
    console.log(result.data);
    setData(result.data)
    console.log(typeof(result.data))
    console.log(typeof(data))
  }

  if ((data.length) === 0) {
    fetchData()
  }

  const submitSearch = (e) => {
    //e.preventDefault()
    if (e.code === "Enter") {
      console.log(`submitted`)
      console.log(e.target.value)
      setSearchString(e.target.value)
      console.log(data)
    }
    if (e.target.value.length === 0) {
      setSearchString('')
    }
  }

  const clickNextPageBtn = () => {
    console.log(`clicked next page button`)
    setPageNumber(pageNumber => pageNumber + 1);
    fetchData();
  }

  // Loop over all the data and filter out the ones that don't match the search string
  const filteredData = data.filter(joke => {
    return joke.joke.toLowerCase().includes(searchString.toLowerCase())})

  console.log(filteredData)
  
  if (searchString.length === 0 || filteredData.length === 0) {
  return (
    <div className="App">
      <div className="App-header">
        jesterJS
        <div className="App-header-search-bar"><input onKeyDown={(e) => submitSearch(e)} placeholder="search jokes..." id="joke-search-input"></input></div>
      </div>
      <div className="App-status-bar">
        Page: {pageNumber}.
      </div>
      <div onClick={() => clickNextPageBtn()}className='pageButton'>Next Page</div>
      <div className="joke-results-container">
      {data.map(joke => {
        return (
          <JokeCard title={joke.title} category={joke.category} joke={joke.joke} dateAdded={joke.createdAt}/>
        
      )
      })}
      </div>
    </div>
  )}
  if (filteredData.length > 0) {
    return (
    <div className="App">
    <div className="App-header">
      jesterJS
      <div className="App-header-search-bar"><input onKeyDown={(e) => submitSearch(e)} placeholder="search jokes..." id="joke-search-input"></input></div>
    </div>
    <div className="App-status-bar">
      Showing {filteredData.length} {searchString}-related jokes.
      </div>
    <div className='pageButton'>Next Page</div>
    <div className="joke-results-container">
    {filteredData.map(joke => {
      return (

          <JokeCard title={joke.title} category={joke.category} joke={joke.joke} dateAdded={joke.createdAt}/>
        
      ) 
    })}
    </div>
  </div>
  )
  }
}

export default App
