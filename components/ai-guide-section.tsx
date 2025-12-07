"use client"

interface AIGuideData {
  morning: string
  afternoon: string
  evening: string
  safety: string
  activity: string
}

interface AIGuideSectionProps {
  guide: AIGuideData
}

const guides = [
  { icon: "🌅", title: "Morning Guide", key: "morning" as const },
  { icon: "🌤️", title: "Afternoon Guide", key: "afternoon" as const },
  { icon: "🌙", title: "Evening Guide", key: "evening" as const },
  { icon: "⚠️", title: "Safety Guide", key: "safety" as const },
  { icon: "🎯", title: "Activity Recommendation", key: "activity" as const },
]

export default function AIGuideSection({ guide }: AIGuideSectionProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-lg">💡 AI Weather Guide</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {guides.map((item) => (
          <div
            key={item.key}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/30 hover:bg-white/20 transition-all duration-300 transform hover:translate-y-[-4px]"
          >
            <div className="text-4xl mb-3">{item.icon}</div>
            <h3 className="text-white font-bold mb-3">{item.title}</h3>
            <p className="text-white/80 text-sm leading-relaxed">{guide[item.key]}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
