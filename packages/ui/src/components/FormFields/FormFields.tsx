
import { useId } from 'react'

import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
  ReactNode,
} from 'react'

import './FormFields.css'

interface FieldProps {
  label: string
  hint?: string
  error?: string
}

interface FieldLayoutProps extends FieldProps {
  id: string
  children: ReactNode
}

/* Estrutura compartilhada dos campos */

function FieldLayout({
  id,
  label,
  hint,
  error,
  children,
}: FieldLayoutProps) {
  return (
    <div className="qa-field">
      <label className="qa-field-label" htmlFor={id}>
        {label}
      </label>

      {children}

      {hint && (
        <span id={`${id}-hint`} className="qa-field-hint">
          {hint}
        </span>
      )}

      {error && (
        <span id={`${id}-error`} className="qa-field-error">
          {error}
        </span>
      )}
    </div>
  )
}

/* Identificação acessível dos campos */

function useFieldAttributes(
  id?: string,
  hint?: string,
  error?: string,
  describedBy?: string,
) {
  const generatedId = useId()
  const fieldId = id ?? generatedId

  return {
    id: fieldId,
    'aria-describedby': [
      describedBy,
      hint ? `${fieldId}-hint` : '',
      error ? `${fieldId}-error` : '',
    ].filter(Boolean).join(' ') || undefined,
  }
}

/* Input */

export type InputProps =
  InputHTMLAttributes<HTMLInputElement> & FieldProps

export function Input({
  label,
  hint,
  error,
  id,
  className = '',
  ...props
}: InputProps) {
  const field = useFieldAttributes(
    id, hint, error, props['aria-describedby']
  )

  return (
    <FieldLayout
      id={field.id}
      label={label}
      hint={hint}
      error={error}
    >
      <input
        {...props}
        {...field}
        aria-invalid={error ? true : props['aria-invalid']}
        className={`qa-field-control ${className}`}
      />
    </FieldLayout>
  )
}

/* Select */

export type SelectProps =
  SelectHTMLAttributes<HTMLSelectElement> & FieldProps

export function Select({
  label,
  hint,
  error,
  id,
  children,
  className = '',
  ...props
}: SelectProps) {
  const field = useFieldAttributes(
    id, hint, error, props['aria-describedby']
  )

  return (
    <FieldLayout
      id={field.id}
      label={label}
      hint={hint}
      error={error}
    >
      <select
        {...props}
        {...field}
        aria-invalid={error ? true : props['aria-invalid']}
        className={`qa-field-control ${className}`}
      >
        {children}
      </select>
    </FieldLayout>
  )
}

/* Textarea */

export type TextareaProps =
  TextareaHTMLAttributes<HTMLTextAreaElement> & FieldProps

export function Textarea({
  label,
  hint,
  error,
  id,
  className = '',
  rows = 3,
  ...props
}: TextareaProps) {
  const field = useFieldAttributes(
    id, hint, error, props['aria-describedby']
  )

  return (
    <FieldLayout
      id={field.id}
      label={label}
      hint={hint}
      error={error}
    >
      <textarea
        {...props}
        {...field}
        rows={rows}
        aria-invalid={error ? true : props['aria-invalid']}
        className={`qa-field-control qa-textarea ${className}`}
      />
    </FieldLayout>
  )
}

/* Checkbox */

export interface CheckboxProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export function Checkbox({
  label,
  className = '',
  ...props
}: CheckboxProps) {
  return (
    <label className={`qa-checkbox ${className}`}>
      <input {...props} type="checkbox" />
      <span>{label}</span>
    </label>
  )
}
