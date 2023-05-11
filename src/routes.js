import AddProduct from './Pages/AddProduct/index.js';
import Footer from './Components/Footer/index.js';
import ListProducts from './Pages/ListProducts/index.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function AppRouter() {

    return (
        <main>
            <Router>
                <Routes>
                    <Route path={'/'} index element={<ListProducts />} />
                    <Route path={'add-product'} element={<AddProduct />} />
                </Routes>
                <Footer />
            </Router>
        </main>
    );
}