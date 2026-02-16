# Fullstack Portfolio

A modern, full-stack portfolio application built with **Next.js** (Frontend) and **Django** (Backend). This project showcases a professional portfolio with dynamic content management capabilities.

## 🚀 Tech Stack

### Frontend
- **Framework:** Next.js 16 (React 19)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **State/Data Fetching:** TanStack Query (React Query)
- **Animations:** Framer Motion, Lottie
- **Icons:** React Icons, Lucide React
- **HTTP Client:** Axios

### Backend
- **Framework:** Django 6
- **API:** Django REST Framework (DRF)
- **Database:** SQLite (Default for dev) / PostgreSQL (Recommended for prod)
- **Image Processing:** Pillow
- **CORS:** django-cors-headers

## 🛠️ Getting Started

### Prerequisites
- Node.js (v20+ recommended)
- Python (v3.10+ recommended)
- Git

### Installation

Clone the repository:
```bash
git clone https://github.com/yourusername/typescript-portfolio.git
cd typescript-portfolio
```

#### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   # Windows
   python -m venv venv
   .\venv\Scripts\activate

   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Apply migrations:
   ```bash
   python manage.py migrate
   ```

5. Run the development server:
   ```bash
   python manage.py runserver
   ```
   The backend API will be available at `http://localhost:8000`.

#### Frontend Setup

1. Navigate to the frontend directory (open a new terminal):
   ```bash
   cd next-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

## 📂 Project Structure

```
typescript-portfolio/
├── backend/                # Django backend
│   ├── portfolio_backend/  # Main project configuration
│   ├── manage.py           # Django management script
│   └── requirements.txt    # Python dependencies
├── next-app/               # Next.js frontend
│   ├── src/                # Source code
│   │   ├── app/            # App router pages
│   │   ├── components/     # React components
│   │   └── hooks/          # Custom hooks
│   ├── package.json        # Node.js dependencies
│   └── tailwind.config.ts  # Tailwind configuration
└── README.md
```

## ✨ Features
- **Dynamic Content:** Manage portfolio items via Django Admin.
- **Responsive Design:** Fully responsive UI/UX with Tailwind CSS.
- **Admin Dashboard:** Secure admin area for content updates.
- **Contact Form:** Integrated with Formspree (or custom backend).
- **Dark Mode:** (If applicable)

## 🤝 Contributing
Contributions are welcome! Please check out the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines.

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
