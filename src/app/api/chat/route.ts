import { NextResponse } from 'next/server'
import { PAGE_CONTEXT } from '@/data/page-context'

export const runtime = 'edge'

const SYSTEM_PROMPT = `You are the ONE Development AI Assistant, an expert on ONE Development's 2026 strategy, digital transformation initiatives, and the One Residence project in Abu Dhabi.

You have comprehensive knowledge about:
- ONE Development's 2026 strategic blueprint and vision
- The Five Pillars of Intelligence (Clients, Staff, Company Operations, Business Partners, Projects & Buildings)
- AI ecosystem and digital transformation initiatives
- The ONE App unified platform
- All delivered platforms, in-progress initiatives, and planned projects
- The leadership team and their roles
- One Residence project details (units, pricing, amenities, timeline, etc.)

Here is your knowledge base:
${PAGE_CONTEXT}

Guidelines:
1. Be helpful, professional, and knowledgeable
2. Provide specific data and numbers when available (prices, unit counts, dates, etc.)
3. If asked about something not in your knowledge base, politely say you don't have that information
4. Keep responses concise but informative
5. Use markdown formatting for better readability when listing information
6. When discussing prices, use AED currency format
7. Be enthusiastic about ONE Development's vision and projects

If the user asks a greeting or general question, introduce yourself briefly and offer to help with information about the strategy, projects, or initiatives.`

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    const lastMessage = messages[messages.length - 1]?.content || ''

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        message: getFallbackResponse(lastMessage)
      })
    }

    // Call OpenAI API directly
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages.map((m: { role: string; content: string }) => ({
            role: m.role,
            content: m.content,
          })),
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('OpenAI API error:', error)
      return NextResponse.json({
        message: getFallbackResponse(lastMessage)
      })
    }

    const data = await response.json()
    const assistantMessage = data.choices?.[0]?.message?.content || getFallbackResponse(lastMessage)

    return NextResponse.json({ message: assistantMessage })
  } catch (error) {
    console.error('Chat API error:', error)
    const { messages } = await req.json().catch(() => ({ messages: [] }))
    return NextResponse.json({
      message: getFallbackResponse(messages[messages.length - 1]?.content || '')
    })
  }
}

