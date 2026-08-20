import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CoursePage } from './pages/CoursePage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<CoursePage />} />
                <Route path="/mon-hoc" element={<CoursePage />} />
            </Routes>
        </Router>
    );
}

export default App;