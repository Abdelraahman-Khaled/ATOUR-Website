import {
  faAmericanSignLanguageInterpreting,
  faCheckCircle,
  faGlobe,
  faHandshake,
  faHeadphones,
  faLanguage,
  faMoneyBill,
  faMoneyBill1,
  faMoneyBill1Wave,
  faMoneyBillWave,
  faPercent,
  faPercentage,
  faSackDollar,
  faSignLanguage,
  faTicket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CheckIcon from "assets/Icons/CheckIcon";
import Edite from "assets/images/IconsBooks/Edite";
import GiftCardIcon from "assets/images/IconsBooks/GiftCardIcon";
import LocationIconCard from "assets/images/IconsBooks/LocationIconCard";
import PayIcon from "assets/images/IconsBooks/PayIcon";
import Star from "assets/images/IconsBooks/Star";
import TicketIcon from "assets/images/IconsBooks/TicketIcon";

export const cardsBooks = [
  {
    id: 0,
    icon: <FontAwesomeIcon icon={faHeadphones} className="font-awesome" />,
    title: "خدمة عملاء متميزة",
    text: "فريق دعم متواجد دائمًا للرد على استفساراتك ومساعدتك في كل خطوة من رحلتك، لضمان تجربة سلسة ومريحة.",
  },
  {
    id: 1,
    icon: <PayIcon />,
    title: "بوابة دفع آمنة",
    text: " احجز وادفع بثقة من خلال نظام دفع محمي ومتوافق مع أعلى معايير الأمان الإلكتروني.",
  },

  {
    id: 2,
    icon: <FontAwesomeIcon icon={faGlobe} className="font-awesome" />,
    title: "متعدد اللغات",
    text: "منصة متاحة بـ12 لغة لتسهيل تجربة الحجز لجميع المستخدمين حول العالم، بلغتك المفضلة.",
  },
  {
    id: 3,
    icon: <CheckIcon />,

    title: "موثق ومرخص",
    text: "جميع الخدمات والمرشدين المرخصين لضمان تجربة قانونية وآمنة مع التزام تام بالمعايير المحلية والدولية.",
  },
  {
    id: 4,
    icon: <FontAwesomeIcon icon={faHandshake} className="font-awesome" />,
    title: "شركاء موثوقون",
    text: "نتعاون فقط مع المرشدين، منظمي الجولات، والمتاجر الموثوق بها لتقديم تجربة عالية الجودة ومضمونة.",
  },
  {
    id: 5,
    icon: <FontAwesomeIcon icon={faSackDollar} className="font-awesome" />,
    title: "عروض ومكافآت",
    text: "استمتع بخصومات حصرية، عروض موسمية، وبرامج مكافآت تكافئ حجزك وتجعل كل تجربة أكثر قيمة.",
  },
  {
    id: 6,
    icon: <Star />,
    title: "مراجعات دقيقة",
    text: " تقييمات ومراجعات موثوقة من المستخدمين تساعدك في اختيار أفضل الجولات والخدمات بثقة.",
  },
  {
    id: 7,
    icon: <FontAwesomeIcon icon={faMoneyBillWave} className="font-awesome" />,
    title: "عروض واضحة وأسعار منافسة",
    text: "استمتع بخصومات وعروض حصرية مع شفافية كاملة للأسعار، لضمان أفضل قيمة مقابل كل تجربة تحجزها",
  },
];
