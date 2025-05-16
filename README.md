EcoScore: Your Personalized Path to Sustainable Living
🌍 EcoScore is a web app that empowers users to understand and reduce their environmental footprint through a fun, gamified experience. Built for a hackathon, it combines a carbon footprint quiz, personalized recommendations, and a competitive league system inspired by Duolingo and Chess.com to make sustainability engaging and actionable.
Problem
Many want to live sustainably but struggle with:

Unknown environmental impact.
Overwhelming or vague advice.
Lack of connection to local eco-communities.

Solution
EcoScore delivers:

A quick quiz to calculate your EcoScore (0–100).
Tailored, high-impact recommendations.
A vibrant dashboard with charts and progress tracking.
A league system (Bronze, Silver, Gold) with a leaderboard to compete against mock players.
Gamified elements: badges, trend indicators, eco-avatars, and milestone celebrations.

Features

Carbon Footprint Quiz: 5 questions (transport, food, energy, flights, waste) to compute your EcoScore.
Visual Dashboard: Pie chart of impact areas, progress bar, and badge gallery.
Personalized Recommendations: Actionable tips (e.g., “Switch to LEDs”) with CO2 savings on hover.
League System: Rank in Bronze, Silver, or Gold tiers, compete on a leaderboard, and earn rank-up animations.
Gamification: Badges for completed actions, trend indicators, eco-avatars that evolve, quick tip pop-ups, and a mock social sharing feature.
Responsive UI: Mobile-first design with Tailwind CSS and Framer Motion animations.

Tech Stack

Frontend: React, Tailwind CSS, Framer Motion (animations), Chart.js (visuals).
Data: Static JSON for quiz, recommendations, and mock leaderboard.
Storage: localStorage for EcoScore, badges, and league progress.
Dependencies: CDN-hosted for speed (React, Tailwind, Chart.js, Framer Motion, Font Awesome).

Setup

Clone the repo:git clone <repo-url>


Open index.html in a browser (no server needed, runs locally).
Test on Chrome or Firefox for best compatibility.

Demo Strategy

2-Minute Pitch: Show landing → quiz → dashboard → leaderboard → rank-up animation.
Narrative: “EcoScore makes sustainability simple, competitive, and fun.”
Slides: Problem, Solution, League System, SDG Impact (11, 12, 13), Future Vision.
Visuals: Highlight responsive UI, animations, and leaderboard in a recorded demo.

Why EcoScore?

Innovative: Combines personalization, gamification, and competition.
Impactful: Aligns with UN SDGs (Sustainable Cities, Responsible Consumption, Climate Action).
Scalable: Client-side MVP ready for backend/API integration (e.g., Grok API for dynamic tips).

Future Enhancements

Real-time leaderboards with user data.
Local business integration via geolocation.
AI-generated tips using Grok API.
Progressive Web App capabilities.

Hackathon Context
Built in ~24 hours for a hackathon, EcoScore delivers a polished, engaging MVP that’s easy to demo and resonates with users and judges alike. Try it and climb the leaderboard! 🌿
