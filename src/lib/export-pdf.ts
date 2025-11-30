import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

export interface ExportOptions {
  filename?: string
  title?: string
  subtitle?: string
  includeDate?: boolean
  quality?: number
}

export async function exportToPDF(
  elementId: string,
  options: ExportOptions = {}
): Promise<void> {
  const {
    filename = 'ONE-Development-Report',
    title = 'ONE DEVELOPMENT',
    subtitle = 'Strategic Platform 2026',
    includeDate = true,
    quality = 2,
  } = options

  const element = document.getElementById(elementId)
  if (!element) {
    throw new Error(`Element with id "${elementId}" not found`)
  }

  // Show loading state
  const loadingDiv = document.createElement('div')
  loadingDiv.id = 'pdf-loading'
  loadingDiv.innerHTML = `
    <div style="position: fixed; inset: 0; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 9999;">
      <div style="text-align: center; color: white;">
        <div style="font-size: 2rem; margin-bottom: 1rem;">📄</div>
        <div style="font-size: 1.25rem; font-weight: bold;">Generating PDF...</div>
        <div style="font-size: 0.875rem; color: #8a8a9a; margin-top: 0.5rem;">Please wait</div>
      </div>
    </div>
  `
  document.body.appendChild(loadingDiv)

  try {
    // Capture the element
    const canvas = await html2canvas(element, {
      scale: quality,
      useCORS: true,
      logging: false,
      backgroundColor: '#0a0a0f',
    })

    // Calculate dimensions
    const imgWidth = 210 // A4 width in mm
    const pageHeight = 297 // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    const totalPages = Math.ceil(imgHeight / pageHeight)

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4')

    // Add header to first page
    addHeader(pdf, title, subtitle, includeDate)

    // Add content
    const imgData = canvas.toDataURL('image/jpeg', 0.95)
    let heightLeft = imgHeight
    let position = 25 // Start after header

    // First page
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight)
    heightLeft -= (pageHeight - position)

    // Additional pages
    while (heightLeft > 0) {
      pdf.addPage()
      position = heightLeft - imgHeight
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    // Add footer to all pages
    const pageCount = pdf.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i)
      addFooter(pdf, i, pageCount)
    }

    // Save
    const dateStr = new Date().toISOString().split('T')[0]
    pdf.save(`${filename}-${dateStr}.pdf`)
  } finally {
    // Remove loading
    document.getElementById('pdf-loading')?.remove()
  }
}

function addHeader(
  pdf: jsPDF,
  title: string,
  subtitle: string,
  includeDate: boolean
): void {
  // Brand gradient bar
  pdf.setFillColor(216, 109, 203)
  pdf.rect(0, 0, 210, 3, 'F')

  // Title
  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(16)
  pdf.setTextColor(216, 109, 203)
  pdf.text(title, 10, 12)

  // Subtitle
  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(10)
  pdf.setTextColor(100, 100, 100)
  pdf.text(subtitle, 10, 18)

  // Date
  if (includeDate) {
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    pdf.text(date, 200, 12, { align: 'right' })
  }

  // Separator
  pdf.setDrawColor(216, 109, 203)
  pdf.setLineWidth(0.5)
  pdf.line(10, 22, 200, 22)
}

function addFooter(pdf: jsPDF, pageNum: number, totalPages: number): void {
  const pageHeight = pdf.internal.pageSize.height

  // Footer line
  pdf.setDrawColor(200, 200, 200)
  pdf.setLineWidth(0.2)
  pdf.line(10, pageHeight - 15, 200, pageHeight - 15)

  // Page number
  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(8)
  pdf.setTextColor(100, 100, 100)
  pdf.text(`Page ${pageNum} of ${totalPages}`, 105, pageHeight - 10, { align: 'center' })

  // Branding
  pdf.setTextColor(216, 109, 203)
  pdf.text('ONE DEVELOPMENT', 10, pageHeight - 10)

  // Confidential
  pdf.setTextColor(150, 150, 150)
  pdf.text('Confidential', 200, pageHeight - 10, { align: 'right' })
}

export async function exportElementToPDF(
  element: HTMLElement,
  filename: string = 'export'
): Promise<void> {
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#0a0a0f',
  })

  const pdf = new jsPDF('p', 'mm', 'a4')
  const imgData = canvas.toDataURL('image/jpeg', 0.95)
  const imgWidth = 190
  const imgHeight = (canvas.height * imgWidth) / canvas.width

  pdf.addImage(imgData, 'JPEG', 10, 10, imgWidth, imgHeight)
  pdf.save(`${filename}.pdf`)
}
