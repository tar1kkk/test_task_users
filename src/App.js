import {BrowserRouter, Route, Routes} from "react-router-dom";
import EditUsers from "./pages/editUsers";
import Users from "./pages/users";
import Header from "./components/Header";
import './index.css';

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<EditUsers />} />
                <Route path="/users" element={<Users />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
