import React from 'react';
import { useLanguage } from 'Components/Languages/LanguageContext';
import './TermsConditions.css';

const TermsConditions = () => {
  const { currentLanguage } = useLanguage();

  return (
    <div className="terms-container">
      <div className="terms-content">
        <h1>{currentLanguage === 'ar' ? 'الشروط والأحكام' : 'Terms and Conditions'}</h1>
        <div className="terms-section">
          {currentLanguage === 'ar' ? (
            <>
              <h2>1. شروط الاستخدام</h2>
              <p>باستخدامك لموقع Atour، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى عدم استخدام موقعنا.</p>
              
              <h2>2. الحجوزات والدفع</h2>
              <p>جميع الحجوزات تخضع لتوفر الخدمات. يجب دفع المبلغ كاملاً أو جزء منه (حسب نوع الرحلة) لتأكيد الحجز. قد تطبق رسوم إلغاء في حالة إلغاء الحجز.</p>
              
              <h2>3. سياسة الإلغاء</h2>
              <p>يمكن إلغاء الحجوزات قبل 14 يومًا من تاريخ الرحلة مع استرداد كامل المبلغ. الإلغاء بين 7-14 يومًا يستحق استرداد 50% من المبلغ. الإلغاء قبل أقل من 7 أيام لا يستحق أي استرداد.</p>
              
              <h2>4. المسؤولية</h2>
              <p>لا تتحمل Atour المسؤولية عن أي إصابات أو خسائر أو أضرار قد تحدث أثناء الرحلات. يتحمل المسافرون مسؤولية التأكد من امتلاكهم للتأمين المناسب.</p>
              
              <h2>5. حقوق الملكية الفكرية</h2>
              <p>جميع المحتويات المنشورة على موقعنا محمية بموجب قوانين حقوق النشر والملكية الفكرية. لا يجوز نسخ أو توزيع أي محتوى دون إذن كتابي مسبق.</p>
            </>
          ) : (
            <>
              <h2>1. Terms of Use</h2>
              <p>By using the Atour website, you agree to comply with these terms and conditions. If you do not agree with any part of these terms, please do not use our website.</p>
              
              <h2>2. Bookings and Payment</h2>
              <p>All bookings are subject to service availability. Full or partial payment (depending on the type of trip) must be made to confirm the booking. Cancellation fees may apply in case of booking cancellation.</p>
              
              <h2>3. Cancellation Policy</h2>
              <p>Bookings can be cancelled up to 14 days before the trip date for a full refund. Cancellations between 7-14 days are eligible for a 50% refund. Cancellations less than 7 days before do not qualify for any refund.</p>
              
              <h2>4. Liability</h2>
              <p>Atour is not responsible for any injuries, losses, or damages that may occur during trips. Travelers are responsible for ensuring they have appropriate insurance coverage.</p>
              
              <h2>5. Intellectual Property Rights</h2>
              <p>All content published on our website is protected under copyright and intellectual property laws. No content may be copied or distributed without prior written permission.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;