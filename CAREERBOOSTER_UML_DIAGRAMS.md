# 🎯 CareerBooster Application - UML Diagrams

## 📋 Overview

This document contains comprehensive UML diagrams for the CareerBooster application, including use case diagrams, sequence diagrams, and class diagrams that illustrate the complete system architecture and user interactions.

## 🎭 Use Case Diagram

```plantuml
@startuml CareerBooster_UseCase
!theme plain
title CareerBooster Application - Use Case Diagram

left to right direction

actor "Job Seeker" as User
actor "Admin" as Admin
actor "Gemini AI" as AI
actor "Course Provider" as Provider

package "Authentication System" {
  usecase "Register Account" as UC1
  usecase "Login" as UC2
  usecase "Logout" as UC3
  usecase "Reset Password" as UC4
}

package "CV Management" {
  usecase "Create CV" as UC5
  usecase "Edit CV" as UC6
  usecase "Delete CV" as UC7
  usecase "View CV List" as UC8
  usecase "Generate PDF" as UC9
}

package "CV Analysis" {
  usecase "Calculate CV Score" as UC10
  usecase "AI CV Analysis" as UC11
  usecase "View Analysis History" as UC12
  usecase "Get Improvement Suggestions" as UC13
}

package "Course Recommendations" {
  usecase "Generate Course Recommendations" as UC14
  usecase "View Recommended Courses" as UC15
  usecase "Filter Courses" as UC16
  usecase "Enroll in Course" as UC17
  usecase "Track Learning Progress" as UC18
}

package "User Profile" {
  usecase "Update Profile" as UC19
  usecase "Set Career Goals" as UC20
  usecase "Manage Preferences" as UC21
}

package "System Administration" {
  usecase "Manage Users" as UC22
  usecase "Monitor System" as UC23
  usecase "Manage Courses" as UC24
  usecase "View Analytics" as UC25
}

' User relationships
User --> UC1
User --> UC2
User --> UC3
User --> UC4
User --> UC5
User --> UC6
User --> UC7
User --> UC8
User --> UC9
User --> UC10
User --> UC11
User --> UC12
User --> UC13
User --> UC14
User --> UC15
User --> UC16
User --> UC17
User --> UC18
User --> UC19
User --> UC20
User --> UC21

' Admin relationships
Admin --> UC22
Admin --> UC23
Admin --> UC24
Admin --> UC25

' AI relationships
AI --> UC11
AI --> UC13
AI --> UC14

' Provider relationships
Provider --> UC17

' Include relationships
UC11 ..> UC10 : <<include>>
UC14 ..> UC11 : <<include>>
UC13 ..> UC11 : <<include>>
UC9 ..> UC5 : <<include>>

' Extend relationships
UC12 ..> UC11 : <<extend>>
UC16 ..> UC15 : <<extend>>
UC18 ..> UC17 : <<extend>>

@enduml
```

## 🔄 Sequence Diagrams

### 1. CV Generation and PDF Export Sequence

```plantuml
@startuml CV_Generation_Sequence
!theme plain
title CV Generation and PDF Export - Sequence Diagram

actor User
participant "Frontend\n(React Native)" as Frontend
participant "CV Controller" as Controller
participant "CV Service" as Service
participant "PDF Generator" as PDFGen
participant "Database" as DB
participant "File System" as FS

User -> Frontend: Fill CV form and click "Generate PDF"
activate Frontend

Frontend -> Frontend: Validate form data
Frontend -> Controller: POST /api/cv-generator\n{personalInfo, summary, skills, ...}
activate Controller

Controller -> Controller: Authenticate user (JWT)
Controller -> Service: createCV(cvData, userEmail)
activate Service

Service -> DB: Save CV entity
activate DB
DB --> Service: CV saved with ID
deactivate DB

Service -> PDFGen: generateCVAsPdf(cvId, userEmail, template)
activate PDFGen

PDFGen -> DB: Fetch CV data
activate DB
DB --> PDFGen: CV entity with all sections
deactivate DB

PDFGen -> PDFGen: Create PDF document\n- Add personal info\n- Add summary\n- Add skills\n- Add sections
PDFGen -> FS: Generate PDF bytes
activate FS
FS --> PDFGen: PDF byte array
deactivate FS

PDFGen --> Service: PDF bytes
deactivate PDFGen

Service --> Controller: CVGeneratorDTO
deactivate Service

Controller --> Frontend: 201 Created\n{id, personalInfo, createdAt}
deactivate Controller

Frontend -> Frontend: Auto-generate PDF URL
Frontend -> Controller: GET /api/cv-generator/{id}/export/pdf
activate Controller

Controller -> Service: generateCVAsPdf(id, userEmail, template)
activate Service
Service --> Controller: PDF bytes
deactivate Service

Controller --> Frontend: 200 OK\nContent-Type: application/pdf\nPDF binary data
deactivate Controller

Frontend -> Frontend: Create blob URL and open PDF
Frontend --> User: PDF opens in new tab
deactivate Frontend

@enduml
```

