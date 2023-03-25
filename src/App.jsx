import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Footer from './components/footer/Footer';
import Departments from './pages/departments/Departments';
import Doctors from './pages/doctors/Doctors';
import About from './pages/about/About';
import ServicesPage from './pages/servicespage/ServicesPage';
import Blog from './pages/blog/Blog';
import DetailBlog from './pages/detailblog/DetailBlog';
import Contact from './pages/contact/Contact';
import IndexContext from './services/context';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Verification from './pages/verification/Verification';

function App() {
  return (
    <div className="App">
      <IndexContext>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route path='/verification/:userId'>
              <Verification />
            </Route>

            <Route path='/login'>
              <Login />
            </Route>

            <Route path='/register'>
              <Register />
            </Route>

            <Route path="/contact">
              <Contact />
            </Route>

            <Route path="/blog/blog-details/:id">
              <DetailBlog />
            </Route>

            <Route path="/blog">
              <Blog />
            </Route>

            <Route path="/services">
              <ServicesPage />
            </Route>

            <Route path="/about">
              <About />
            </Route>

            <Route path="/doctors">
              <Doctors />
            </Route>

            <Route path="/departments">
              <Departments />
            </Route>

            <Route path="/">
              <Home />
            </Route>
          </Switch>

          <Footer />
        </BrowserRouter>
      </IndexContext>
    </div>
  );
}

export default App;
