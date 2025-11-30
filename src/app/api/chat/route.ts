import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    const lastMessage = messages[messages.length - 1]?.content || ''

    // Generate contextual response
    const response = generateResponse(lastMessage)

    return NextResponse.json({ message: response })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json({
      message: 'I apologize, but I encountered an error. Please try again.',
    })
  }
}

function generateResponse(query: string): string {
  const q = query.toLowerCase()

  // Strategy questions
  if (q.includes('strategy') || q.includes('2026') || q.includes('plan')) {
    return 'Our 2026 strategy focuses on three core pillars:\n\n1. **AI-Powered Operations** - 40% efficiency improvement through automation\n2. **PropTech Innovation** - Smart building systems and predictive maintenance\n3. **Customer Excellence** - Enhanced digital experiences and personalization\n\nWe\'re investing AED 150M in digital transformation over the next 3 years.'
  }

  // Project questions
  if (q.includes('project') || q.includes('portfolio') || q.includes('development')) {
    return 'ONE Development\'s portfolio includes:\n\n• **5 Active Projects** across Dubai\'s prime locations\n• **2,500+ Units** in residential and commercial\n• **AED 2.8B** total portfolio value\n• **94% Occupancy** rate across completed projects\n\nOur flagship projects include luxury residences in Dubai Marina, Business Bay, and Downtown.'
  }

  // AI/Technology questions
  if (q.includes('ai') || q.includes('technology') || q.includes('tech') || q.includes('digital')) {
    return 'Our technology roadmap includes:\n\n• **AI Operations Center** - Real-time monitoring and predictive analytics\n• **Smart Building Systems** - IoT sensors, energy optimization\n• **Customer Platform** - Digital sales, virtual tours, mobile app\n• **Data Analytics** - Business intelligence and market insights\n\nWe\'re partnering with leading tech providers to deliver world-class solutions.'
  }

  // Team questions
  if (q.includes('team') || q.includes('leadership') || q.includes('people')) {
    return 'Our leadership team combines decades of real estate expertise with cutting-edge technology vision:\n\n• **342 Employees** across 8 departments\n• **Executive Committee** of industry veterans\n• **Tech Division** of 45+ engineers and data scientists\n• **Award-winning** customer service team\n\nWe\'re always looking for talented individuals to join our mission.'
  }

  // Financial questions
  if (q.includes('revenue') || q.includes('financial') || q.includes('growth') || q.includes('invest')) {
    return 'Financial Highlights:\n\n• **AED 2.8B** total revenue\n• **28% YoY** growth trajectory\n• **12.5%** market share in Dubai luxury segment\n• **AED 150M** technology investment planned\n\nWe maintain strong financial discipline while investing in future growth.'
  }

  // Initiative questions
  if (q.includes('initiative') || q.includes('program') || q.includes('milestone')) {
    return 'Key Strategic Initiatives:\n\n1. **AI Operations** (65% complete) - On track for Q2 delivery\n2. **PropTech Platform** (45% complete) - Beta launch in Q3\n3. **Customer Experience** (72% complete) - Ahead of schedule\n4. **Sustainability** (38% complete) - Green certifications underway\n\nAll initiatives are progressing according to the transformation roadmap.'
  }

  // Default response
  return 'I\'m here to help you understand ONE Development\'s 2026 strategy. You can ask me about:\n\n• **Strategy & Vision** - Our transformation roadmap\n• **Projects** - Portfolio and developments\n• **Technology** - AI and digital initiatives\n• **Team** - Leadership and culture\n• **Financials** - Growth and investments\n\nWhat would you like to know more about?'
}