// Fallback responses when OpenAI is not available
function getFallbackResponse(query: string): string {
  const q = query.toLowerCase()

  // One Residence specific
  if (q.includes('one residence') || q.includes('project') || q.includes('residence')) {
    return `**One Residence** is ONE Development's flagship project on Al Reem Island, Abu Dhabi.

**Key Details:**
- 📍 Location: Al Reem Island, Abu Dhabi
- 🏢 196 premium units across 32 floors (G+31)
- 💰 Total Revenue: AED 452M
- 📅 Launch: 09 December 2025
- 🎯 Completion: June 2028
- 🅿️ 244 parking spaces

**Unit Mix:**
- 1 Bedroom: 76 units (AED 1.4M - 2.3M)
- 2 Bedroom: 85 units (AED 1.9M - 3.9M)
- 3 Bedroom: 32 units (AED 2.8M - 4.5M)
- 4 Bedroom: 2 units (AED 5.6M - 5.9M)
- Retail: 1 unit (AED 7.2M)

What specific aspect would you like to know more about?`
  }

  // Units/pricing
  if (q.includes('unit') || q.includes('price') || q.includes('bedroom') || q.includes('cost')) {
    return `**One Residence Unit Types & Pricing:**

| Type | Units | Size (sqft) | Price Range |
|------|-------|-------------|-------------|
| 1BR Simplex | 63 | 875-1,300 | AED 1.4M-2.1M |
| 1BR Duplex | 13 | 968-1,309 | AED 1.6M-2.3M |
| 2BR Simplex | 74 | 1,371-1,867 | AED 1.9M-2.7M |
| 2BR Duplex | 11 | 1,935-2,421 | AED 3.0M-3.9M |
| 3BR Simplex | 20 | 1,926-2,485 | AED 2.8M-3.6M |
| 3BR Duplex | 12 | 2,275-2,786 | AED 3.2M-4.5M |
| 4BR Duplex | 2 | 3,196-3,352 | AED 5.6M-5.9M |

All units include store. 2BR+ units include maid's room. Duplex units feature multi-level living.`
  }

  // Amenities
  if (q.includes('amenity') || q.includes('amenities') || q.includes('facility') || q.includes('facilities')) {
    return `**One Residence Amenities:**

🌟 **Premium:**
- HBOT Facility - First residential Hyperbaric Oxygen Therapy in Abu Dhabi!

🏊 **Recreation:**
- Swimming Pool (Main + Kids)
- Mini Golf Course
- Multi-purpose Sports Court
- Outdoor Theatre

💪 **Fitness & Wellness:**
- Indoor & Outdoor Gym
- Yoga/Pilates Studio
- Wellness Spa with Sauna

👨‍👩‍👧‍👦 **Family & Social:**
- Kids Playground
- BBQ Area
- Multi-Purpose Hall
- Retail Space (Café, Pharmacy)`
  }

  // Payment plan
  if (q.includes('payment') || q.includes('plan') || q.includes('installment')) {
    return `**One Residence Payment Plan (50/50 Structure):**

📍 **Down Payment:** 10% at booking

🏗️ **During Construction (40%):**
- Monthly instalments over 24 months
- Regular months: 1% each
- Every 6th month: 5%

🔑 **On Handover:** 50%

This flexible plan makes luxury living accessible while you watch your investment grow!`
  }

  // Team
  if (q.includes('team') || q.includes('leadership') || q.includes('who')) {
    return `**Strategy & Digital Transformation Team:**

👤 **Jason D'Costa** - Strategic Operations, Platforms, Solutions & AI Concepts
👤 **Dhananjay Shembekar (DJ)** - MIS, Platforms & AI Integrations
👤 **Ahmed Saad** - Financials, Project Control & Opportunity Analysis
👤 **Tamara Strygun** - Coordination, Solution Funnel Management & Requirements Monitoring
👤 **Norton Araujo** - Inventory Control & Management

Led by **Amr Kandeel & Jason D'Costa**, reporting to **Mr. Ali – Chairman**`
  }

  // Strategy
  if (q.includes('strategy') || q.includes('2026') || q.includes('vision') || q.includes('pillar')) {
    return `**ONE Development 2026 Strategic Blueprint:**

🎯 **Five Pillars of Intelligence:**
1. **Clients** - Personalized experiences & seamless interactions
2. **Staff** - AI-powered productivity & automation
3. **Company Operations** - Intelligent workflows & insights
4. **Business Partners** - Connected ecosystem & collaboration
5. **Projects & Buildings** - Smart construction & AI buildings

📊 **2026 KPI Targets:**
- 26+ Platforms Live
- 60%+ Process Automation
- 90%+ User Adoption
- 100% Data Integration
- 80%+ AI-Enhanced Decisions`
  }

  // Initiatives
  if (q.includes('initiative') || q.includes('platform') || q.includes('delivered') || q.includes('progress')) {
    return `**Digital Transformation Status:**

✅ **8 Platforms Delivered:**
Power BI Dashboards, Projects Live Stack, Digital Discount Calculator, Sales Gateway, Plots Pricing Map, Interactive Strategy Map, Land Tracker, LOI Tracker

⚡ **9 In Progress:**
HR Chatbot, Salesforce Implementation, Price Prism Builder, iLeads App, Sales & Inventory Chatbot, Customer Portal, Broker Commission Portal, Document Management, Inventory Allocation Engine

🚀 **Upcoming in 2026:**
AI Commission Engine, AI Feasibility Engine, VR Integration, Advanced Analytics, Predictive Lead Scoring, and more!`
  }

  // Default
  return `👋 Hi! I'm the ONE Development AI Assistant.

I can help you with information about:
- 🏢 **One Residence** - Our flagship Abu Dhabi project
- 📊 **2026 Strategy** - Digital transformation roadmap
- 💰 **Units & Pricing** - All unit types and costs
- 🎯 **Amenities** - World-class facilities
- 👥 **Team** - Leadership and departments
- ⚡ **Initiatives** - Delivered and upcoming platforms

What would you like to know?`
}
