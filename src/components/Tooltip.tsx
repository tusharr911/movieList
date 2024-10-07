import { ReactNode, useState } from "react";

interface TooltipProps {
  text: string;
  children: ReactNode;
}

export default function Tooltip({ text, children }: TooltipProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}

      {showTooltip && (
        <div className="absolute top-full mb-2 mt-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-700 text-white text-sm rounded-lg shadow-lg whitespace-nowrap">
          {text}
        </div>
      )}
    </div>
  );
}
