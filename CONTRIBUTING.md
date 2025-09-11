# Contributing to CourseCraft

Thank you for your interest in contributing to the CourseCraft project! This document provides instructions for setting up the project locally and deploying it.

## 1. Getting Started (Local Development)

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### 1.1. Prerequisites

Make sure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v20 or later recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### 1.2. Installation

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

### 1.3. Running the Development Server

Once the dependencies are installed, you can start the local development server:

```bash
npm run dev
```

This will run the app in development mode. Open [http://localhost:9002](http://localhost:9002) to view it in your browser. The page will auto-update as you make edits to the code.

### 1.4. Available User Credentials

You can use the following credentials to log in and test the application. Each login page also has a one-click auto-fill icon for convenience.

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

#### Tech Support Accounts
- **Password for all tech support:** `techypass`
- **Emails:**
  - `tech.one@university.edu`

---

## 2. Deployment

This Next.js application is configured for easy deployment on platforms like Vercel.

### 2.1. Deploying with Vercel

1.  **Push to a Git Repository:**
    Ensure your project is pushed to a Git provider (like GitHub, GitLab, or Bitbucket).

2.  **Import Project on Vercel:**
    - Go to your [Vercel dashboard](https://vercel.com/dashboard).
    - Click on "Add New..." -> "Project".
    - Import the Git repository containing your project.

3.  **Configure Project:**
    - Vercel will automatically detect that you are deploying a Next.js application and configure the build settings correctly.
    - You do not need to set any environment variables for this prototype.
    - Click "Deploy".

4.  **Done!**
    Vercel will build and deploy your application. You'll be provided with a public URL to access the live site.