### 2. AI CV Analysis Sequence

```plantuml
@startuml AI_Analysis_Sequence
!theme plain
title AI CV Analysis with Gemini - Sequence Diagram

actor User
participant "Frontend" as Frontend
participant "AI Controller" as Controller
participant "AI Service" as Service
participant "Gemini AI" as Gemini
participant "CV Repository" as CVRepo
participant "Analysis Repository" as AnalysisRepo

User -> Frontend: Click "AI Analysis" on CV
activate Frontend

Frontend -> Controller: POST /api/ai-analysis/analyze/{cvId}?type=comprehensive
activate Controller

Controller -> Controller: Authenticate user (JWT)
Controller -> Service: analyzeCV(cvId, userEmail, COMPREHENSIVE)
activate Service

Service -> CVRepo: findByIdAndUserEmail(cvId, userEmail)
activate CVRepo
CVRepo --> Service: CVGenerator entity
deactivate CVRepo

Service -> Service: extractCVContent(cv)\n- Personal info\n- Summary\n- Skills\n- Experience\n- Education

Service -> Service: buildAnalysisPrompt(cvContent, analysisType)
Service -> Gemini: POST /v1/models/gemini-pro:generateContent\n{prompt, config}
activate Gemini

Gemini -> Gemini: Process CV content with AI\n- Analyze skills\n- Identify strengths/weaknesses\n- Generate recommendations\n- Calculate scores

Gemini --> Service: GeminiResponse\n{candidates: [{content: {parts: [{text: JSON}]}}]}
deactivate Gemini

Service -> Service: parseGeminiResponse()\n- Extract JSON analysis\n- Parse scores and feedback

Service -> AnalysisRepo: save(AICVAnalysis)
activate AnalysisRepo
AnalysisRepo --> Service: Saved analysis entity
deactivate AnalysisRepo

Service --> Controller: AIAnalysisDTO\n{overallScore, strengths, weaknesses, recommendations}
deactivate Service

Controller --> Frontend: 200 OK\nAI Analysis Results
deactivate Controller

Frontend -> Frontend: Display analysis modal\n- Overall score\n- Strengths list\n- Improvement areas\n- Detailed recommendations

Frontend --> User: AI analysis results displayed
deactivate Frontend

@enduml
```

### 3. Course Recommendation Sequence

