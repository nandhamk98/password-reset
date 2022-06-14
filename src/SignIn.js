import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { useState } from "react";

export function SignIn() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [incorrect, setIncorrect] = useState(null);

  const login = (data) => {
    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        } else {
          return response.json();
        }
      })
      .then((response) => {
        setIncorrect(null);
        history.push("/welcomePage");
      })
      .catch((err) => {
        setIncorrect("Invalid Username or Password");
      });
  };

  const history = useHistory();
  return (
    <div>
      <h1>Sign In</h1>
      <div className="align-card">
        <Card sx={{ maxWidth: 400, maxHeight: 600 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Log In
            </Typography>
            {incorrect ? (
              <Typography
                gutterBottom
                variant="p"
                component="div"
                color="error"
              >
                {incorrect}
              </Typography>
            ) : (
              ""
            )}
            <div className="align-textfield">
              <TextField
                id="standard-helperText1"
                label="Email"
                type="email"
                helperText="Please Enter Email"
                variant="standard"
                onChange={(event) => setEmail(event.target.value)}
              />
              <TextField
                id="standard-helperText2"
                label="Password"
                type="password"
                helperText="Please Enter Password"
                variant="standard"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="button-group">
              <Button
                variant="outlined"
                onClick={() => {
                  const data = {
                    email: email,
                    password: password,
                  };

                  login(data);
                }}
              >
                SignIn
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  history.push("/signUp");
                }}
              >
                SignUp
              </Button>
            </div>
            <Button
              variant="outlined"
              onClick={() => {
                history.push("/forgotPassword");
              }}
            >
              Forget Password
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
