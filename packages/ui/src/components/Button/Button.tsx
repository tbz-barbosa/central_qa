
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { LoaderCircle } from 'lucide-react'
import './Button.css'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: ReactNode
  isLoading?: boolean
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  isLoading = false,
  disabled = false,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={`qa-button qa-button--${variant} qa-button--${size} ${className}`}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
    >
      {isLoading ? (
        <LoaderCircle
          className="qa-button-spinner"
          size={18}
          aria-hidden="true"
        />
      ) : icon}

      {children}
    </button>
  )
}
