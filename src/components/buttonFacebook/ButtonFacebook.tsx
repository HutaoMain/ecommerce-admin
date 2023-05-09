import { AiFillFacebook } from "react-icons/ai";

const ButtonFacebook = () => {
  const handleFacebookLogin = () => {
    window.open(
      `${import.meta.env.VITE_APP_API_URL}/oauth2/authorization/google`,
      "_self"
    );
  };

  return (
    <div>
      <button className="facebook-login-btn" onClick={handleFacebookLogin}>
        <AiFillFacebook color="14A2F9" />
        Login with Facebook
      </button>
    </div>
  );
};

export default ButtonFacebook;
