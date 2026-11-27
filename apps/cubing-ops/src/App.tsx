
import { useState } from 'react'
import { Button, Sun, Moon, Card, StatusBadge } from '@central-qa/ui'

import '@central-qa/design-tokens/colors.css'
import '@central-qa/design-tokens/foundation.css'
import './App.css'

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [message, setMessage] = useState('Nenhuma ação realizada.')

  function toggleTheme() {
    setTheme(current => current === 'light' ? 'dark' : 'light')
  }

  return (
    <main className="demo" data-theme={theme}>
      <header className="demo-header">
        <div>
          <h1>Central QA</h1>
          <p>Design System — v0.1.0</p>
        </div>

        <Button
          variant="secondary"
          icon={theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          onClick={toggleTheme}
        >
          {theme === 'light' ? 'Tema escuro' : 'Tema claro'}
        </Button>
      </header>

      <Card className="demo-panel">
        <h2>Componentes</h2>
        <p>Biblioteca compartilhada da Central QA.</p>

        {/* Variantes de botão */}

        <h3>Variantes</h3>

        <div className="demo-row">
          <Button onClick={() => setMessage('Confirmação testada.')}>
            Confirmar
          </Button>

          <Button
            variant="secondary"
            onClick={() => setMessage('Cancelamento testado.')}
          >
            Cancelar
          </Button>

          <Button
            variant="ghost"
            onClick={() => setMessage('Detalhes testados.')}
          >
            Detalhes
          </Button>

          <Button
            variant="danger"
            onClick={() => setMessage('Exclusão simulada.')}
          >
            Excluir
          </Button>
        </div>

        {/* Tamanhos de botão */}

        <h3>Tamanhos</h3>

        <div className="demo-row">
          <Button size="sm">Pequeno</Button>
          <Button size="md">Padrão</Button>
          <Button size="lg">Grande</Button>
        </div>

        {/* Estados de botão */}

        <h3>Estados dos botões</h3>

        <div className="demo-row">
          <Button isLoading>Salvando...</Button>
          <Button disabled>Indisponível</Button>
        </div>

        {/* Status operacionais */}

        <h3>Estados operacionais</h3>

        <div className="demo-row">
          <StatusBadge>Sem operador</StatusBadge>

          <StatusBadge tone="success">
            Em atuação
          </StatusBadge>

          <StatusBadge tone="warning">
            Em almoço
          </StatusBadge>

          <StatusBadge tone="danger">
            Divergência
          </StatusBadge>

          <StatusBadge tone="info">
            Disponível
          </StatusBadge>
        </div>

        {/* Feedback das ações */}

        <p className="demo-feedback" role="status">
          {message}
        </p>
      </Card>
    </main>
  )
}

export default App
