import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Main from "./pages/main";
import Product from "./pages/product";
const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/product" component={Product} />
    </Switch>
  );
};
export default Routes;
