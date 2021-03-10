import axios from 'axios'
import React, { useState, useEffect } from 'react'

const Past = () => {
  const [ instruction, setInstruction ] = useState([])
  const [ answer, setAnswer ] = useState('')
  
  useEffect(() => {
    axios.get('http://localhost:3001/api/instructions/604876ac4164936a50e207dc')
    .then(response => {
      setInstruction(response.data)
    })
  }, [])

  const submitAnswer = () => {
    const answerObject = {
      text: answer,
    }

    axios.post('http://localhost:3001/api/answers', answerObject)
    .then(response => setAnswer(response))
  }

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-medium text-white title-font mb-2">Instructions</h2>
        <p className="mt-2 text-base text-gray-500">
        {instruction.text}
        </p>
        <div className="lg:text-center"></div>
          <div className="relative mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-400">{instruction.label}</label>
            <textarea id="message" name="message" className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" onChange={handleAnswerChange}>{answer}</textarea>
          </div>
          <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={submitAnswer}>Submit</button>
        </div>
  )
}

export default Past