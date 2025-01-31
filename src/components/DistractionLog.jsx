const DistractionLog = ({ distractions }) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Distractions ({distractions.length})</h3>
      <div className="space-y-2">
        {distractions.map((distraction, index) => (
          <div key={index} className="flex items-center justify-between bg-red-50 p-2 rounded">
            <span>
              {new Date(distraction.timestamp).toLocaleTimeString()}
            </span>
            <span className="text-red-600">-5 mins</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DistractionLog 