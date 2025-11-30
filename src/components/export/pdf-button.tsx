'use client'

import { useState, useEffect } from 'react'
import { exportToPDF } from '@/lib/export-pdf'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface PDFButtonProps {
  elementId?: string
  filename?: string
  className?: string
  variant?: 'button' | 'icon'
}

export function PDFButton({
  elementId = 'main-content',
  filename = 'ONE-Development-Strategy',
  className = '',
  variant = 'button',
}: PDFButtonProps) {
  const [isExporting, setIsExporting] = useState(false)

  // Listen for export-pdf event from command palette
  useEffect(() => {
    const handleExport = () => {
      handleExportPDF()
    }

    window.addEventListener('export-pdf', handleExport)
    return () => window.removeEventListener('export-pdf', handleExport)
  }, [])

  const handleExportPDF = async () => {
    if (isExporting) return

    setIsExporting(true)
    toast.loading('Generating PDF...', { id: 'pdf-export' })

    try {
      await exportToPDF(elementId, {
        filename,
        title: 'ONE DEVELOPMENT',
        subtitle: 'Strategic Platform 2026',
      })

      toast.success('PDF exported successfully!', { id: 'pdf-export' })
    } catch (error) {
      console.error('PDF export error:', error)
      toast.error('Failed to export PDF. Please try again.', { id: 'pdf-export' })
    } finally {
      setIsExporting(false)
    }
  }

  if (variant === 'icon') {
    return (
      <button
        onClick={handleExportPDF}
        disabled={isExporting}
        className={cn(
          'w-10 h-10 rounded-xl bg-white/5 border border-white/10',
          'flex items-center justify-center transition-all',
          'hover:bg-white/10 hover:scale-105',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )}
        aria-label="Export to PDF"
      >
        {isExporting ? (
          <svg className="w-5 h-5 animate-spin text-[var(--primary)]" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )}
      </button>
    )
  }

  return (
    <button
      onClick={handleExportPDF}
      disabled={isExporting}
      className={cn(
        'flex items-center gap-2 px-4 py-2 rounded-xl',
        'bg-white/5 border border-white/10 text-[var(--text)]',
        'hover:bg-white/10 transition-all hover:scale-105',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
    >
      {isExporting ? (
        <>
          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span>Exporting...</span>
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Export PDF</span>
        </>
      )}
    </button>
  )
}
