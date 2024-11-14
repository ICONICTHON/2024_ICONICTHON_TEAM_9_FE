import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Timetable from './pages/Timetable';
import Plan from './pages/Plan';
function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/timetable" element={<Timetable />} />
                <Route path="/plan" element={<Plan />} />
            </Routes>
        </div>
    );
}

export default App;
