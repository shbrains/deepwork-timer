import { useState, useEffect } from 'react'
import Timer from './components/Timer'
import SessionControls from './components/SessionControls'
import DistractionLog from './components/DistractionLog'
import SessionHistory from './components/SessionHistory'
import { createSessionEntry } from './services/notionService'

function App() {
  const [isWorking, setIsWorking] = useState(false)
  const [sessionTime, setSessionTime] = useState(0)
  const [distractions, setDistractions] = useState([])
  const [showHistory, setShowHistory] = useState(false)
  const [sessionStart, setSessionStart] = useState(null)
  const [breaks, setBreaks] = useState([])
  const [focus, setFocus] = useState('')

  useEffect(() => {
    let interval
    if (isWorking) {
      interval = setInterval(() => {
        setSessionTime((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isWorking])

  const handleStartSession = () => {
    setIsWorking(true)
    setSessionStart(new Date())
    // Prompt for focus area
    const focusArea = prompt('What will you focus on this session?')
    setFocus(focusArea || 'Unnamed Session')
  }

  const handlePauseSession = () => {
    setIsWorking(false)
  }

  const handleDistraction = () => {
    setDistractions(prev => [...prev, { timestamp: new Date(), duration: 0 }])
  }

  const calculateSessionMetrics = () => {
    const totalTime = sessionTime / 60 // Convert to minutes
    const distractionTime = distractions.length * 5 // Assuming 5 mins per distraction
    const breakTime = breaks.length * 15 // Assuming 15 mins per break
    const deepworkTime = totalTime - distractionTime - breakTime

    return {
      totalMins: totalTime,
      deepworkMins: deepworkTime,
      distractionMins: distractionTime,
      distractions: distractions.map(d => d.type || 'General Distraction')
    }
  }

  const handleEndSession = async () => {
    setIsWorking(false)
    
    const metrics = calculateSessionMetrics()
    
    try {
      await createSessionEntry({
        focus,
        ...metrics
      })
      // Reset session
      setSessionTime(0)
      setDistractions([])
      setBreaks([])
      setSessionStart(null)
      setFocus('')
    } catch (error) {
      alert('Failed to save session to Notion')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-8">DeepWork Timer</h1>
        
        <Timer sessionTime={sessionTime} isWorking={isWorking} />
        
        <SessionControls 
          isWorking={isWorking}
          onStart={handleStartSession}
          onPause={handlePauseSession}
          onDistraction={handleDistraction}
          onEndSession={handleEndSession}
        />
        
        <DistractionLog distractions={distractions} />
        
        <button
          className="mt-4 text-blue-500 underline"
          onClick={() => setShowHistory(!showHistory)}
        >
          {showHistory ? 'Hide History' : 'Show History'}
        </button>
        
        {showHistory && <SessionHistory />}
      </div>
    </div>
  )
}

export default App 