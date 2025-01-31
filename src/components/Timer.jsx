const Timer = ({ sessionTime, isWorking }) => {
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="text-center mb-8">
      <div className={`text-6xl font-mono ${isWorking ? 'text-green-600' : 'text-gray-600'}`}>
        {formatTime(sessionTime)}
      </div>
      <div className="text-sm text-gray-500 mt-2">
        {isWorking ? 'Working' : 'Paused'}
      </div>
    </div>
  )
}

export default Timer 