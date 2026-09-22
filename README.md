# SYNORA - Synchronized Multi-Agent Business Intelligence

SYNORA is an enterprise-grade Multi-Agent Business Intelligence platform built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Azure AI Foundry**.

Instead of siloed departments reviewing disconnected dashboards, SYNORA orchestrates specialized AI domain agents in parallel to synthesize telemetry into actionable executive strategy.

---

## 🏗️ Architecture & Orchestration

```
[ Browser Client ]
        │
        ▼ (POST /api/chat)
[ Next.js Server-Side API ]  <── Zero credentials exposed to browser
        │
        ▼ (Azure Agent Protocol)
[ Azure AI Foundry Agent Service ]
        │
        ▼ (Target: ManagerOrchestrator)
[ ManagerOrchestrator ]
        ├── 📈 Sales Specialist    (Pipeline velocity, CAC, conversion bottlenecks)
        ├── 💰 Finance Specialist  (Gross margin health, COGS variance, unit economics)
        ├── 📦 Inventory Specialist(SKU velocity, stockout risks, lead times)
        ├── 🎧 Support Specialist  (CSAT metrics, churn indicators, friction points)
        └── 👥 HR Specialist       (Capacity planning, sprint velocity, team workload)
        │
        ▼ (Synthesized Brief + Strategy)
[ Next.js API Normalizer ]
        │
        ▼
[ SYNORA Executive Interface ]
  • Executive Briefs (Summary → Key Drivers → Next Steps)
  • Active Agent Telemetry (Highlighted in Green)
  • Contextual Follow-Up Suggestions
  • Collapsible History Workspace
```

---

## 🌟 Key Features

- **Executive Intelligence Cards**: Clean, structured 3-part briefs (Executive Summary, Key Drivers, Recommended Next Steps) with one-click copy.
- **Active Specialist Badges**: Visual indicator displaying which domain specialists (Sales, Finance, Inventory, Support, HR) collaborated on the inquiry.
- **Collapsible History Workspace**: Full-width adaptable workspace with session search and persistent history.
- **Dynamic Onboarding**: Centered interactive question bar with fast-start multi-agent scenario recommendations.
- **Azure AI Foundry Integration**: Direct connection with `ManagerOrchestrator` deployed on Microsoft Azure.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.18+ or 20+
- npm or yarn

### Installation
1. Clone the repository and install dependencies:
   ```bash
   git clone https://github.com/simma3517/-multi-businessmodel.git
   cd -multi-businessmodel
   npm install
   ```

2. Configure environment variables:
   ```bash
   cp .env.example .env.local
   ```

3. Add your Azure AI Foundry credentials to `.env.local`:
   ```env
   AZURE_AI_FOUNDRY_PROJECT_ENDPOINT=https://your-resource.services.ai.azure.com/api/projects/bizflow-multi-agent
   AZURE_AI_FOUNDRY_OPENAI_ENDPOINT=https://your-resource.services.ai.azure.com/openai/v1
   AZURE_AI_FOUNDRY_API_KEY=your_actual_api_key
   AZURE_AI_FOUNDRY_DEPLOYMENT_NAME=bizflow-model
   AZURE_AI_FOUNDRY_AGENT_NAME=ManagerOrchestrator
   DEMO_MODE=false
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛡️ Security & Responsible AI

- **Zero Client-Side Secrets**: All Azure keys and API calls are strictly handled on server-side Next.js route handlers (`app/api/chat/route.ts`).
- **Sanitized Errors**: Raw server stack traces and API keys are never leaked to client browsers.
- **Protected Environment**: `.env.local` is strictly excluded from version control.

---

## 🚢 Deployment

Deploy seamlessly to [Vercel](https://vercel.com):

1. Import your GitHub repository into Vercel.
2. Under **Project Settings > Environment Variables**, add your `AZURE_AI_FOUNDRY_*` credentials.
3. Click **Deploy**.
