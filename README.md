# 🌍 EcoScore - Your Path to Sustainable Living

EcoScore is a modern web application that helps users track and improve their environmental impact through an engaging, gamified experience. Built with Next.js 15 and Supabase, it combines personalized sustainability tracking with social features to make environmental consciousness both fun and actionable.

## ✨ Features

- **🎯 Personalized Dashboard**
  - Track your environmental impact score
  - Visualize your progress with interactive charts
  - Get tailored recommendations for improvement

- **🎮 Gamification Elements**  
  - Earn achievements for eco-friendly actions
  - Compete on leaderboards
  - Progress through different sustainability tiers

- **📱 Responsive Design**
  - Fully responsive UI using Tailwind CSS
  - Smooth animations with Framer Motion
  - Accessible interface using Radix UI components

## 🛠️ Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) 15.2, React 19, TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/)
- **Authentication**: [Supabase Auth](https://supabase.com/auth)
- **Database**: [Supabase](https://supabase.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ecosphere.git
cd ecosphere
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```
Fill in your Supabase credentials in `.env.local`

4. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🔧 Environment Variables

Create a `.env.local` file with the following variables:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📦 Build

To create a production build:

```bash
pnpm build
pnpm start
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- Design inspiration from Duolingo and Chess.com
- Built with [shadcn/ui](https://ui.shadcn.com/) components
- Icons from [Lucide](https://lucide.dev/)
