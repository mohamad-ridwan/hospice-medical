import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Footer from './components/footer/Footer';
import Departments from './pages/departments/Departments';
import Doctors from './pages/doctors/Doctors';
import About from './pages/about/About';
import ServicesPage from './pages/servicespage/ServicesPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/services">
            <ServicesPage/>
          </Route>

          <Route path="/about">
            <About/>
          </Route>

          <Route path="/doctors">
            <Doctors/>
          </Route>

          <Route path="/departments">
            <Departments/>
          </Route>

          <Route path="/">
            <Home/>
          </Route>
        </Switch>

        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
