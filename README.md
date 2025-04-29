# Social Network Application

Welcome to my Social Network application! This project demonstrates the full-stack development skills I gained during the John Bryce Full Stack Development course.

## Features
- User authentication and profile management
- Post creation and interaction
- Real-time updates with Socket.IO
- Following/follower system
- AWS S3 integration for image uploads

## Technologies Used
- **Frontend**: React, Redux Toolkit, TypeScript, PrimeReact
- **Backend**: Node.js, Express, TypeScript
- **Database**: MySQL
- **Real-time Communication**: Socket.IO
- **Cloud Storage**: AWS S3 (LocalStack for development)

## Getting Started

### Prerequisites
- Docker and Docker Compose
- Make sure the following ports are available:
  - 3306: MySQL
  - 3000: Backend API
  - 5173: Frontend
  - 3003: Socket.IO server
  - 4566, 4510-4559: LocalStack (AWS S3 simulation)

### Installation
1. Clone this repository
2. Run the application stack: docker-compose up -d
3. The application will be available at http://localhost:5173

### Test Users
All users share the same password: `123456`

Available usernames:
- annie123
- bobby456
- (and 6 other users listed in the database/social_network_db.sql file)

## Project Structure
- **frontend**: React application
- **backend**: Express API server
- **io**: Socket.IO server for real-time features
- **database**: MySQL database setup and initial data

## Feedback
Thank you for checking out my project! Any feedback or suggestions are greatly appreciated.