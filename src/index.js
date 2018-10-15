import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// ReactDOM.render(<App />, document.getElementById('root')) 
// *OLD* Don't fully understand why this had to change, but the internet told me so.

ReactDOM.render(
  <BrowserRouter><App /></BrowserRouter>,
  document.getElementById('root'))