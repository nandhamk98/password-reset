import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export function ForgetPassword() {
  let [email, setEmail] = useState("");

  const history = useHistory();
  const sendEmail = (email) => {
    fetch("https://resetpasswordnamk.herokuapp.com/forgotPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    })
      .then((data) => data.json())
      .then((data) => {
        history.push("/");
      });
  };
  return (
    <div>
      <h1>Sign In</h1>
      <div className="align-card">
        <Card sx={{ maxWidth: 400, maxHeight: 600 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Log In
            </Typography>
            <div className="align-textfield">
              <TextField
                id="standard-helperText"
                label="Email"
                type="email"
                helperText="Please Enter Email"
                variant="standard"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>
            <Button
              variant="outlined"
              onClick={() => {
                const data = {
                  email: email,
                };

                sendEmail(data);
              }}
            >
              send mail
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
