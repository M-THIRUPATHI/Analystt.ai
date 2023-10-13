import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UsersDetails from "./UsersDetails";
import UserInformation from "./UserInformation";
import NotFound from "./NotFound";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/users" component={UsersDetails} />
      <Route exact path="/users/:id" component={UserInformation} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default App;

export const Home = () => {
  const history = useHistory();
  history.replace("/users");
};
