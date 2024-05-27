import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuestionBoardPage from './pages/QuestionBoardPage'
import SetupPage from './pages/SetupPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuestionBoardPage />} />
        <Route path="/setup" element={<SetupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
