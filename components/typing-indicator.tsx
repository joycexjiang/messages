export function TypingIndicator() {
    return (
      <div className="flex items-center gap-2 text-xs text-gray-500">
        {/* <span>{name} is typing</span> */}
        <div className="flex items-center">
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
        </div>
      </div>
    )
  }
  
  