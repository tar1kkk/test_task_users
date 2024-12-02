import './App.css';
import {Route, Router, Routes} from "react-router-dom";
import EditUsers from "./pages/editUsers";
import Users from "./pages/users";
import Header from "./components/Header";

function App() {
    return (
        <div>
            <Header/>
            <Router>
                <Routes>
                    <Route path="/edit-user" element={<EditUsers/>}/>
                    <Route path="/" element={<Users/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
