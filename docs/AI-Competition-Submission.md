# AI Project – Competition Submission

## Executive Summary
This submission presents a full-stack AI-enabled application featuring a Python Flask backend and a React frontend. The system provides secure upload/management of patient-like documents, a responsive dashboard UI, theming, notifications, and a ready-to-run developer experience. The documentation includes architecture, data flow, project structure, setup, evaluation, risks, ethics, and future work.

## Problem Statement
Design a small, maintainable AI-driven app scaffold with a clear frontend–backend separation, easy local setup, and UX primitives (theme, notifications, navigation). The system should be extensible for future AI tasks like document analysis, summarization, and history tracking while maintaining clean architecture.

## Key Features
- Robust project bootstrap with one-line start scripts for Windows, macOS, Linux
- Flask backend with upload handling and basic routes
- React frontend with themed UI, navigation, notifications, loading states
- Modular code structure ready for AI integrations (e.g., document summarization)
- Clear developer ergonomics and documentation

## System Architecture
High-level architecture showing user interactions with frontend, and API communication with backend.

![Architecture Diagram](diagrams/architecture.png)

### Components
- Frontend (React): Routing, pages (`Dashboard`, `History`, `Login`, `Settings`, `Summary`), global `ThemeProvider`, notifications, and loading UI.
- Backend (Flask): REST endpoints, file upload handling under `backend/uploads`, and core app startup in `backend/app.py`.
- Shared Scripts: Cross-platform setup and start scripts at the repository root.

## Data Flow
User events on the frontend trigger API calls to the backend. The backend processes requests (e.g., file operations) and returns responses rendered by the frontend. Notifications provide user feedback; the theme system ensures consistent styling.

![Sequence Diagram](diagrams/sequence-upload.png)

## Technology Stack
- Backend: Python, Flask
- Frontend: React, JavaScript, Node.js tooling
- Tooling: npm scripts, cross-platform shell/batch scripts
- Diagrams: Mermaid (rendered as PNG for portability)

## Project Structure
```text
b:\\AI Project\\
  - backend\\
    - app.py
    - requirements.txt
    - uploads\\
      - alice patient.txt
      - burner patient.txt
      - cloe patient.txt
      - General-Check-Up-Report.webp
      - Jon Patient.txt.txt
      - patient 1.txt
      - patient.txt
  - frontend\\
    - node_modules\\
    - package-lock.json
    - package.json
    - public\\
      - index.html
    - src\\
      - App.js
      - components\\
        - Loading.js
        - Navigation.js
        - NotificationSystem.js
        - ThemeProvider.js
      - index.css
      - index.js
      - pages\\
        - Dashboard.js
        - History.js
        - Login.js
        - NotificationTest.js
        - Settings.js
        - Summary.js
        - ThemeTest.js
  - Makefile
  - NOTIFICATION_TESTING_GUIDE.md
  - package-lock.json
  - QUICK_START.md
  - README.md
  - setup-project.bat
  - setup-project.ps1
  - setup-project.sh
  - start-project.bat
  - start-project.ps1
  - start-project.sh
  - test-notifications.html
  - test-theme.html
  - THEME_FIXES_SUMMARY.md
  - update-theme-colors.js
```

## Backend Overview
- Entry point: `backend/app.py`
- Dependencies: `backend/requirements.txt`
- Upload storage: `backend/uploads/`
- Designed to extend with AI services (e.g., NLP pipelines for summarization)

## Frontend Overview
- Entry point: `frontend/src/index.js`, root app in `frontend/src/App.js`
- Components: `ThemeProvider`, `NotificationSystem`, `Navigation`, `Loading`
- Pages: `Dashboard`, `History`, `Login`, `Settings`, `Summary`, `ThemeTest`, `NotificationTest`

## Setup and Run
1. Prerequisites: Node.js 18+, Python 3.10+, pip
2. One-time setup (installs deps in both apps):
   - Windows: `setup-project.bat`
   - macOS/Linux: `./setup-project.sh`
3. Start servers:
   - Windows: `start-project.bat`
   - macOS/Linux: `./start-project.sh`
4. Access the frontend in your browser at the printed URL (typically `http://localhost:3000`).

## Evaluation Criteria
- Architecture clarity and modularity
- Code readability and maintainability
- UX quality: theming, notifications, responsiveness
- Extensibility for AI tasks (e.g., document processing)
- Documentation completeness

## Risks and Mitigations
- Data privacy for uploaded files → keep local, sanitize, apply access controls
- Dependency drift → pin key versions, provide setup scripts
- AI model integration complexity → abstract service layer, mock interfaces during dev

## Ethics and Privacy
- Handle any personal data responsibly
- Avoid storing sensitive data beyond what is necessary
- Provide clear user consent and data deletion options in future enhancements

## Future Work
- Integrate document parsing and summarization in `backend/app.py`
- Add user auth and RBAC to protect data
- Add automated tests (unit/e2e) and CI
- Add observability (logging, tracing)

## Submission Checklist
- Architecture and sequence diagrams included in `docs/diagrams/`
- PDF export: `docs/AI-Competition-Submission.pdf`
- Source document: `docs/AI-Competition-Submission.md`


