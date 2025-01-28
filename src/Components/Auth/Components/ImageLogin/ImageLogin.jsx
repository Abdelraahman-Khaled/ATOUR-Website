import imageLogin from "../../../../assets/images/login/01.png";

const ImageLogin = () => {
  return (
    <div className="image-login h-100 position-relative overlay-bg">
      <img
        src={imageLogin}
        alt="imageLogin"
        className="w-100 h-100 object-fit-cover rounded-4"
        loading="lazy"
      />
    </div>
  );
};

export default ImageLogin;