```plantuml
@startuml Course_Recommendation_Sequence
!theme plain
title Course AI Recommendation - Sequence Diagram

actor User
participant "Frontend" as Frontend
participant "Course Controller" as Controller
participant "Recommendation Service" as RecService
participant "AI Service" as AIService
participant "Course Provider" as Provider
participant "ML Service" as MLService
participant "Database" as DB

User -> Frontend: Set preferences and click "Generate Recommendations"
activate Frontend

Frontend -> Controller: POST /api/course-recommendations/generate\n{careerGoals, targetRole, budget, timeCommitment}
activate Controller

Controller -> RecService: generatePersonalizedRecommendations(userId, preferences)
activate RecService

RecService -> RecService: buildUserProfile(userId, preferences)\n- Extract current skills from CV\n- Analyze career goals\n- Assess experience level

RecService -> AIService: analyzeSkillsGap(userProfile)
activate AIService

AIService -> AIService: buildSkillsGapPrompt(profile)
AIService -> AIService: Call Gemini AI for skills analysis
AIService --> RecService: SkillsGapAnalysis\n{criticalSkillGaps, emergingSkills, learningPath}
deactivate AIService

RecService -> Provider: searchCourses(skillsGap, preferences)
activate Provider
Provider --> RecService: List<Course> from multiple providers
deactivate Provider

RecService -> AIService: scoreCoursesForUser(courses, profile, skillsGap)
activate AIService

AIService -> AIService: For each course:\n- Build scoring prompt\n- Call Gemini AI\n- Parse relevance scores

AIService --> RecService: List<ScoredCourse>\n{course, relevanceScore, reasoning, careerBenefits}
deactivate AIService

RecService -> MLService: enhanceRecommendationsWithML(scoredCourses, profile)
activate MLService

MLService -> MLService: - Extract user/course features\n- Run ML model prediction\n- Combine AI + ML scores

MLService --> RecService: Enhanced recommendations with ML scores
deactivate MLService

RecService -> DB: saveRecommendations(userId, recommendations)
activate DB
DB --> RecService: Saved successfully
deactivate DB

RecService --> Controller: CourseRecommendationDTO\n{recommendations, userProfile, metadata}
deactivate RecService

Controller --> Frontend: 200 OK\nPersonalized course recommendations
deactivate Controller

Frontend -> Frontend: Display course cards with:\n- AI relevance scores\n- Reasoning explanations\n- Career impact\n- Enrollment options

Frontend --> User: Personalized course recommendations displayed
deactivate Frontend

@enduml
```

## 🏗️ Class Diagram - Core Entities

