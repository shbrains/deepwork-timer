const SessionControls = ({ isWorking, onStart, onPause, onDistraction, onBreak, onEndSession }) => {
  return (
    <div className="flex justify-center gap-4 mb-8">
      {!isWorking ? (
        <button
          onClick={onStart}
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
        >
          Start
        </button>
      ) : (
        <button
          onClick={onPause}
          className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600"
        >
          Pause
        </button>
      )}
      
      <button
        onClick={onDistraction}
        className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
      >
        Distraction
      </button>

      <button
        onClick={onBreak}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
      >
        Break
      </button>
      
      <button
        onClick={onEndSession}
        className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
      >
        End Session
      </button>
    </div>
  )
}

export default SessionControls 