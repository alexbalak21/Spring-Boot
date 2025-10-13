import './App.css'
import axios from 'axios'
import { useState } from 'react'

const MESSAGE_URL = '/api'

export default function App() {
  const [message, setMessage] = useState('')

  const getMessage = async () => {
    try {
      const response = await axios.get(MESSAGE_URL)
      setMessage(response.data.message)
    } catch (error) {
      console.error('Error fetching message:', error)
      setMessage('Failed to load message. Check console for details.')
    }
  }

  return (
    <main>  
    <div>
      <h1>Spring Boot</h1>
      <p>{message}</p>
      <button onClick={getMessage}>Get Message</button>
    </div>
    </main>
  )
}
