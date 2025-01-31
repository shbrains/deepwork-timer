import { useState, useEffect } from 'react'
import { getSessionHistory } from '../services/notionService'

const SessionHistory = () => {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchSessions()
  }, [])

  const fetchSessions = async () => {
    try {
      setLoading(true)
      const results = await getSessionHistory()
      setSessions(results)
    } catch (err) {
      setError('Failed to load session history')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="mt-6 text-center">Loading sessions...</div>
  if (error) return <div className="mt-6 text-red-500">{error}</div>

  return (
    <div className="mt-6 border-t pt-4">
      <h2 className="text-xl font-bold mb-4">Session History</h2>
      <div className="space-y-4">
        {sessions.map((session) => {
          const props = session.properties
          const totalMins = props['Total MINS']?.number || 0
          const deepworkMins = props['Deepwork MINS']?.number || 0
          const distractionMins = props['Distraction MINS']?.number || 0
          const focus = props['Focus']?.title[0]?.text?.content || 'Unnamed Session'
          const date = new Date(props['Date']?.date?.start).toLocaleDateString()
          
          const productivityPercentage = Math.round((deepworkMins / totalMins) * 100) || 0

          return (
            <div key={session.id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{focus}</h3>
                  <p className="text-sm text-gray-600">{date}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-green-600">
                    {productivityPercentage}% Productive
                  </div>
                  <div className="text-sm text-gray-600">
                    {Math.round(totalMins)} mins total
                  </div>
                </div>
              </div>
              
              <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
                <div className="bg-green-100 p-2 rounded">
                  <div className="font-medium">Deepwork</div>
                  <div>{Math.round(deepworkMins)} mins</div>
                </div>
                <div className="bg-red-100 p-2 rounded">
                  <div className="font-medium">Distractions</div>
                  <div>{Math.round(distractionMins)} mins</div>
                </div>
                <div className="bg-yellow-100 p-2 rounded">
                  <div className="font-medium">Breaks</div>
                  <div>{Math.round(totalMins - deepworkMins - distractionMins)} mins</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SessionHistory 