```plantuml
@startuml CareerBooster_Core_Classes
!theme plain
title CareerBooster - Core Entity Classes

package "User Management" {
  class User {
    -Long id
    -String email
    -String password
    -String firstName
    -String lastName
    -LocalDateTime createdAt
    -LocalDateTime updatedAt
    +getFullName(): String
    +isActive(): boolean
  }

  class Role {
    -Long id
    -String name
    -String description
  }

  class UserRole {
    -Long id
    -User user
    -Role role
    -LocalDateTime assignedAt
  }
}

package "CV Management" {
  class CVGenerator {
    -Long id
    -PersonalInfo personalInfo
    -String summary
    -List<String> skills
    -List<Experience> experiences
    -List<Education> education
    -List<Project> projects
    -List<Certification> certifications
    -List<Language> languages
    -List<String> hobbies
    -List<String> volunteering
    -List<String> awards
    -User user
    -LocalDateTime createdAt
    -LocalDateTime updatedAt
    +getTotalSections(): int
    +hasCompleteProfile(): boolean
  }

  class PersonalInfo {
    -String name
    -String email
    -String phone
    -String title
    +getContactInfo(): String
  }

  class Experience {
    -Long id
    -String position
    -String company
    -String description
    -LocalDate startDate
    -LocalDate endDate
    -CVGenerator cv
    +getDurationInMonths(): int
    +isCurrentPosition(): boolean
  }

  class Education {
    -Long id
    -String degree
    -String institution
    -String fieldOfStudy
    -LocalDate graduationDate
    -Double gpa
    -CVGenerator cv
    +getFormattedGPA(): String
  }

  class Project {
    -Long id
    -String name
    -String description
    -String technologies
    -String projectUrl
    -LocalDate startDate
    -LocalDate endDate
    -CVGenerator cv
    +getTechnologyList(): List<String>
  }

  class Certification {
    -Long id
    -String name
    -String issuingOrganization
    -LocalDate issueDate
    -LocalDate expirationDate
    -String credentialId
    -CVGenerator cv
    +isExpired(): boolean
  }

  class Language {
    -Long id
    -String language
    -String proficiencyLevel
    -CVGenerator cv
  }
}

package "CV Analysis" {
  class CVScore {
    -Long id
    -CVGenerator cv
    -Double totalScore
    -Double summaryScore
    -Double experienceScore
    -Double educationScore
    -Double skillsScore
    -Double projectsScore
    -String feedback
    -LocalDateTime createdAt
    -LocalDateTime updatedAt
    +getGrade(): String
    +getScoreCategory(): String
  }

  class AICVAnalysis {
    -Long id
    -CVGenerator cv
    -AnalysisType analysisType
    -Integer overallScore
    -String strengths
    -String weaknesses
    -String recommendations
    -String industryAlignment
    -String atsCompatibility
    -String careerAdvice
    -String geminiResponseId
    -Long processingTimeMs
    -LocalDateTime createdAt
    -LocalDateTime updatedAt
    +getStrengthsList(): List<String>
    +getWeaknessesList(): List<String>
  }

  enum AnalysisType {
    COMPREHENSIVE
    ATS_OPTIMIZATION
    INDUSTRY_SPECIFIC
    SKILLS_GAP
    CAREER_PROGRESSION
  }
}

package "Course Recommendations" {
  class CourseRecommendation {
    -Long id
    -User user
    -String requestData
    -String recommendationsData
    -String skillsGapAnalysis
    -String aiReasoning
    -Long processingTimeMs
    -LocalDateTime createdAt
    -LocalDateTime updatedAt
    +getRecommendationCount(): int
  }

  class Course {
    -String id
    -String title
    -String description
    -String provider
    -CourseProvider providerType
    -String level
    -Integer duration
    -Double price
    -Double rating
    -Integer enrollmentCount
    -List<String> skillsCovered
    -List<String> instructors
    -String language
    -Boolean hasCertificate
    -Boolean hasVideoContent
    -String enrollmentUrl
    -LocalDateTime createdAt
    -LocalDateTime updatedAt
    +isFree(): boolean
    +getFormattedPrice(): String
  }

  enum CourseProvider {
    COURSERA
    UDEMY
    EDX
    PLURALSIGHT
    LINKEDIN_LEARNING
    INTERNAL
  }

  class UserInteraction {
    -Long id
    -Long userId
    -String courseId
    -String actionType
    -String contentType
    -Integer duration
    -String metadata
    -Instant timestamp
    +getActionCategory(): String
  }
}

' Relationships
User ||--o{ CVGenerator : creates
User ||--o{ UserRole : has
Role ||--o{ UserRole : assigned_to
CVGenerator ||--|| PersonalInfo : contains
CVGenerator ||--o{ Experience : has
CVGenerator ||--o{ Education : has
CVGenerator ||--o{ Project : has
CVGenerator ||--o{ Certification : has
CVGenerator ||--o{ Language : has
CVGenerator ||--|| CVScore : scored_by
CVGenerator ||--o{ AICVAnalysis : analyzed_by
AICVAnalysis }o--|| AnalysisType : uses
User ||--o{ CourseRecommendation : receives
Course }o--|| CourseProvider : provided_by
User ||--o{ UserInteraction : performs

@enduml
```

## 🔧 Class Diagram - Service Layer

