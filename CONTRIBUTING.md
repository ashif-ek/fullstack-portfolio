# Contributing to Fullstack Portfolio

Thank you for your interest in contributing to our project! We welcome contributions from everyone.

## Getting Started

1. **Fork the repository** on GitHub.
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/typescript-portfolio.git
   cd typescript-portfolio
   ```
3. **Create a new branch** for your feature or bugfix:
   ```bash
   git checkout -b feature/amazing-feature
   ```

## Development Workflow

This is a monorepo containing both the Frontend (Next.js) and Backend (Django).

### Frontend Changes
- Navigate to `next-app/`.
- Ensure you follow the code style (Prettier/ESLint are configured).
- Test your changes locally: `npm run dev`.

### Backend Changes
- Navigate to `backend/`.
- Ensure you have the virtual environment activated.
- Run migrations if you modified models: `python manage.py makemigrations` and `python manage.py migrate`.
- Test your changes: `python manage.py test` (if tests exist) or verify manually via `runserver`.

## Submitting a Pull Request

1. **Push your branch** to your fork:
   ```bash
   git push origin feature/amazing-feature
   ```
2. **Open a Pull Request** on the original repository.
3. Provide a clear title and description of your changes.
4. Reference any related issues (e.g., `Closes #123`).

## Code Style

- **Frontend:** Follow Standard JS / TypeScript best practices. Component names should be PascalCase.
- **Backend:** Follow PEP 8 guidelines for Python code.

## Reporting Bugs

If you find a bug, please open an issue with:
- A clear title.
- Steps to reproduce.
- Expected vs. actual behavior.
- Screenshots (if applicable).

Thank you for contributing!
