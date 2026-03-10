import NotFound from "../components/pages/NotFound";
import { RecruiterProvider } from "../context/RecruiterContext";

export default function NotFoundPage() {
    return (
        <RecruiterProvider>
            <NotFound />
        </RecruiterProvider>
    );
}
