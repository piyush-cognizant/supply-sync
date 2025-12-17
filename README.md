# Project Setup Guide

## Clone the Repository

```bash
git clone https://github.com/piyush-cognizant/supply-sync.git
cd supply-sync
```

## Install Dependencies

```bash
npm install
```

## Run the Project

```bash
npm run dev
```

## Additional Commands for Production
## Additional Commands for Production

- **Build**: `npm run build`
- **Preview**: `npm run preview`

---

# Development Workflow Conventions

## Commit Types

- **feat**: A new feature or functionality
- **fix**: A bug fix or patch
- **docs**: Documentation changes (README, comments, etc.)
- **refactor**: Code restructuring without changing functionality
- **style**: Formatting or style changes (whitespace, semicolons, etc.)
- **test**: Adding or updating tests
- **chore**: Build, dependencies, or tooling updates
- **perf**: Performance improvements
- **ci**: CI/CD pipeline changes

## Commit Message Format
- Format: `<type>: <message>`
- All lowercase
- Example: `feat: add user authentication`

## Branch Naming Convention
- Format: `<type>/<feature-name>`
- Use hyphens for multi-word names
- Examples:
    - `feat/user-authentication`
    - `docs/readme`
    - `fix/login-bug`

## Workflow Steps

### 1. Create Branch
- Always create new branches from `origin/dev`
- Command: `git checkout -b feat/feature-name origin/dev`

### 2. Keep Branch Updated
- Pull latest changes from dev: `git pull origin dev`
- Merge dev into your local branch before pushing
- Command: `git merge origin/dev`

### 3. Push and Create PR
- Push your branch: `git push -u origin feat/feature-name`
- Create Pull Request to `dev` branch

## Pull Request Format

### Title
- English sentence format with proper capitalization
- Example: "Feat new feature added"

### Description
- Provide a short description of changes
- Include relevant context and reasoning

### PR Settings
- **Assignee**: Yourself
- **Reviewer**: piyush-cognizant
- **Labels**: Add appropriate labels (e.g., feature, documentation, bugfix)