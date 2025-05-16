interface EcoLogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

export function EcoLogo({ size = "md", className = "" }: EcoLogoProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  }

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Main circular background */}
      <div className="absolute inset-0 rounded-full bg-eco-dark-green"></div>

      {/* Leaf shape */}
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 p-1">
        <path
          d="M21 3.6C19.5 3.6 18.1 4 17 4.9C15.9 5.8 15 7.2 15 9C15 9.5 15.1 10 15.2 10.4C14.5 10.2 13.8 10 13 10C10.8 10 9 11.8 9 14C9 14.5 9.1 15 9.3 15.5C8.9 15.2 8.5 15 8 15C6.9 15 6 15.9 6 17C6 18.1 6.9 19 8 19H19C20.7 19 22 17.7 22 16V4.6C22 4 21.6 3.6 21 3.6Z"
          fill="#86C232"
        />
        <path
          d="M5 16.5C5 14.6 6.1 13.1 7.5 12.5C7.5 12.3 7.5 12.2 7.5 12C7.5 9.5 9.5 7.5 12 7.5C13.2 7.5 14.3 8 15.1 8.8C15.4 7 16.9 5.5 18.7 5.1C18.5 4.8 18.2 4.5 17.9 4.3C16.7 3.5 15.4 3 14 3C12.4 3 10.9 3.6 9.8 4.7C9.3 4.3 8.6 4 8 4C6.9 4 6 4.9 6 6C6 6.4 6.1 6.7 6.3 7C4.9 8.2 4 10 4 12C4 13.3 4.4 14.5 5 15.5C5 15.7 5 16.1 5 16.5Z"
          fill="#61892F"
        />
      </svg>

      {/* Circular highlight */}
      <div className="absolute top-0 right-0 h-3 w-3 rounded-full bg-white opacity-50"></div>
    </div>
  )
}
