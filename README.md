# 🚀 CareerBooster - AI-Powered CV Analysis & Career Enhancement Platform

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.5-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React Native](https://img.shields.io/badge/React%20Native-0.72-blue.svg)](https://reactnative.dev/)
[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://www.oracle.com/java/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue.svg)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

**CareerBooster** is an intelligent career enhancement platform that leverages AI to analyze CVs, provide personalized feedback, and recommend relevant courses. Built for students and professionals seeking to optimize their career prospects through data-driven insights.

### 🌟 Key Highlights
- **AI-Powered Analysis**: Uses Google Gemini AI for intelligent CV evaluation
- **Real-time Scoring**: Instant feedback on CV quality across multiple dimensions
- **Course Recommendations**: Personalized learning paths based on skill gaps
- **Modern Architecture**: Full-stack application with Spring Boot & React Native
- **Secure Authentication**: JWT-based security with role-based access

## ✨ Features

### 🔍 CV Analysis Engine
- **Intelligent Parsing**: Extract and analyze CV content from PDF/DOC files
- **Multi-dimensional Scoring**: Evaluate contact info, experience, education, skills
- **Gap Analysis**: Identify missing sections and improvement opportunities
- **Industry-specific Insights**: Tailored recommendations by field

### 📱 Mobile-First Experience
- **Cross-platform**: React Native app for iOS and Android
- **Intuitive UI**: Clean, modern interface with smooth navigation
- **Real-time Updates**: Live feedback and progress tracking
- **Offline Support**: Core features available without internet

### 🎓 Smart Recommendations
- **Course Matching**: AI-powered course suggestions from Coursera
- **Skill Gap Analysis**: Identify and bridge professional skill gaps
- **Career Path Guidance**: Personalized roadmaps for career advancement
- **Progress Tracking**: Monitor learning journey and achievements

### 🛡️ Enterprise Security
- **JWT Authentication**: Secure token-based authentication
- **Data Encryption**: End-to-end encryption for sensitive data
- **CORS Protection**: Secure cross-origin resource sharing
- **Input Validation**: Comprehensive data validation and sanitization

## 🛠️ Tech Stack

### Backend
- **Framework**: Spring Boot 3.2.5
- **Language**: Java 17
- **Database**: PostgreSQL / H2 (development)
- **ORM**: Hibernate with Spring Data JPA
- **Security**: Spring Security + JWT
- **AI Integration**: Google Gemini AI API
- **Documentation**: OpenAPI 3.0 (Swagger)
- **Build Tool**: Maven

### Frontend
- **Framework**: React Native 0.72
- **Language**: JavaScript/TypeScript
- **Navigation**: React Navigation
- **State Management**: Redux Toolkit
- **UI Components**: Native Base / React Native Elements
- **Development**: Expo CLI

### DevOps & Tools
- **Version Control**: Git & GitHub
- **API Testing**: Postman
- **Database Tools**: pgAdmin, H2 Console
- **IDE**: IntelliJ IDEA, VS Code
- **Documentation**: Markdown, Swagger UI

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Native  │    │   Spring Boot   │    │   PostgreSQL    │
│    Frontend     │◄──►│     Backend     │◄──►│    Database     │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Mobile App    │    │   REST APIs     │    │   Data Layer    │
│   - CV Upload   │    │   - Auth        │    │   - Users       │
│   - Analysis    │    │   - CV Analysis │    │   - CVs         │
│   - Courses     │    │   - Courses     │    │   - Scores      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │   Google AI     │
                       │   Gemini API    │
                       └─────────────────┘
```

## 🚀 Getting Started

### Prerequisites
- **Java 17+** installed
- **Node.js 16+** and npm
- **PostgreSQL 13+** (or use H2 for development)
- **Git** for version control
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)

### Backend Setup

1. **Clone the repository**
```bash
git clone https://github.com/YoussefLouzi/CareerBooster-APP.git
cd CareerBooster-APP
```

2. **Configure database** (Optional - H2 is pre-configured)
```properties
# src/main/resources/application.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/careerbooster
spring.datasource.username=your_username
spring.datasource.password=your_password
```

3. **Set up Google Gemini AI API**
```properties
spring.ai.gemini.api-key=your_gemini_api_key
```

4. **Run the backend**
```bash
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd CareerBooster
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npx expo start
```

4. **Run on device/emulator**
```bash
# For Android
npx expo run:android

# For iOS (macOS only)
npx expo run:ios
```

### 🔧 Configuration

#### Environment Variables
Create a `.env` file in the root directory:
```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=careerbooster
DB_USER=your_username
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=86400000

# Google AI
GEMINI_API_KEY=your_gemini_api_key

# Server
SERVER_PORT=8080
```

#### Development vs Production
- **Development**: Uses H2 in-memory database
- **Production**: Configure PostgreSQL connection
- **Security**: Update JWT secrets and API keys for production

## 📚 API Documentation

### Authentication Endpoints
```http
POST /api/auth/register    # User registration
POST /api/auth/login       # User login
GET  /api/auth/profile     # Get user profile
```

### CV Management
```http
POST /api/cv/upload        # Upload CV file
GET  /api/cv/user/{id}     # Get user's CVs
GET  /api/cv/{id}/score    # Get CV analysis score
POST /api/cv/{id}/analyze  # Analyze CV with AI
```

### Course Recommendations
```http
GET  /api/courses/recommendations/{userId}  # Get personalized courses
GET  /api/courses/search                    # Search courses
```

### CV Generator
```http
POST /api/cv-generator/create    # Create new CV
PUT  /api/cv-generator/{id}      # Update CV
GET  /api/cv-generator/{id}      # Get CV details
```

**Interactive API Documentation**: Visit `http://localhost:8080/swagger-ui.html` when the backend is running.

## 🗄️ Database Schema

### Core Entities
- **Users**: Authentication and profile information
- **CVs**: Uploaded CV files and metadata
- **CV_Scores**: Analysis results and scoring
- **CV_Generator**: Generated CV data and templates
- **Personal_Info**: User personal information
- **Education**: Educational background
- **Experience**: Work experience records
- **Projects**: Project portfolios
- **Skills**: Technical and soft skills
- **Certifications**: Professional certifications

### Relationships
```sql
Users (1) ──── (N) CVs
Users (1) ──── (N) CV_Generator
CV_Generator (1) ──── (N) Education
CV_Generator (1) ──── (N) Experience
CV_Generator (1) ──── (N) Projects
CVs (1) ──── (1) CV_Scores
```

## 🧪 Testing

### Backend Testing
```bash
# Run unit tests
mvn test

# Run integration tests
mvn verify

# Generate test coverage report
mvn jacoco:report
```

### Frontend Testing
```bash
# Run Jest tests
npm test

# Run E2E tests
npm run test:e2e
```

## 📱 Mobile App Features

### Screens
- **Authentication**: Login/Register with validation
- **Home Dashboard**: Overview of CV scores and progress
- **CV Upload**: Drag-and-drop file upload with preview
- **Analysis Results**: Detailed scoring with visual charts
- **Course Recommendations**: Personalized learning suggestions
- **CV Generator**: Step-by-step CV creation wizard
- **Profile Management**: User settings and preferences

### Key Components
- **File Upload**: Multi-format support (PDF, DOC, DOCX)
- **Progress Tracking**: Visual indicators for CV improvement
- **Offline Mode**: Core features available without internet
- **Push Notifications**: Updates on analysis completion

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow Java coding standards and Spring Boot best practices
- Write unit tests for new features
- Update documentation for API changes
- Use meaningful commit messages
- Ensure mobile responsiveness for frontend changes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

**CareerBooster Development Team**
- **Backend Development**: Spring Boot, Hibernate, Security
- **Frontend Development**: React Native, Mobile UI/UX
- **AI Integration**: Google Gemini API, Natural Language Processing
- **Database Design**: PostgreSQL, Data Modeling

## 🙏 Acknowledgments

- **Google Gemini AI** for intelligent CV analysis
- **Spring Boot Community** for excellent framework support
- **React Native Team** for cross-platform mobile development
- **Open Source Contributors** for various libraries and tools

## 📞 Support

For support and questions:
- **Email**: support@careerbooster.com
- **GitHub Issues**: [Create an issue](https://github.com/YoussefLouzi/CareerBooster-APP/issues)
- **Documentation**: [Wiki](https://github.com/YoussefLouzi/CareerBooster-APP/wiki)

---

**Made with ❤️ by the CareerBooster Team**

*Empowering careers through intelligent technology*