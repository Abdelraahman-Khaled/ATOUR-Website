import icon_1 from "../../../../assets/images/login/socialIcon/01.svg";
import icon_2 from "../../../../assets/images/login/socialIcon/02.svg";
import icon_3 from "../../../../assets/images/login/socialIcon/03.svg";
import "./EndLoginInfo.css";

const EndLoginInfo = () => {
  return (
    <div style={{visibility:"hidden"}} className="info-bottom-login-end ">
      <h2 className="text-info-top">تسجيل الدخول بواسطة</h2>
      <div className="all-social-content-end d-flex flex-wrap justify-content-center pt-4  align-items-center  gap-3">
        <a href="##" className="link-social-login">
          {" "}
          <img src={icon_1} alt="icon" width={"20px"} height={"20px"} /> آبل
        </a>
        <a href="##" className="link-social-login">
          {" "}
          <img src={icon_2} alt="icon" width={"20px"} height={"20px"} /> جوجل
        </a>
        <a href="##" className="link-social-login">
          {" "}
          <img src={icon_3} alt="icon" width={"20px"} height={"20px"} /> فيس بوك
        </a>
      </div>
    </div>
  );
};

export default EndLoginInfo;
