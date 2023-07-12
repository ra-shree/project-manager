import { Route, Routes } from 'react-router-dom';
import { GuestNavbar, Footer } from './components/layout';
import { SignInForm } from './pages/SignIn';
import { SignUpForm } from './pages/SignUp';
import { Dashboard } from './pages/Dashboard';
export default function App() {
    return (
        <div>
            <GuestNavbar />
            <Routes>
                <Route path="/signin" element={<SignInForm />} />
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
            <Footer />
        </div>
    );
}
