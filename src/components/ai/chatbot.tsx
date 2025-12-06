'use client'

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      })

      const contentType = res.headers.get('content-type')

      if (contentType?.includes('text/plain') || contentType?.includes('text/event-stream')) {
        // Handle streaming response
        const reader = res.body?.getReader()
        const decoder = new TextDecoder()
        let assistantContent = ''

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: '',
        }
        setMessages(prev => [...prev, assistantMessage])

        if (reader) {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            const chunk = decoder.decode(value)
            // Parse SSE data
            const lines = chunk.split('\n')
            for (const line of lines) {
              if (line.startsWith('0:')) {
                // Text delta from AI SDK
                try {
                  const text = JSON.parse(line.slice(2))
                  assistantContent += text
                  setMessages(prev =>
                    prev.map(m =>
                      m.id === assistantMessage.id
                        ? { ...m, content: assistantContent }
                        : m
                    )
                  )
                } catch {
                  // Ignore parse errors
                }
              }
            }
          }
        }
      } else {
        // Handle JSON response (fallback mode)
        const data = await res.json()
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.message || data.text || 'I received your message.',
        }])
      }
    } catch {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      }])
    } finally {
      setIsLoading(false)
    }
  }

  // Render markdown-like content
  const renderContent = (content: string) => {
    const lines = content.split('\n')
    return lines.map((line, idx) => {
      // Bold text
      let processed = line.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      // Handle bullet points
      if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
        processed = `<span class="ml-2">${processed}</span>`
      }
      return (
        <span
          key={idx}
          dangerouslySetInnerHTML={{ __html: processed }}
          className="block"
        />
      )
    })
  }

  const handleQuickQuestion = (question: string) => {
    setInput(question)
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'fixed bottom-6 left-6 z-50 w-14 h-14 rounded-2xl gradient-btn',
          'flex items-center justify-center text-2xl text-white shadow-lg',
          'hover:scale-110 transition-all duration-300'
        )}
        style={{ boxShadow: '0 8px 32px rgba(216, 109, 203, 0.4)' }}
        aria-label="Open AI Assistant"
      >
        {isOpen ? '✕' : '🤖'}
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          'fixed bottom-24 left-6 z-50 w-96 max-w-[calc(100vw-3rem)]',
          'glass rounded-2xl border border-white/20 shadow-2xl overflow-hidden',
          'transition-all duration-300 origin-bottom-left',
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        )}
        style={{ boxShadow: '0 25px 50px -12px rgba(216, 109, 203, 0.25)' }}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-btn flex items-center justify-center text-lg">
            🤖
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-[var(--text)]">ONE AI Assistant</h3>
            <p className="text-xs text-[var(--text-muted)]">Ask me anything about the page</p>
          </div>
          <div className={cn(
            'w-2 h-2 rounded-full',
            isLoading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'
          )} />
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">👋</div>
              <p className="text-[var(--text-muted)] text-sm">
                Hi! I can answer any question about ONE Development&apos;s strategy, One Residence project, unit pricing, amenities, team, and more!
              </p>
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                {['What units are available?', 'Tell me about amenities', 'What is the 2026 strategy?'].map((q) => (
                  <button
                    key={q}
                    onClick={() => handleQuickQuestion(q)}
                    className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10
                             text-[var(--text-muted)] hover:bg-white/10 hover:border-[var(--primary)]/30
                             transition-all cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              <div
                className={cn(
                  'max-w-[85%] px-4 py-2.5 rounded-2xl text-sm',
                  message.role === 'user'
                    ? 'gradient-btn text-white rounded-br-md'
                    : 'bg-white/10 text-[var(--text)] rounded-bl-md'
                )}
              >
                {message.role === 'assistant' ? renderContent(message.content) : message.content}
              </div>
            </div>
          ))}

          {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
            <div className="flex justify-start">
              <div className="bg-white/10 px-4 py-2.5 rounded-2xl rounded-bl-md">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-[var(--primary)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-[var(--primary)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-[var(--primary)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about strategy, units, pricing..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10
                       text-[var(--text)] placeholder-[var(--text-muted)] text-sm
                       focus:outline-none focus:border-[var(--primary)]/50 transition-colors"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-4 py-2.5 rounded-xl gradient-btn text-white font-medium
                       disabled:opacity-50 disabled:cursor-not-allowed
                       hover:scale-105 transition-transform"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
