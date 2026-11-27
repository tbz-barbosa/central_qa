
import { useState } from 'react'
import '@central-qa/design-tokens/colors.css'
import '@central-qa/design-tokens/foundation.css'

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <main
      data-theme={theme}
      style={{
        minHeight: '100vh',
        padding: '24px',
        background: 'var(--qa-color-background)',
        color: 'var(--qa-color-text)',
      }}
    >
      <h1>Central QA</h1>
      <p>Design System — v0.1.0</p>

      <button
        onClick={toggleTheme}
        style={{
          background: 'var(--qa-color-brand)',
          color: 'var(--qa-color-on-brand)',
          border: 'none',
          borderRadius: '8px',
          padding: '12px 20px',
        }}
      >
        Alternar tema
      </button>

      <section
        style={{
          marginTop: '24px',
          padding: '24px',
          borderRadius: '12px',
          background: 'var(--qa-color-surface)',
          border: '1px solid var(--qa-color-border)',
        }}
      >
        <h2>NEXO QA - Cubing Ops</h2>

        <p style={{ color: 'var(--qa-color-text-secondary)' }}>
          Ambiente de testes do Design System.
        </p>

        <p style={{ color: 'var(--qa-color-success)' }}>
          Operação normal
        </p>

        <p style={{ color: 'var(--qa-color-warning)' }}>
          Atenção necessária
        </p>

        <p style={{ color: 'var(--qa-color-danger)' }}>
          Situação crítica
        </p>

        <p style={{ color: 'var(--qa-color-info)' }}>
          Informação operacional
        </p>
      </section>
    </main>
  )
}

export default App
