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
import UserProfile from './pages/profile/UserProfile';
import ForgotPassword from './pages/forgotpassword/ForgotPassword';
import SuccessSendEmail from './pages/forgotpassword/successSendEmail/SuccessSendEmail';
import SuccessPasswordReset from './pages/forgotpassword/successPasswordReset/SuccessPasswordReset';
import SetNewPassword from './pages/forgotpassword/setNewPassword/SetNewPassword';

function App() {
  return (
    <div className="App">
      <IndexContext>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route path='/forgot-password/create-new-password/has-been-successfully/:token'>
              <SuccessPasswordReset />
            </Route>

            <Route path='/forgot-password/create-new-password/:token'>
              <SetNewPassword />
            </Route>

            <Route path='/forgot-password/success-send-email/:token'>
              <SuccessSendEmail />
            </Route>

            <Route path='/forgot-password'>
              <ForgotPassword />
            </Route>

            <Route path='/verification/:userId'>
              <Verification />
            </Route>

            <Route path='/profile'>
              <UserProfile />
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
