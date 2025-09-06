# Schedule Smart: A Modern Course Scheduler

CourseCraft is a web-based application designed to help university students plan and manage their academic schedules. It provides an intuitive interface for browsing courses, creating timetables, and tracking academic progress.

---

## 1. Introduction

### 1.1 Purpose
This document provides a mini Software Requirements Specification (SRS) for the CourseCraft application. It outlines the main features, functionalities, and technical stack of the project.

### 1.2 Scope
The application allows students to:
- Authenticate to access their personal dashboard.
- View their academic profile and progress.
- Browse available courses and faculty members.
- Interactively create and visualize a course timetable for a semester.
- View and manage current and past timetables.

---

## 2. Overall Description

### 2.1 Product Features
The application is comprised of the following key features:

#### 2.1.1 User Authentication
- A secure login page for users to access the system.
- Pre-defined roles for students and administrators with hardcoded credentials for demonstration.
- Session management with a 15-minute inactivity timeout for security.
- Protected routes to ensure only authenticated users can access the dashboard and related pages.

#### 2.1.2 Student Dashboard
- A personalized landing page for students after login.
- Displays key student profile information (name, major, year).
- Shows academic progress, including completed credits vs. required credits.
- Provides "Quick Actions" for easy navigation to core application features.
- A user menu with a logout option.

#### 2.1.3 Interactive Course Scheduler
- A visual, drag-and-drop interface for building a weekly timetable.
- A filterable and searchable list of available courses.
- Real-time conflict detection to prevent overlapping classes.
- Credit-counting functionality with warnings for under/over-loading.
- Option to send the created timetable to the user's email.

#### 2.1.4 Course & Faculty Browser
- A dedicated page to view all available courses with details like description, department, and credits.
- A separate page to view a list of all faculty members, their departments, and the subjects they teach.

#### 2.1.5 Timetable Management
- A "My Timetables" page to view schedules from past semesters.
- Displays the current semester's timetable.
- Prompts the user to create a schedule if one for the current semester does not exist.

---

## 3. Tech Stack

- **Framework:** Next.js (with App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** ShadCN/UI, Lucide React (for icons)
- **State Management:** React Context API (for authentication)
- **Authentication:** Basic, client-side authentication with hardcoded users.

---

## 4. Getting Started (Local Development)

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### 4.1. Prerequisites

Make sure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v20 or later recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### 4.2. Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd <project-directory-name>
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

### 4.3. Running the Development Server

Once the dependencies are installed, you can start the local development server:

```bash
npm run dev
```

This will run the app in development mode. Open [http://localhost:9002](http://localhost:9002) to view it in your browser. The page will auto-update as you make edits to the code.

### 4.4. Available User Credentials

You can use the following hardcoded credentials to log in and test the application.

#### Student Accounts
- **Password for all students:** `password123`
- **Emails:**
  - `alex.doe@university.edu`
  - `brian.smith@university.edu`
  - `casey.jones@university.edu`
  - `diana.prince@university.edu`
  - `edward.nygma@university.edu`

#### Admin Accounts
- **Password for all admins:** `adminpass`
- **Emails:**
  - `admin.one@university.edu`
  - `admin.two@university.edu`
