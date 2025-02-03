export function TypingIndicator() {
    return (
      <div className="flex items-center gap-2 text-xs text-gray-500">
        {/* <span>{name} is typing</span> */}
        <div className="flex items-center justify-center gap-[4px]">
          <style>{`
            @keyframes blink {
              0% { opacity: .2; }
              20% { opacity: 1; }
              100% { opacity: .2; }
            }
          `}</style>
          <div
            className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-gray-300"
            style={{ animation: "blink 1.4s infinite linear" }}
          />
          <div
            className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-gray-300"
            style={{ animation: "blink 1.4s infinite linear 0.2s" }}
          />
          <div
            className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-gray-300"
            style={{ animation: "blink 1.4s infinite linear 0.4s" }}
          />
        </div>
      </div>
    )
  }
  
  