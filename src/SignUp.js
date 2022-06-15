import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export function SignUp() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState();
  const [display, setDisplay] = useState(false);
  const [error, setError] = useState(null);
  const [passMsg, setPassMsg] = useState(null);

  const history = useHistory();

  const checkPassword = () => {
    if (password.length < 7) {
      setPassMsg("Password is Short");
      return false;
    } else if (password !== secondPassword) {
      setPassMsg("password is not matching");
      return false;
    } else {
      setPassMsg(null);
      return true;
    }
  };

  const signUp = (data) => {
    fetch("https://resetpasswordnamk.herokuapp.com/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json();
        } else {
          setError(null);
          history.push("/");
          return response.json();
        }
      })
      .then((response) => {
        if (response.errorMsg) {
          setError(response.errorMsg);
        }
      });
  };

  return (
    <div>
      <h1>Sign In</h1>
      <div className="align-card">
        <Card sx={{ maxWidth: 400, maxHeight: 600 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Sign Up
            </Typography>

            {error ? (
              <Typography
                gutterBottom
                variant="p"
                component="div"
                color="error"
              >
                {error}
              </Typography>
            ) : (
              ""
            )}
            <div className="align-textfield">
              <TextField
                id="standard-helperText2"
                label="Username"
                helperText="Please Enter username"
                variant="standard"
                onChange={(event) => setUsername(event.target.value)}
              />
              <TextField
                id="standard-helperText1"
                label="Email"
                type="email"
                helperText="Please Enter Email"
                variant="standard"
                onChange={(event) => setEmail(event.target.value)}
              />
              <TextField
                id="standard-helperText3"
                label="Password"
                type="password"
                helperText="Please Enter Password"
                variant="standard"
                onChange={(event) => setPassword(event.target.value)}
              />
              <TextField
                id="standard-helperText4"
                label="Confirm Password"
                type="password"
                helperText="Please Re-enter Password"
                variant="standard"
                onChange={(event) => {
                  setDisplay(true);
                  setSecondPassword(event.target.value);
                }}
              />
              {passMsg && display ? (
                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  color="red"
                >
                  {passMsg}
                </Typography>
              ) : (
                ""
              )}
            </div>
            <div className="button-group">
              <Button
                variant="outlined"
                onClick={() => {
                  const obj = {
                    username: username,
                    email: email,
                    password: password,
                  };
                  if (checkPassword()) {
                    signUp(obj);
                  }
                }}
              >
                Create Porfile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