```plantuml
@startuml CareerBooster_Service_Classes
!theme plain
title CareerBooster - Service Layer Classes

package "Authentication Services" {
  class AuthenticationService {
    -UserRepository userRepository
    -PasswordEncoder passwordEncoder
    -JwtUtil jwtUtil
    +authenticate(email: String, password: String): AuthenticationResponse
    +register(userDTO: UserRegistrationDTO): User
    +refreshToken(token: String): String
    +logout(token: String): void
  }

  class JwtUtil {
    -String secretKey
    -Long expiration
    +generateToken(userDetails: UserDetails): String
    +extractUsername(token: String): String
    +validateToken(token: String, userDetails: UserDetails): Boolean
    +isTokenExpired(token: String): Boolean
  }
}

package "CV Services" {
  class CVGeneratorService {
    <<interface>>
    +createCV(cvDTO: CVGeneratorDTO, userEmail: String): CVGeneratorDTO
    +updateCV(id: Long, cvDTO: CVGeneratorDTO, userEmail: String): CVGeneratorDTO
    +getCVById(id: Long, userEmail: String): Optional<CVGenerator>
    +getUserCVs(userEmail: String): List<CVGeneratorDTO>
    +deleteCV(id: Long, userEmail: String): void
    +generateCVAsPdf(id: Long, userEmail: String, template: String): byte[]
  }

  class CVGeneratorServiceImpl {
    -CVGeneratorRepository cvGeneratorRepository
    -UserRepository userRepository
    -CVGeneratorMapper cvGeneratorMapper
    +createCV(cvDTO: CVGeneratorDTO, userEmail: String): CVGeneratorDTO
    +generateCVAsPdf(id: Long, userEmail: String, template: String): byte[]
    -addPersonalInfoSection(document: Document, personalInfo: PersonalInfo): void
    -addSummarySection(document: Document, summary: String): void
    -addSkillsSection(document: Document, skills: List<String>): void
  }

  class CVScoringService {
    -CVScoreRepository cvScoreRepository
    -CVGeneratorRepository cvGeneratorRepository
    +calculateCVScore(cvId: Long, userEmail: String): CVScoreDTO
    +getCVScore(cvId: Long, userEmail: String): CVScoreDTO
    -calculateSummaryScore(summary: String): double
    -calculateSkillsScore(skills: List<String>): double
    -calculateExperienceScore(experiences: List<Experience>): double
  }
}

package "AI Services" {
  class GeminiAIService {
    -String geminiApiKey
    -String geminiApiUrl
    -WebClient webClient
    -ObjectMapper objectMapper
    +analyzeCVContent(cvContent: String, analysisType: String): Mono<GeminiResponse>
    -buildGeminiRequest(cvContent: String, analysisType: String): GeminiRequest
    -buildAnalysisPrompt(cvContent: String, analysisType: String): String
  }

  class AIAnalysisServiceImpl {
    -GeminiAIService geminiAIService
    -CVGeneratorRepository cvRepository
    -AICVAnalysisRepository analysisRepository
    +analyzeCV(cvId: Long, userEmail: String, analysisType: AnalysisType): Mono<AIAnalysisDTO>
    -extractCVContent(cv: CVGenerator): String
    -processGeminiResponse(cv: CVGenerator, response: GeminiResponse): AIAnalysisDTO
  }

  class CourseRecommendationAIService {
    -GeminiAIService geminiAIService
    -CourseProviderService courseProviderService
    -UserProfileService userProfileService
    +generatePersonalizedRecommendations(userId: Long, request: RecommendationRequestDTO): Mono<CourseRecommendationDTO>
    -buildUserProfile(userId: Long, request: RecommendationRequestDTO): UserProfileAnalysis
    -analyzeSkillsGap(profile: UserProfileAnalysis): Mono<SkillsGapAnalysis>
  }
}

' Service Relationships
CVGeneratorServiceImpl ..|> CVGeneratorService : implements
CVGeneratorServiceImpl --> CVScoringService : uses
AIAnalysisServiceImpl --> GeminiAIService : uses
CourseRecommendationAIService --> GeminiAIService : uses

@enduml
```

## 🎮 Class Diagram - Controller Layer

