# Overview

This is a 3D satellite simulator application built with React, Three.js, and Express. The application provides an interactive orbital mechanics simulation where users can control satellites, complete missions, and visualize real-time satellite tracking including the International Space Station (ISS). The simulator features realistic orbital physics calculations, mission-based gameplay, and a comprehensive 3D visualization of Earth and satellites in orbit.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The frontend is built with modern React using TypeScript and Vite as the build tool. The application uses a component-based architecture with:

- **3D Rendering**: React Three Fiber (@react-three/fiber) with Three.js for WebGL-based 3D graphics
- **UI Components**: Radix UI primitives with custom Tailwind CSS styling for a complete design system
- **State Management**: Zustand stores for satellite state, mission management, and audio controls
- **Styling**: Tailwind CSS with PostCSS for utility-first styling and responsive design

The 3D scene architecture centers around a main `SatelliteSimulator` component that orchestrates:
- Earth visualization with procedural textures and cloud layers
- Real-time satellite positioning using orbital mechanics calculations
- ISS tracking with live position data from external APIs
- Interactive camera controls for scene navigation
- Orbital path visualization with dynamic line rendering

## Backend Architecture
The backend uses Express.js with TypeScript running on Node.js. The server architecture includes:

- **API Routes**: RESTful endpoints for satellite data and ISS position proxying
- **Development Server**: Vite integration for hot module replacement in development
- **Static File Serving**: Production build serving with proper asset handling
- **Error Handling**: Centralized error middleware with structured logging

The server acts primarily as an API proxy and static file server, with the core application logic residing in the frontend for real-time 3D interactions.

## Data Storage Solutions
The application uses a hybrid storage approach:

- **Database Schema**: Drizzle ORM with PostgreSQL schema definitions for user management
- **In-Memory Storage**: Temporary storage implementation for development with plans for database integration
- **Client State**: Zustand stores for real-time application state management
- **Local Storage**: Browser storage for user preferences and game state persistence

## External Dependencies

### Real-time Data APIs
- **ISS Position API**: Live International Space Station tracking data from open-notify.org
- **Satellite TLE Data**: Extensible system for Two-Line Element set data for multiple satellites

### 3D Graphics and Audio
- **Three.js Ecosystem**: Core 3D engine with React Three Fiber bindings and Drei utilities
- **Post-processing**: React Three Postprocessing for advanced visual effects
- **GLSL Shaders**: Custom shader support via vite-plugin-glsl for advanced 3D rendering
- **Audio System**: HTML5 Audio API with Zustand state management for sound effects

### Database and ORM
- **Neon Database**: Serverless PostgreSQL database via @neondatabase/serverless
- **Drizzle ORM**: Type-safe database interactions with schema validation using Zod

### Development Tools
- **TypeScript**: Full type safety across frontend and backend
- **Vite**: Fast build tool with HMR and optimized production builds
- **ESBuild**: High-performance bundling for server-side code
- **Replit Integration**: Runtime error overlay and development environment support

The architecture emphasizes real-time performance for 3D rendering while maintaining type safety and scalable data management patterns.