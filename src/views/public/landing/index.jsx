import React from "react";
import "./langingPage.css";
import ImgWithFallback from "components/general/ImgWithFallback";

// imgs
import * as teamImgs from "./teamImages.jsx";
import * as landingPageImgs from "./landingPageImages.jsx";

function LandingPage(props) {
  return (
    <>
      <div className="main-banner">
        <div className="main-banner-slider-area slider-nav">
          <div className="main-banner-single-slider">
            <div className="container">
              <div className="banner-text-area">
                <h1> تكويد المحاصيل التصديرية </h1>
                <p>
                  يواجه المزارعون الكثير من المشاكل اثناء قيامهم بتصدير المحاصيل الزراعية الخاصة بهم
                  ومن هذا المنطلق قامت الحكومة بالتعاون مع شركة محاصيل مصر بتفعيل منظومة التكويد
                  الجديدة وهى عملية تتبع للمزارع التى تريد تصدير إنتاجها عن طريق رفع إحداثيات هذه
                  المزارع بأستخدام أجهزة تحديد المواقع والاقمار الصناعية .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="fun-facts fun-facts-1 bg-f8f8f8">
        <div className="container" style={{ maxWidth: "1400px" }}>
          <div className="fun-facts-content">
            <div className="row">
              <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                <div className="fun-facts-text-area pr-20">
                  <div className="default-section-title">
                    <h3> محاصيل مصر</h3>
                  </div>
                  <p>التحول الرقمي ورؤيه 2030</p>
                </div>
              </div>
              <div className="col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="fun-facts-card-area">
                  <div className="row">
                    <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                      <div className="fun-facts-card">
                        <h2>
                          <span className="odometer" data-count="60">
                            265K
                          </span>
                          {/* <span className="odo-text">K</span> */}
                        </h2>
                        <p>فدان</p>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                      <div className="fun-facts-card">
                        <h2>
                          <span className="odometer" data-count="1523">
                            12
                          </span>
                        </h2>
                        <p>محافظة</p>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                      <div className="fun-facts-card">
                        <h2>
                          <span className="odometer" data-count="294">
                            54
                          </span>
                        </h2>
                        <p>مركز </p>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 col-6">
                      <div className="fun-facts-card">
                        <h2>
                          <span className="odometer" data-count="1523">
                            5500K
                          </span>
                        </h2>
                        <p>مزرعة</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about pb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="about-img-area">
                <ImgWithFallback
                  srcSet={landingPageImgs.webp_a1}
                  fallback={landingPageImgs.jpg_a1}
                  alt="teamImg"
                  type="image/webp"
                  className="main-img"
                />
                {/* <img
                  className="main-img"
                  src="assets/images/about/a1-1.png"
                  alt="img"
                /> */}
                {/* <img
                  className="small-img"
                  src="assets/images/about/cert.jpg"
                  alt="img"
                /> */}
                <ImgWithFallback
                  srcSet={landingPageImgs.webp_cert}
                  fallback={landingPageImgs.jpg_cert}
                  alt="teamImg"
                  type="image/webp"
                  className="small-img"
                />
              </div>
            </div>
            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="why-only-we-text-area pr-20">
                <div className="default-section-title">
                  <h3>
                    التعاون بين الحجر الزراعي المصري و شركة «محاصيل مصر» لرفع إحداثيات مزارع التصدير
                    وإدخالها فى المنظومة الرقمية الجديدة
                  </h3>
                </div>
                <p>
                  تشتهر الصادرات المصرية الزراعيه وخصوصا الموالح (البرتقال واليوسيفى والليمون
                  والجريب فروت) بالجوده فى المكونات والشكل الظاهرى وذلك بسبب المناخ الذى يسمح بزراعة
                  أجود المحاصيل الزراعية من الفواكه والخضروات الشتوية مثل الموالح بجميع أنواعها
                  وأيضا الفراولة والعنب والرمان والعديد من الخضراوات وباقى المحاصيل الزراعية ، وتتجه
                  مصر الان الى تطبيق أحدث أساليب التكنولوجيا فى مجال الزراعة وتقنين وتتبع المزارع
                  التى تريد تصدير أنتاجها لضمان جودتها حقوق المستورد العربى والأجنبى من الجودة
                  والتاكد من النسب العالمية للمبيدات الحشرية وأيضا ضمان الكمية الأنتاجية بشكل دقيق
                  ومن هذا المنطلق قامت اداره الحجر الزراعى المصري بتوقيع بروتوكول تعاون مشترك مع
                  شركة محاصيل مصر وهى شركة مساهمه مصريه تقوم برفع احداثيات المزارع بإستخدام أحدث
                  اجهزة تحديد المواقع والاقمار الصناعيه .
                </p>
                <div className="why-we-list">
                  <ul>
                    <li>
                      <i className="fas fa-check"></i> تقديم الطلب
                    </li>
                    <li>
                      <i className="fas fa-check"></i> رفع الأحداثيات
                    </li>
                    <li>
                      <i className="fas fa-check"></i> الفحص والتحليل
                    </li>
                    <li>
                      <i className="fas fa-check"></i> االتكويد
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="banner">
        {/* <div className="shape">
          <img
            className="shape1"
            src="assets/images/shape/shape1.png"
            alt="img"
          />
        </div> */}
        <div className="banner-content-3">
          <div className="row">
            <div className="col-lg-6">
              <div className="banner-img-3">
                <img src="assets/images/banner/banner-3-img.jpg" alt="img" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="banner-text-area banner-text-area-3 pl-20">
                <h1>استخدام التكنولوجيا الرقمية وأجهزة الـ GPS وصور الأقمار الصناعية</h1>
                <p>
                  تقنية (GPS): هي مجموعة من الاقمار الصناعية وتقوم هذه الانظمة بتحديد الموقع
                  بالابعاد الثلاثية بدقة متناهية. ويستخدم على نطاق واسع في المجالات الطبوغرافية حيث
                  يتكامل نظام المعلومات الجغرافية الذي يستخدم لتجميع وتحليل بيانات معالم سطح الكرة
                  الارضية.. ويستخدم أيضا في تحديد المواقع والحدود ورسم الخرائط بالاضافة لاستخدامه في
                  الملاحة بكل انواعها ودراسات الفضاء .
                </p>
                <div className="banner-buttons">
                  <ul>
                    <li>
                      <a className="default-button" href="/contact">
                        تواصل معنا <i className="fas fa-arrow-left"></i>
                      </a>
                    </li>
                    <li>
                      <a className="default-button banner-button" href="services.html">
                        اعرف اكثر عن التكويد
                        <i className="fas fa-arrow-left"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="team ptb-100">
        <div className="container">
          <div className="default-section-title default-section-title-middle">
            <h3>مهندسينا في المزارع للتكويد</h3>
          </div>
          <div className="section-content">
            <div className="row ">
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                <div className="team-card">
                  <ImgWithFallback
                    srcSet={teamImgs.webp_01}
                    fallback={teamImgs.jpg_01}
                    alt="teamImg"
                    type="image/webp"
                  />
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                <div className="team-card">
                  <ImgWithFallback
                    srcSet={teamImgs.webp_02}
                    fallback={teamImgs.jpg_02}
                    alt="teamImg"
                    type="image/webp"
                  />
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                <div className="team-card">
                  <ImgWithFallback
                    srcSet={teamImgs.webp_03}
                    fallback={teamImgs.jpg_03}
                    alt="teamImg"
                    type="image/webp"
                  />
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                <div className="team-card">
                  <ImgWithFallback
                    srcSet={teamImgs.webp_04}
                    fallback={teamImgs.jpg_04}
                    alt="teamImg"
                    type="image/webp"
                  />
                </div>
              </div>
              {/* </div> */}
              {/* </div> */}

              {/* <div className="section-content"> */}
              {/* <div className="row "> */}
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                <div className="team-card">
                  <ImgWithFallback
                    srcSet={teamImgs.webp_05}
                    fallback={teamImgs.jpg_05}
                    alt="teamImg"
                    type="image/webp"
                  />
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                <div className="team-card">
                  <ImgWithFallback
                    srcSet={teamImgs.webp_06}
                    fallback={teamImgs.jpg_06}
                    alt="teamImg"
                    type="image/webp"
                  />
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                <div className="team-card">
                  <ImgWithFallback
                    srcSet={teamImgs.webp_07}
                    fallback={teamImgs.jpg_07}
                    alt="teamImg"
                    type="image/webp"
                  />
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                <div className="team-card">
                  <ImgWithFallback
                    srcSet={teamImgs.webp_08}
                    fallback={teamImgs.jpg_08}
                    alt="teamImg"
                    type="image/webp"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-banner">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="banner-text-area banner-text-area-2">
                <h1>حمل التطبيق الان </h1>
                <p>يمكن الان تحميل التطبيق من متجر جوجل بلاي او أبل استور.</p>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="banner-img-2">
                <a
                  target="_blank"
                  href="https://play.google.com/store/apps/details?id=com.takweed.app"
                  rel="noreferrer"
                >
                  <img src="assets/images/googleplay.png" alt="img" />
                </a>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="banner-img-2">
                <img src="assets/images/appstore.png" alt="img" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LandingPage;
