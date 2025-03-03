// Dummy Gauge Chart Component (Placeholder)
export default function GaugeChart({ score, scoreText }) {
    return (
      <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-center">
        <div>
          <p className="text-2xl font-bold text-blue-600">{score}</p>
          <p className="text-sm text-gray-600">{scoreText}</p>
        </div>
      </div>
    );
  }