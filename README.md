# Company Research App

A professional, dynamic company research platform that provides comprehensive insights about any company through text search or image upload.

## Features

### 🔍 Dual Research Methods
- **Text Search**: Enter company name and get instant comprehensive data
- **Image Upload**: Upload business card images (front & back) for automated analysis

### 📊 Comprehensive Data Display
Organized sections displaying:
- Company Information (Name, Founded, CEO, Industry, etc.)
- Company Summary
- Social Media Accounts
- Follower Statistics
- Pain Points & Issues Analysis

### 📜 Research History
- Track all past searches
- Filter by search type (text/image)
- Quick access to previous results
- Clear history management

### 🎨 Modern UI/UX
- Responsive design for all devices
- Beautiful gradient backgrounds
- Smooth animations and transitions
- Loading states during data fetching
- Professional color scheme

## Tech Stack

- **Framework**: Next.js 14 (React)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **HTTP Client**: Axios
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:4000](http://localhost:4000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to complete deployment

### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js and configure settings
6. Click "Deploy"

## Project Structure

```
COMPANY_RESEARCH_APP/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing page
│   ├── research/
│   │   └── page.tsx         # Research input page
│   ├── results/
│   │   └── page.tsx         # Results display page
│   └── history/
│       └── page.tsx         # History page
├── public/                   # Static assets
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── tailwind.config.js       # Tailwind config
├── next.config.js           # Next.js config
└── README.md               # Documentation
```

## API Endpoints

### Text Webhook
- **URL**: `https://n8n.srv812138.hstgr.cloud/webhook/chat_webhook`
- **Method**: POST
- **Body**: `{ "company_name": "string" }`

### Image Webhook
- **URL**: `https://n8n.srv812138.hstgr.cloud/webhook/image_send`
- **Method**: POST
- **Body**: FormData with `front_image` and/or `back_image`

## Features in Detail

### Landing Page
- Attractive hero section with call-to-action
- Feature highlights
- Smooth navigation to research page

### Research Page
- Tab-based interface for text/image input
- Real-time validation
- Loading states during API calls
- Error handling with user-friendly messages

### Results Page
- Organized data sections with color-coded headers
- Collapsible pain points section
- Social media links with branded colors
- Print functionality
- Quick access to new search and history

### History Page
- Chronological list of all searches
- Filter by search type
- View previous results
- Delete individual items
- Clear all history option

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is proprietary software.

## Support

For issues or questions, please contact the development team.

