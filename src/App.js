import './App.css';
import Banner from './components/Banner';
import Navbar from './components/Navbar';
import Movies from './components/Movies';
import Favourites from './components/Favourites';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
      <Route path="/" exact render={(props)=>(
        <>
        <Banner {...props}/>
        <Movies {...props}/>
        </>
      )

      } />
      <Route path="/favourites" component={Favourites} />
              
      </Switch>
      
    </Router>
      
    
  );
}

export default App;
