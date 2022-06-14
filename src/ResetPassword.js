import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";

export function ResetPassword() {
  const [password, setPassword] = useState();
  const [secondPassword, setSecondPassword] = useState();
  const [display, setDisplay] = useState(false);
  const [passMsg, setPassMsg] = useState(null);

  const history = useHistory();
  let { token } = useParams();

  const updatePassword = (password) => {
    fetch("http://localhost:4000/updatePassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(password),
    })
      .then((response) => response.json())
      .then((data) => {
        history.push("/");
      });
  };
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
  return (
    <div>
      <h1>Sign In</h1>
      <div className="align-card">
        <Card sx={{ maxWidth: 400, maxHeight: 600 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Reset password
            </Typography>
            <div className="align-textfield">
              <TextField
                id="standard-helperText1"
                label="Password"
                type="password"
                helperText="Please Enter Password"
                variant="standard"
                onChange={(event) => setPassword(event.target.value)}
              />
              <TextField
                id="standard-helperText"
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
                    password: password,
                    token: token,
                  };
                  if (checkPassword()) {
                    updatePassword(obj);
                  }
                }}
              >
                Reset Password
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
