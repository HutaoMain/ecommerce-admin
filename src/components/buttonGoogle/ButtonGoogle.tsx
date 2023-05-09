import { FcGoogle } from "react-icons/fc";

const ButtonGoogle = () => {
  const handleGoogleLogin = () => {
    window.open(
      `${import.meta.env.VITE_APP_API_URL}/oauth2/authorization/google`,
      "_self"
    );
  };

  return (
    <div>
      <button className="google-login-btn" onClick={handleGoogleLogin}>
        <FcGoogle /> Login with Google
      </button>
    </div>
  );
};

export default ButtonGoogle;
