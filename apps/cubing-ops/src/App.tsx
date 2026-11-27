
import { useState } from 'react'
import type { FormEvent } from 'react'

import {
  Button,
  Sun,
  Moon,
  Card,
  StatusBadge,
  Input,
  Select,
  Textarea,
  Checkbox,
  Modal,
  Drawer,
} from '@central-qa/ui'

import '@central-qa/design-tokens/colors.css'
import '@central-qa/design-tokens/foundation.css'
import './App.css'

const lines = [...'ABCDEFGHIJKLMNOPQRST', 'NT']

const movements = [
  {
    time: '11:05',
    action: 'Processamento de 3 pallets',
    operator: 'Operador A',
  },
  {
    time: '10:45',
    action: 'Linha C → 3 pallets → Linha A',
    operator: 'Operador B',
  },
  {
    time: '10:32',
    action: 'Linha A → 2 pallets → Linha B',
    operator: 'Operador A',
  },
  {
    time: '10:15',
    action: 'Processamento de 4 pallets',
    operator: 'Operador A',
  },
  {
    time: '09:40',
    action: 'Entrada na linha — 18 pallets físicos',
    operator: 'Operador A',
  },
]

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [message, setMessage] = useState('Nenhuma ação realizada.')

  // Controle dos painéis

  const [activeDialog, setActiveDialog] =
    useState<'modal' | 'drawer' | null>(null)

  // Estados do formulário

  const [line, setLine] = useState('A')
  const [unit, setUnit] = useState<'pallets' | 'totes'>('pallets')
  const [quantity, setQuantity] = useState('')
  const [description, setDescription] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formFeedback, setFormFeedback] = useState('')

  // Validação e conversão

  const numericQuantity = Number(quantity)
  const totalTotes = numericQuantity * (unit === 'pallets' ? 20 : 1)

  const validQuantity =
    quantity.trim() !== '' &&
    Number.isSafeInteger(numericQuantity) &&
    numericQuantity >= 0 &&
    Number.isSafeInteger(totalTotes)

  const quantityError =
    submitted && !validQuantity
      ? 'Informe uma quantidade inteira válida.'
      : undefined

  function toggleTheme() {
    setTheme(current => current === 'light' ? 'dark' : 'light')
  }

  function closeDialog() {
    setActiveDialog(null)
  }

  function resetForm() {
    setLine('A')
    setUnit('pallets')
    setQuantity('')
    setDescription('')
    setConfirmed(false)
    setSubmitted(false)
    setFormFeedback('')
  }

  // Validação antes da confirmação

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setSubmitted(true)
    setFormFeedback('')

    if (!validQuantity || !confirmed) {
      return
    }

    setActiveDialog('modal')
  }

  // Confirmação do registro simulado

  function confirmRegistration() {
    if (!validQuantity || !confirmed) return

    setFormFeedback(
      `Linha ${line}: ${numericQuantity.toLocaleString('pt-BR')} ${unit} conferidos. Registro simulado com sucesso.`
    )

    closeDialog()
  }

  return (
    <main className="demo" data-theme={theme}>

      {/* Cabeçalho */}

      <header className="demo-header">
        <div>
          <h1>Central QA</h1>
          <p>Design System — v0.1.0</p>
        </div>

        <Button
          variant="secondary"
          icon={
            theme === 'light'
              ? <Moon size={20} />
              : <Sun size={20} />
          }
          onClick={toggleTheme}
        >
          {theme === 'light' ? 'Tema escuro' : 'Tema claro'}
        </Button>
      </header>

      <div className="demo-grid">

        {/* Biblioteca de componentes */}

        <Card className="demo-panel">
          <h2>Componentes</h2>
          <p>Biblioteca compartilhada da Central QA.</p>

          <h3>Variantes</h3>

          <div className="demo-row">
            <Button
              onClick={() => setMessage('Confirmação testada.')}
            >
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

          <h3>Tamanhos</h3>

          <div className="demo-row">
            <Button size="sm">Pequeno</Button>
            <Button size="md">Padrão</Button>
            <Button size="lg">Grande</Button>
          </div>

          <h3>Estados dos botões</h3>

          <div className="demo-row">
            <Button isLoading>Salvando...</Button>
            <Button disabled>Indisponível</Button>
          </div>

          <h3>Estados operacionais</h3>

          <div className="demo-row">
            <StatusBadge>Sem operador</StatusBadge>
            <StatusBadge tone="success">Em atuação</StatusBadge>
            <StatusBadge tone="warning">Em almoço</StatusBadge>
            <StatusBadge tone="danger">Divergência</StatusBadge>
            <StatusBadge tone="info">Disponível</StatusBadge>
          </div>

          <h3>Painéis de interação</h3>

          <div className="demo-row">
            <Button
              variant="secondary"
              onClick={() => setActiveDialog('drawer')}
            >
              Consultar linha A
            </Button>
          </div>

          <p className="demo-feedback" role="status">
            {message}
          </p>
        </Card>

        {/* Formulário de conferência */}

        <Card className="demo-panel">

          <div className="demo-section-header">
            <div>
              <h2>Conferência de entrada</h2>
              <p>Registre o saldo físico encontrado na linha.</p>
            </div>

            <StatusBadge tone="info">
              Simulação
            </StatusBadge>
          </div>

          <form
            className="demo-form"
            onSubmit={handleSubmit}
            onChange={() => setFormFeedback('')}
            noValidate
          >

            <div className="demo-form-grid">

              <Input
                label="Unidade operacional"
                value="RC01"
                disabled
              />

              <Select
                label="Linha"
                value={line}
                onChange={event => setLine(event.target.value)}
              >
                {lines.map(item => (
                  <option key={item} value={item}>
                    Linha {item}
                  </option>
                ))}
              </Select>

              <Select
                label="Unidade de medida"
                value={unit}
                onChange={event =>
                  setUnit(event.target.value as 'pallets' | 'totes')
                }
              >
                <option value="pallets">Pallets</option>
                <option value="totes">Totes</option>
              </Select>

              <Input
                label="Quantidade física"
                type="number"
                min={0}
                step={1}
                value={quantity}
                placeholder="Ex.: 12"
                error={quantityError}
                required
                onChange={event => setQuantity(event.target.value)}
              />

            </div>

            <div className="demo-conversion">
              <span>Equivalência calculada</span>

              <div className="demo-conversion-values">
                <div>
                  <strong>
                    {validQuantity
                      ? totalTotes.toLocaleString('pt-BR')
                      : '—'}
                  </strong>
                  <span>Totes</span>
                </div>

                <div>
                  <strong>
                    {validQuantity
                      ? (totalTotes / 20).toLocaleString('pt-BR')
                      : '—'}
                  </strong>
                  <span>Pallets equivalentes</span>
                </div>
              </div>

              <small>1 pallet equivalente = 20 totes</small>
            </div>

            <Textarea
              label="Descrição da ação"
              placeholder="Descreva brevemente a situação encontrada..."
              hint="Campo opcional nesta simulação."
              rows={2}
              value={description}
              onChange={event => setDescription(event.target.value)}
            />

            <div className="demo-confirmation">

              <Checkbox
                label="Conferência física realizada"
                checked={confirmed}
                aria-invalid={submitted && !confirmed}
                aria-describedby={
                  submitted && !confirmed
                    ? 'confirmation-error'
                    : undefined
                }
                onChange={event => setConfirmed(event.target.checked)}
              />

              {submitted && !confirmed && (
                <small
                  id="confirmation-error"
                  className="demo-error"
                >
                  Confirme a conferência física antes de registrar.
                </small>
              )}

            </div>

            <div className="demo-form-actions">
              <Button
                variant="secondary"
                onClick={resetForm}
              >
                Limpar
              </Button>

              <Button type="submit">
                Registrar entrada
              </Button>
            </div>

            {formFeedback && (
              <div className="demo-success" role="status">
                {formFeedback}
              </div>
            )}

          </form>
        </Card>

      </div>

      {/* Modal de confirmação */}

      <Modal
        open={activeDialog === 'modal'}
        onClose={closeDialog}
        title="Confirmar conferência"
        description="Revise os dados antes de registrar sua entrada."
        footer={
          <>
            <Button variant="secondary" onClick={closeDialog}>
              Voltar
            </Button>

            <Button onClick={confirmRegistration}>
              Confirmar registro
            </Button>
          </>
        }
      >
        <div className="demo-dialog-content">

          <dl className="demo-dialog-details">
            <dt>Unidade</dt>
            <dd>RC01</dd>

            <dt>Linha</dt>
            <dd>Linha {line}</dd>

            <dt>Responsável</dt>
            <dd>Operador fictício</dd>
          </dl>

          <div className="demo-conversion">
            <span>Quantidade informada</span>

            <div className="demo-conversion-values">
              <div>
                <strong>
                  {numericQuantity.toLocaleString('pt-BR')}
                </strong>
                <span>
                  {unit === 'pallets' ? 'Pallets' : 'Totes'}
                </span>
              </div>

              <div>
                <strong>
                  {unit === 'pallets'
                    ? totalTotes.toLocaleString('pt-BR')
                    : (totalTotes / 20).toLocaleString('pt-BR')}
                </strong>

                <span>
                  {unit === 'pallets'
                    ? 'Totes equivalentes'
                    : 'Pallets equivalentes'}
                </span>
              </div>
            </div>
          </div>

          <div className="demo-dialog-description">
            <strong>Descrição da ação</strong>
            <p>{description.trim() || 'Nenhuma descrição informada.'}</p>
          </div>

          <div>
            <StatusBadge tone="success">
              Conferência física realizada
            </StatusBadge>
          </div>

        </div>
      </Modal>

      {/* Drawer de detalhes */}

      <Drawer
        open={activeDialog === 'drawer'}
        onClose={closeDialog}
        title="Linha A"
        description="RC01 — Consulta operacional simulada"
        footer={
          <Button variant="secondary" onClick={closeDialog}>
            Fechar
          </Button>
        }
      >
        <div className="demo-dialog-content">

          <Card compact>
            <div className="demo-conversion-values">
              <div>
                <strong>240</strong>
                <span>Totes pendentes</span>
              </div>

              <div>
                <strong>12</strong>
                <span>Pallets equivalentes</span>
              </div>
            </div>
          </Card>

          <dl className="demo-dialog-details">
            <dt>Responsável</dt>
            <dd>Operador A</dd>

            <dt>Turno</dt>
            <dd>T1</dd>

            <dt>Saldo físico calculado</dt>
            <dd>12 pallets</dd>
          </dl>

          <div>
            <StatusBadge tone="success">
              Em atuação
            </StatusBadge>
          </div>

          <div className="demo-history">
            <h3>Histórico operacional</h3>

            {movements.map(movement => (
              <div
                key={movement.time}
                className="demo-history-event"
              >
                <span className="demo-history-time">
                  {movement.time}
                </span>

                <div>
                  <strong>{movement.action}</strong>
                  <small>{movement.operator}</small>
                </div>
              </div>
            ))}
          </div>

        </div>
      </Drawer>

    </main>
  )
}

export default App
