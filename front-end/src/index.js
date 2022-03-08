import React from 'react'
import ReactDOM from 'react-dom'
import { store } from './app/store'
import { Provider } from 'react-redux'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
