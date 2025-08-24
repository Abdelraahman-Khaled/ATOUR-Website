import GeneralAPI from "api/generalApi";
import BannerDetails from "./BannerDetails/BannerDetails";
import InfoNewsDetails from "./BannerDetails/InfoNewsDetails";
import ContainerMedia from "Components/ContainerMedia/ContainerMedia";
import HelmetInfo from "Components/HelmetInfo/HelmetInfo";
import { useLanguage } from "Components/Languages/LanguageContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./NewsDetails.css";

const NewsDetails = () => {
  const { currentLanguage } = useLanguage(); // Get the current language
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to handle errors
  const [newsDetailsCard, setNewsDetailsCard] = useState(null); // State to store fetched data
  const { idCardDetailsNews } = useParams();

  // Fetch data on component mount
  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        // Use the blog API endpoint as requested by the user
        const response = await GeneralAPI.getBlogDetails(idCardDetailsNews, currentLanguage);
        setNewsDetailsCard(response.data);
        
        // If the API is not yet implemented or returns no data, fall back to mock data
        if (!response.data) {
          // Mock data based on ID
          const mockData = {
            1: {
              id: 1,
              title: currentLanguage === 'ar' ? 'افتتاح وجهة سياحية جديدة في جنوب آسيا' : 'New Tourist Destination Opens in South Asia',
              content_ar: 'تم افتتاح وجهة سياحية جديدة في جنوب آسيا، مما يوفر للمسافرين فرصة لاستكشاف ثقافة فريدة ومناظر طبيعية خلابة. تتميز هذه الوجهة بمزيج من المعالم التاريخية والشواطئ الاستوائية والمأكولات المحلية الشهية. يمكن للزوار الاستمتاع بمجموعة متنوعة من الأنشطة، بما في ذلك الغوص والتجديف والمشي لمسافات طويلة واستكشاف المعابد القديمة. توفر الفنادق والمنتجعات المحلية إقامة مريحة بأسعار معقولة، مما يجعلها خيارًا مثاليًا للمسافرين ذوي الميزانية المحدودة والباحثين عن الرفاهية على حد سواء.',
              content_en: 'A new tourist destination has opened in South Asia, providing travelers with an opportunity to explore unique culture and stunning landscapes. This destination features a mix of historical landmarks, tropical beaches, and delicious local cuisine. Visitors can enjoy a variety of activities, including diving, kayaking, hiking, and exploring ancient temples. Local hotels and resorts offer comfortable accommodation at reasonable prices, making it an ideal choice for both budget travelers and luxury seekers.',
              created_at: '2023-08-05',
              photo: 'https://via.placeholder.com/800x450',
              publisherphoto: 'https://via.placeholder.com/45x45',
              publisher_name: currentLanguage === 'ar' ? 'أحمد محمد' : 'Ahmed Mohamed'
            },
            2: {
              id: 2,
              title: currentLanguage === 'ar' ? 'تخفيضات موسمية على الرحلات الدولية' : 'Seasonal Discounts on International Trips',
              content_ar: 'أعلنت شركات الطيران الرئيسية عن تخفيضات كبيرة على الرحلات الدولية خلال موسم الخريف. استفد من هذه العروض المحدودة لزيارة وجهات أحلامك بتكلفة أقل. تشمل العروض رحلات إلى أوروبا وآسيا وأمريكا الشمالية، مع خصومات تصل إلى 30٪ على أسعار التذاكر العادية. بالإضافة إلى ذلك، تقدم بعض شركات الطيران مزايا إضافية مثل الأمتعة المجانية وترقيات المقاعد للحجوزات المبكرة. يُنصح المسافرون بالحجز قبل نهاية الشهر للاستفادة من أفضل الأسعار والتوافر.',
              content_en: 'Major airlines have announced significant discounts on international flights during the fall season. Take advantage of these limited-time offers to visit your dream destinations at a lower cost. The offers include flights to Europe, Asia, and North America, with discounts of up to 30% on regular ticket prices. Additionally, some airlines are offering extra perks such as free baggage and seat upgrades for early bookings. Travelers are advised to book before the end of the month to benefit from the best prices and availability.',
              created_at: '2023-09-12',
              photo: 'https://via.placeholder.com/800x450',
              publisherphoto: 'https://via.placeholder.com/45x45',
              publisher_name: currentLanguage === 'ar' ? 'سارة أحمد' : 'Sara Ahmed'
            },
            3: {
              id: 3,
              title: currentLanguage === 'ar' ? 'إجراءات سفر جديدة للوجهات الأوروبية' : 'New Travel Procedures for European Destinations',
              content_ar: 'تم تحديث إجراءات السفر للوجهات الأوروبية. تعرف على المتطلبات الجديدة للتأشيرات والوثائق المطلوبة قبل التخطيط لرحلتك القادمة. تشمل التغييرات الرئيسية نظام تصريح السفر الإلكتروني الجديد، والذي سيكون إلزاميًا لجميع المسافرين من خارج الاتحاد الأوروبي. بالإضافة إلى ذلك، هناك متطلبات صحية محدثة، بما في ذلك شهادات التطعيم وبروتوكولات الاختبار. من المهم أيضًا التحقق من تغطية التأمين الصحي للسفر، حيث أصبحت الآن إلزامية لمعظم الزيارات السياحية.',
              content_en: 'Travel procedures for European destinations have been updated. Learn about the new visa requirements and necessary documents before planning your next trip. Major changes include a new electronic travel authorization system, which will be mandatory for all travelers from outside the EU. Additionally, there are updated health requirements, including vaccination certificates and testing protocols. It\'s also important to check travel health insurance coverage, as it is now mandatory for most tourist visits.',
              created_at: '2023-10-20',
              photo: 'https://via.placeholder.com/800x450',
              publisherphoto: 'https://via.placeholder.com/45x45',
              publisher_name: currentLanguage === 'ar' ? 'محمد علي' : 'Mohamed Ali'
            }
          };
          
          setNewsDetailsCard(mockData[idCardDetailsNews]);
        }
      } catch (err) {
        console.error("Error fetching news data:", err);
        setError("Failed to load news data. Please try again later.");
        
        // Fallback to mock data in case of API error
        const mockData = {
          1: {
            id: 1,
            title: currentLanguage === 'ar' ? 'افتتاح وجهة سياحية جديدة في جنوب آسيا' : 'New Tourist Destination Opens in South Asia',
            content_ar: 'تم افتتاح وجهة سياحية جديدة في جنوب آسيا، مما يوفر للمسافرين فرصة لاستكشاف ثقافة فريدة ومناظر طبيعية خلابة. تتميز هذه الوجهة بمزيج من المعالم التاريخية والشواطئ الاستوائية والمأكولات المحلية الشهية. يمكن للزوار الاستمتاع بمجموعة متنوعة من الأنشطة، بما في ذلك الغوص والتجديف والمشي لمسافات طويلة واستكشاف المعابد القديمة. توفر الفنادق والمنتجعات المحلية إقامة مريحة بأسعار معقولة، مما يجعلها خيارًا مثاليًا للمسافرين ذوي الميزانية المحدودة والباحثين عن الرفاهية على حد سواء.',
            content_en: 'A new tourist destination has opened in South Asia, providing travelers with an opportunity to explore unique culture and stunning landscapes. This destination features a mix of historical landmarks, tropical beaches, and delicious local cuisine. Visitors can enjoy a variety of activities, including diving, kayaking, hiking, and exploring ancient temples. Local hotels and resorts offer comfortable accommodation at reasonable prices, making it an ideal choice for both budget travelers and luxury seekers.',
            created_at: '2023-08-05',
            photo: 'https://via.placeholder.com/800x450',
            publisherphoto: 'https://via.placeholder.com/45x45',
            publisher_name: currentLanguage === 'ar' ? 'أحمد محمد' : 'Ahmed Mohamed'
          },
          2: {
            id: 2,
            title: currentLanguage === 'ar' ? 'تخفيضات موسمية على الرحلات الدولية' : 'Seasonal Discounts on International Trips',
            content_ar: 'أعلنت شركات الطيران الرئيسية عن تخفيضات كبيرة على الرحلات الدولية خلال موسم الخريف. استفد من هذه العروض المحدودة لزيارة وجهات أحلامك بتكلفة أقل. تشمل العروض رحلات إلى أوروبا وآسيا وأمريكا الشمالية، مع خصومات تصل إلى 30٪ على أسعار التذاكر العادية. بالإضافة إلى ذلك، تقدم بعض شركات الطيران مزايا إضافية مثل الأمتعة المجانية وترقيات المقاعد للحجوزات المبكرة. يُنصح المسافرون بالحجز قبل نهاية الشهر للاستفادة من أفضل الأسعار والتوافر.',
            content_en: 'Major airlines have announced significant discounts on international flights during the fall season. Take advantage of these limited-time offers to visit your dream destinations at a lower cost. The offers include flights to Europe, Asia, and North America, with discounts of up to 30% on regular ticket prices. Additionally, some airlines are offering extra perks such as free baggage and seat upgrades for early bookings. Travelers are advised to book before the end of the month to benefit from the best prices and availability.',
            created_at: '2023-09-12',
            photo: 'https://via.placeholder.com/800x450',
            publisherphoto: 'https://via.placeholder.com/45x45',
            publisher_name: currentLanguage === 'ar' ? 'سارة أحمد' : 'Sara Ahmed'
          },
          3: {
            id: 3,
            title: currentLanguage === 'ar' ? 'إجراءات سفر جديدة للوجهات الأوروبية' : 'New Travel Procedures for European Destinations',
            content_ar: 'تم تحديث إجراءات السفر للوجهات الأوروبية. تعرف على المتطلبات الجديدة للتأشيرات والوثائق المطلوبة قبل التخطيط لرحلتك القادمة. تشمل التغييرات الرئيسية نظام تصريح السفر الإلكتروني الجديد، والذي سيكون إلزاميًا لجميع المسافرين من خارج الاتحاد الأوروبي. بالإضافة إلى ذلك، هناك متطلبات صحية محدثة، بما في ذلك شهادات التطعيم وبروتوكولات الاختبار. من المهم أيضًا التحقق من تغطية التأمين الصحي للسفر، حيث أصبحت الآن إلزامية لمعظم الزيارات السياحية.',
            content_en: 'Travel procedures for European destinations have been updated. Learn about the new visa requirements and necessary documents before planning your next trip. Major changes include a new electronic travel authorization system, which will be mandatory for all travelers from outside the EU. Additionally, there are updated health requirements, including vaccination certificates and testing protocols. It\'s also important to check travel health insurance coverage, as it is now mandatory for most tourist visits.',
            created_at: '2023-10-20',
            photo: 'https://via.placeholder.com/800x450',
            publisherphoto: 'https://via.placeholder.com/45x45',
            publisher_name: currentLanguage === 'ar' ? 'محمد علي' : 'Mohamed Ali'
          }
        };
        
        setNewsDetailsCard(mockData[idCardDetailsNews]);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchNewsData();
  }, [idCardDetailsNews, currentLanguage]);

  // Display loading state
  if (loading) {
    return (
      <div className="airPlan-dot" />
    );
  }
  // Display error state
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <>
      <HelmetInfo titlePage={currentLanguage === "ar" ? "تفاصيل الخبر" : "News Details"} />

      <div className="details-news-card">
        {/* ========== START SLIDER DETIALS NEWS ============ */}
        <div className="slider-details-news">
          <BannerDetails img={newsDetailsCard.photo} />
        </div>
        {/* ========== END SLIDER DETIALS NEWS ============ */}
        {/* ========== START CONTAINER ============= */}
        <ContainerMedia>
          <InfoNewsDetails newsDetailsCard={newsDetailsCard} />
        </ContainerMedia>
        {/* ========== END CONTAINER ============= */}
      </div>
    </>
  );
};

export default NewsDetails;