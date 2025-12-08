"use client"

interface AIGuideData {
  summary: string
  safety: string
  activity: string
}

interface AIGuideSectionProps {
  guide: AIGuideData
}

const guides = [
  { icon: "🔮", title: "Cast Today", key: "summary" as const },
  { icon: "⚠️", title: "Safety Guide", key: "safety" as const },
  { icon: "🎯", title: "Activity Guide", key: "activity" as const },
]

export default function AIGuideSection({ guide }: AIGuideSectionProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-lg">
        💡 ClimoCast AI Guide
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {guides.map((item) => (
          <div
            key={item.key}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 
                       border border-white/30 hover:bg-white/20
                       transition-all duration-300 transform hover:translate-y-[-4px]"
          >
            <div className="text-4xl mb-3">{item.icon}</div>
            <h3 className="text-white font-bold mb-3">{item.title}</h3>

            {/* Highlight text with better readability */}
            <p className="text-white/90 text-sm leading-relaxed drop-shadow">
              {guide[item.key]}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
