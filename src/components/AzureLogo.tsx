interface AzureLogoProps {
  className?: string;
  size?: number;
}

export function AzureLogo({ className = "", size = 16 }: AzureLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Microsoft Azure Logo - Simplified version based on official design */}
      <path
        d="M10.8 2.4L4.2 18.6h4.8l1.8-4.2h7.2l-7.2-12z"
        fill="#0078D4"
      />
      <path
        d="M13.8 14.4L20.4 21H8.4l5.4-6.6z"
        fill="#00BCF2"
      />
      <path
        d="M10.8 2.4l7.2 12-4.2 6.6h6.6L24 18.6 10.8 2.4z"
        fill="#0078D4"
        fillOpacity="0.8"
      />
    </svg>
  );
}