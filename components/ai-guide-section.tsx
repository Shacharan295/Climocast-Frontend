"use client"

interface AIGuideData {
  summary: string
  safety: string
  insight: string
}

interface AIGuideSectionProps {
  guide: AIGuideData
}

const guides = [
  { title: "Cast Today", key: "summary" as const },
  { title: "Safety Today", key: "safety" as const },
  { title: "Climate Insight", key: "insight" as const },
]

export default function AIGuideSection({ guide }: AIGuideSectionProps) {
  return (
    <div>
      <h2 className="text-3xl font-extrabold text-white mb-6 drop-shadow-xl tracking-tight">
        💡 AI Weather Guide
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {guides.map((item) => (
          <div
            key={item.key}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20
            hover:bg-white/20 transition-all duration-300 transform hover:translate-y-[-4px]"
          >
            {/* Stylish Title */}
            <h3 className="text-white font-semibold tracking-wide text-lg mb-3">
              {item.title}
            </h3>

            {/* Premium Body Text */}
            <p
              className="text-white/80 text-[15px] leading-relaxed font-light
                         whitespace-pre-wrap break-words tracking-wide"
            >
              {guide[item.key]}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
