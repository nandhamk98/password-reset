import "./App.css";
import { Switch, Route } from "react-router-dom";
import { SignUp } from "./SignUp";
import { SignIn } from "./SignIn";
import { ResetPassword } from "./ResetPassword";
import { ForgetPassword } from "./ForgetPassword";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/resetPassword/:token" exact>
          <ResetPassword />
        </Route>
        <Route path="/forgotPassword" exact>
          <ForgetPassword />
        </Route>
        <Route path="/signUp" exact>
          <SignUp />
        </Route>
        <Route path="/welcomePage" exact>
          <WelcomePage />
        </Route>
      </Switch>
      <Route path="/" exact>
        <SignIn />
      </Route>
    </div>
  );
}

function WelcomePage() {
  return (
    <div>
      <h1>Welcome</h1>
    </div>
  );
}

export default App;