```plantuml
@startuml CareerBooster_Controller_Classes
!theme plain
title CareerBooster - Controller Layer Classes

package "Authentication Controllers" {
  class AuthController {
    -AuthenticationService authenticationService
    -UserService userService
    +login(loginRequest: LoginRequestDTO): ResponseEntity<AuthenticationResponse>
    +register(registrationRequest: UserRegistrationDTO): ResponseEntity<UserDTO>
    +refreshToken(refreshRequest: RefreshTokenRequestDTO): ResponseEntity<TokenResponse>
    +logout(logoutRequest: LogoutRequestDTO): ResponseEntity<Void>
  }
}

package "CV Controllers" {
  class CVGeneratorController {
    -CVGeneratorService cvGeneratorService
    +createCV(cvDTO: CVGeneratorDTO, auth: Authentication): ResponseEntity<CVGeneratorDTO>
    +updateCV(id: Long, cvDTO: CVGeneratorDTO, auth: Authentication): ResponseEntity<CVGeneratorDTO>
    +getCVById(id: Long, auth: Authentication): ResponseEntity<CVGeneratorDTO>
    +getUserCVs(auth: Authentication): ResponseEntity<List<CVGeneratorDTO>>
    +deleteCV(id: Long, auth: Authentication): ResponseEntity<Void>
    +exportCVAsPdf(id: Long, template: String, auth: Authentication): ResponseEntity<byte[]>
  }

  class CVScoringController {
    -CVScoringService cvScoringService
    +calculateScore(cvId: Long, auth: Authentication): ResponseEntity<CVScoreDTO>
    +getScore(cvId: Long, auth: Authentication): ResponseEntity<CVScoreDTO>
    +getScoreHistory(cvId: Long, auth: Authentication): ResponseEntity<List<CVScoreDTO>>
  }
}

package "AI Analysis Controllers" {
  class AIAnalysisController {
    -AIAnalysisService aiAnalysisService
    +analyzeCVWithAI(cvId: Long, analysisType: String, auth: Authentication): ResponseEntity<Mono<AIAnalysisDTO>>
    +getAnalysisHistory(cvId: Long, auth: Authentication): ResponseEntity<List<AIAnalysisDTO>>
    +compareWithIndustryStandards(request: ComparisonRequestDTO, auth: Authentication): ResponseEntity<Mono<ComparisonAnalysisDTO>>
  }
}

package "Course Recommendation Controllers" {
  class CourseRecommendationController {
    -CourseRecommendationAIService recommendationService
    -UserBehaviorTracker behaviorTracker
    +generateRecommendations(request: RecommendationRequestDTO, auth: Authentication): ResponseEntity<Mono<CourseRecommendationResponseDTO>>
    +enrollInCourse(courseId: String, auth: Authentication): ResponseEntity<EnrollmentResponseDTO>
    +trackUserInteraction(eventDTO: UserInteractionEventDTO, auth: Authentication): ResponseEntity<Void>
    +getRecommendationHistory(auth: Authentication): ResponseEntity<List<CourseRecommendationHistoryDTO>>
  }
}

' Controller Dependencies
CVGeneratorController --> CVGeneratorService : uses
CVScoringController --> CVScoringService : uses
AIAnalysisController --> AIAnalysisService : uses
CourseRecommendationController --> CourseRecommendationAIService : uses
AuthController --> AuthenticationService : uses

@enduml
```

## 📊 Class Diagram - Repository Layer

```plantuml
@startuml CareerBooster_Repository_Classes
!theme plain
title CareerBooster - Repository Layer Classes

package "JPA Repositories" {
  interface JpaRepository<T, ID> {
    +save(entity: T): T
    +findById(id: ID): Optional<T>
    +findAll(): List<T>
    +deleteById(id: ID): void
    +count(): long
  }

  interface UserRepository {
    +findByEmail(email: String): Optional<User>
    +existsByEmail(email: String): Boolean
    +findByEmailAndActiveTrue(email: String): Optional<User>
  }

  interface CVGeneratorRepository {
    +findByUserEmail(userEmail: String): List<CVGenerator>
    +findByIdAndUserEmail(id: Long, userEmail: String): Optional<CVGenerator>
    +findByUserEmailOrderByCreatedAtDesc(userEmail: String): List<CVGenerator>
    +countByUserEmail(userEmail: String): Long
  }

  interface CVScoreRepository {
    +findByCvId(cvId: Long): Optional<CVScore>
    +findByUserEmail(userEmail: String): List<CVScore>
    +findAverageScore(): Double
    +deleteByCvId(cvId: Long): void
  }

  interface AICVAnalysisRepository {
    +findByCvId(cvId: Long): List<AICVAnalysis>
    +findByCvIdAndAnalysisType(cvId: Long, analysisType: AnalysisType): Optional<AICVAnalysis>
    +findByUserEmailOrderByCreatedAtDesc(userEmail: String): List<AICVAnalysis>
    +countByAnalysisType(analysisType: AnalysisType): Long
  }

  interface CourseRecommendationRepository {
    +findByUserId(userId: Long): List<CourseRecommendation>
    +findByUserIdOrderByCreatedAtDesc(userId: Long): List<CourseRecommendation>
    +deleteByUserId(userId: Long): void
  }

  interface UserInteractionRepository {
    +findByUserId(userId: Long): List<UserInteraction>
    +findByUserIdAndActionType(userId: Long, actionType: String): List<UserInteraction>
    +countByActionType(actionType: String): Long
  }
}

' Repository Inheritance
UserRepository --|> JpaRepository
CVGeneratorRepository --|> JpaRepository
CVScoreRepository --|> JpaRepository
AICVAnalysisRepository --|> JpaRepository
CourseRecommendationRepository --|> JpaRepository
UserInteractionRepository --|> JpaRepository

@enduml
```

