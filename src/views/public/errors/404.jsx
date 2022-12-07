import React from 'react';

function Error404(props) {
  return (
    <section className="error ptb-100">
      <div className="container">
        <div className="error-content">
          <img src="/assets/images/error.png" alt="img" />
          <h4>نأسف الصفحه المطلوبه غير متوفره حاليا</h4>
          <p>
            ربما تكون الصفحة المطلوبه قد تم حذفها او تعديل المسار من الاداره
            يمكنك البحث هنا
          </p>

          <a className="default-button" href="/">
            العوده للرئيسية <i className="fas fa-arrow-left"></i>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Error404;
