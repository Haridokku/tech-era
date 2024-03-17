import {Route, Switch, Redirect} from 'react-router-dom'

import TechEra from './components/TechEra'
import TechItemDetails from './components/TechItemDetails'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={TechEra} />
    <Route exact path="/courses/:id" component={TechItemDetails} />
    <Route exact path="/notfound" component={NotFound} />
    <Redirect to="/notfound" />
  </Switch>
)

export default App