## 📋 Complete System Architecture Overview

```plantuml
@startuml CareerBooster_System_Architecture
!theme plain
title CareerBooster - Complete System Architecture

package "Frontend Layer" {
  [React Native App] as Frontend
  [Authentication Screen] as AuthScreen
  [Home Screen] as HomeScreen
  [CV Generator Screen] as CVScreen
  [AI Analysis Screen] as AIScreen
  [Course Recommendation Screen] as CourseScreen
}

package "API Gateway Layer" {
  [Spring Boot Application] as SpringBoot
  [JWT Authentication Filter] as JWTFilter
  [CORS Configuration] as CORS
}

package "Controller Layer" {
  [Auth Controller] as AuthController
  [CV Generator Controller] as CVController
  [CV Scoring Controller] as ScoreController
  [AI Analysis Controller] as AIController
  [Course Recommendation Controller] as CourseController
}

package "Service Layer" {
  [Authentication Service] as AuthService
  [CV Generator Service] as CVService
  [CV Scoring Service] as ScoreService
  [AI Analysis Service] as AIService
  [Gemini AI Service] as GeminiService
  [Course Recommendation Service] as CourseService
}

package "Repository Layer" {
  [User Repository] as UserRepo
  [CV Generator Repository] as CVRepo
  [CV Score Repository] as ScoreRepo
  [AI Analysis Repository] as AIRepo
  [Course Recommendation Repository] as CourseRepo
}

package "Database Layer" {
  database "PostgreSQL" as DB {
    [users] as UsersTable
    [cv_generator] as CVTable
    [cv_scores] as ScoresTable
    [ai_cv_analysis] as AITable
    [course_recommendations] as CourseTable
  }
}

package "External Services" {
  [Google Gemini AI] as Gemini
  [Course Providers] as Providers
  cloud "PDF Generation" as PDFGen
}

' Frontend connections
Frontend --> SpringBoot : HTTP/HTTPS
AuthScreen --> AuthController
HomeScreen --> CVController
CVScreen --> CVController
AIScreen --> AIController
CourseScreen --> CourseController

' API Gateway connections
SpringBoot --> JWTFilter
SpringBoot --> CORS

' Controller connections
AuthController --> AuthService
CVController --> CVService
ScoreController --> ScoreService
AIController --> AIService
CourseController --> CourseService

' Service connections
AuthService --> UserRepo
CVService --> CVRepo
CVService --> PDFGen
ScoreService --> ScoreRepo
AIService --> AIRepo
AIService --> GeminiService
CourseService --> CourseRepo
GeminiService --> Gemini
CourseService --> Providers

' Repository connections
UserRepo --> DB
CVRepo --> DB
ScoreRepo --> DB
AIRepo --> DB
CourseRepo --> DB

@enduml
```

## 🎯 Summary

This comprehensive UML documentation provides:

### ✅ **Use Case Diagram**

- **25 use cases** covering all major features
- **4 actors**: Job Seeker, Admin, Gemini AI, Course Provider
- **Include/Extend relationships** showing feature dependencies

### ✅ **Sequence Diagrams**

- **CV Generation Flow**: Complete PDF generation process
- **AI Analysis Flow**: Gemini AI integration for CV analysis
- **Course Recommendation Flow**: AI-powered course suggestions

### ✅ **Class Diagrams**

- **Core Entities**: 15+ domain models with relationships
- **Service Layer**: Business logic and AI integration services
- **Controller Layer**: REST API endpoints and request handling
- **Repository Layer**: Data access patterns and JPA repositories
- **System Architecture**: Complete system overview

### ✅ **Key Features Documented**

- **Authentication & Authorization**: JWT-based security
- **CV Management**: Creation, editing, PDF generation
- **AI Analysis**: Gemini AI integration for CV insights
- **Course Recommendations**: Personalized learning suggestions
- **Scoring System**: CV evaluation and feedback

This documentation provides a complete technical blueprint for understanding and extending the CareerBooster application! 🚀
