import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingSpinner from "./components/LoadingSpinner";

// Lazy imports
const UserLayout = lazy(() => import("./components/UserLayout"));
const AdminLayout = lazy(() => import("./pages/AdminLayout"));
import Home from "./pages/Home";
import InstallPrompt from "./components/InstallPrompt";
import ScrollToTop from "./components/ScrollToTop";
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const NotFound = lazy(() => import("./pages/NotFound"));
const BlogPost = lazy(() => import("./components/BlogPost"));
const BlogSection = lazy(() => import("./components/BlogSection"));

function ProtectedRoute({ children }) {
  const { isAdmin } = useAuth();
  if (!isAdmin) return <Navigate to="/admin/login" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* User Routes */}
            <Route element={<ErrorBoundary><UserLayout /></ErrorBoundary>}>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<BlogSection />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
            </Route>

            {/* Auth */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <ErrorBoundary><AdminLayout /></ErrorBoundary>
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>

 <ErrorBoundary>
            <InstallPrompt />
            <ScrollToTop/>
          </ErrorBoundary>
                  </Suspense>
      </Router>
    </AuthProvider>
  );
}

