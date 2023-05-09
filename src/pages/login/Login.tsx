import "./Login.css";
import ButtonGoogle from "../../components/buttonGoogle/ButtonGoogle";
import ButtonFacebook from "../../components/buttonFacebook/ButtonFacebook";

const Login = () => {
  return (
    <div className="login">
      <div className="login-left"></div>
      <div className="login-right">
        <h1>Welcome back!</h1>
        <span>Please login to your desired method.</span>
        <ButtonGoogle />
        <ButtonFacebook />
      </div>
    </div>
  );
};

export default Login;
