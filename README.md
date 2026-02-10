# School Club Discovery Engine

A responsive React application for discovering and exploring school clubs at Alliance High School.

## Features

- **56 Real Clubs**: All clubs, CTSOs, organizations, and competitions from the school
- **Smart Search**: Filter clubs by name in real-time
- **Category Filters**: Browse by Tech, Sports, Arts, Academic, or Community
- **Detailed Information**: Each club card displays:
  - Club name and description
  - Meeting days and times
  - Sponsor/teacher information
  - Color-coded category tags
- **Responsive Design**: Beautiful layout that works on mobile, tablet, and desktop

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Technology Stack

- **React 18** - Modern UI framework
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **PostCSS** - CSS processing

## Project Structure

```
clubs/
├── src/
│   ├── components/
│   │   └── ClubCard.jsx      # Individual club card component
│   ├── data/
│   │   └── clubsData.js      # All 56 clubs with details
│   ├── App.jsx               # Main app with search and filters
│   ├── main.jsx              # React app entry point
│   └── index.css             # Tailwind imports
├── index.html                # HTML entry point
├── package.json              # Dependencies
├── vite.config.js            # Vite configuration
└── tailwind.config.js        # Tailwind configuration
```

## Club Categories

- **Tech** (7 clubs): Robotics, coding, cybersecurity, aerospace
- **Sports** (5 clubs): E Sports, mountain biking, pickle ball, flag corp
- **Arts** (3 clubs): Art club, K-Pop dance, melody of alliance
- **Academic** (31 clubs): Honor societies, olympiads, FBLA, DECA, debate, and more
- **Community** (10 clubs): Service organizations, diversity clubs, peer tutors

## Screenshots

### All Clubs View
![All 56 clubs displayed in a responsive grid](https://github.com/user-attachments/assets/c6d55b6c-7dea-4189-ac9e-b5edc8e820c4)

### Tech Category Filter
![Filtered to show only 7 tech-related clubs](https://github.com/user-attachments/assets/9f165db0-27eb-4a2d-893a-146b12b52053)

### Search Functionality
![Search for "robotics" shows FIRST Robotics and Vex Robotics](https://github.com/user-attachments/assets/bae951d1-fde9-4caa-8845-a94c45e8d516)

## Contributing

This project was built to help students discover extracurricular opportunities. To update club information:

1. Edit `src/data/clubsData.js`
2. Update club details (name, description, meeting times, sponsors)
3. Test locally with `npm run dev`
4. Build and deploy with `npm run build`

## License

MIT