import "chart.js/auto";
import { Bar, Pie } from "react-chartjs-2";

import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
// import useExternalScript from "../../../utils/customHooks/useExternalScript";

import { useEffect, useState } from "react";
import axios from "services/axios.inercept";
// import Map from './map/Map';
import { setStorage, getStorage } from "../../../utils/storage/storage";

const reqByStatusLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
// const reqByViewsLabels = [
//   'أخبار زراعية',
//   'الإستيراد والتصدير',
//   'توصيات زراعية',
//   'وزارة الزراعة وإستصلاح الأراضي',
// ];
const reqByStatusColors = {
  reject: "red",
  accept: "green",
  inprogress: "#fbc658",
};
// const reqByCropsColors = {
//   خوخ: '#FFE5B4',
//   موالح: '#f9ca24',
//   فراولة: '#EA2027',
//   جوافة: '#EA2027',
//   طماطم: '#d63031',
//   برقوق: '#8b668b',
//   مشمش: '#fdcb6e',
//   مانجا: '#f39c12',
//   بصل: '#95a5a6',
//   فلفل: '#009432',
//   عنب: '#6F1E51',
//   رمان: '#eb4d4b',
//   بطاطس: '#ffeaa7',
// };
// const markerClusterScript = "https://unpkg.com/@googlemaps/markerclusterer/dist/index.min.js";

function Charts() {
  // const markerClusterState = useExternalScript(markerClusterScript, "markerClusterer");

  const [reqByStatus, setReqByStatus] = useState([]);
  const [reqByAllCrops, setReqByAllCrops] = useState({
    labels: [],
    counts: [],
    colors: [],
  });
  const [reqBycrops, setReqBycrops] = useState([]);
  const [reqByviews, setReqByViews] = useState({});
  const [cropsId, setCropsId] = useState([]);
  const [govsId, setGovsId] = useState([]);
  // console.log(reqByviews);
  // console.log(reqBycrops);
  const dashboardRequestsStatisticsChart = {
    data: (canvas) => {
      return {
        labels: reqByAllCrops.labels,
        datasets: [
          {
            label: "# of Votes",
            pointRadius: 10,
            pointHoverRadius: 10,
            backgroundColor: reqByAllCrops.colors,
            borderWidth: 2,
            data: reqByAllCrops.counts,
          },
        ],
      };
    },
    options: {
      plugins: {
        legend: { display: true },
        tooltip: { enabled: true },
      },
      maintainAspectRatio: false,
      pieceLabel: {
        render: "percentage",
        fontColor: ["white"],
        precision: 10,
      },
    },
  };
  const reqByStatusChart = {
    data: (canvas) => {
      return {
        labels: reqByStatusLabels,
        datasets: reqByStatus?.map((el, i) => {
          return {
            label: el._id.statusArr,
            data: el.arr?.map((el) => {
              return { x: reqByStatusLabels[el.x - 1], y: el.y };
            }),
            // stack: `stack ${i}`,
            // grouped: true,
            backgroundColor: reqByStatusColors[el._id.statusArr],
            barPercentage: 0.5,
            barThickness: 15,
            maxBarThickness: 15,
            minBarLength: 2,
            xAxisID: "x",
            yAxisID: "y",
          };
        }),
      };
    },

    options: {
      interaction: {
        mode: "x",
      },
      // scales: {
      //   x: {
      //     stacked: true,
      //   },
      //   y: {
      //     stacked: true,
      //   },
      // },
      plugins: {
        legend: {
          display: true,
          // display: false,
          // position: 'left',
          // align: 'chartArea',
        },
      },
      responsive: true,
    },
  };
  const reqByCropsChart = {
    data: (canvas) => {
      return {
        labels: reqByStatusLabels,
        datasets: reqBycrops?.map((el) => {
          return {
            label: el._id.name,
            data: el.arr?.map((el) => {
              return { x: reqByStatusLabels[el.x - 1], y: el.y };
            }),
            borderColor: el._id.color,
            backgroundColor: el._id.color,
            barPercentage: 0.5,
            barThickness: 8,
            maxBarThickness: 8,
            minBarLength: 2,
            xAxisID: "x",
            yAxisID: "y",
          };
        }),
      };
    },
    options: {
      interaction: {
        mode: "x",
      },
      plugins: {
        legend: {
          display: true,
        },
      },
      responsive: true,
    },
  };
  const reqByViewsChart = {
    data: (canvas) => {
      return {
        labels: reqByviews.name,
        datasets: [
          {
            label: "المشاهدات",
            data: reqByviews.views,
            borderColor: "green",
            backgroundColor: "green",
            barPercentage: 0.5,
            barThickness: 50,
            maxBarThickness: 50,
            minBarLength: 2,
          },
        ],
      };
    },
    options: {
      options: {
        plugins: {
          legend: { display: true },
        },
        responsive: true,
      },
    },
  };

  function getPieData() {
    const data = getStorage("MahaseelPerYear");
    if (data) {
      setReqByAllCrops(JSON.parse(data));
    } else {
      axios
        .get("/admin/dashboard/charts")
        .then((response) => {
          const obj = { labels: [], counts: [], colors: [] };

          response?.data?.forEach((item) => {
            obj.labels.push(item._id.name_ar);
            obj.counts.push(item.count);
            obj.colors.push(item._id.color);
          });
          setStorage("MahaseelPerYear", JSON.stringify(obj));
          setReqByAllCrops(obj);
        })
        .catch((e) => console.error(e));
    }
  }
  function getReqByStatus() {
    const data = getStorage("MahaseelStatus");
    if (data) {
      setReqByStatus(JSON.parse(data));
    } else {
      axios
        .get("/admin/dashboard/requestsbystatus")
        .then((response) => {
          setStorage("MahaseelStatus", JSON.stringify(response.data));
          setReqByStatus(response.data);
        })
        .catch((e) => console.error(e));
    }
  }
  function getReqByCrops() {
    const data = getStorage("MahaseelPerMonth");
    if (data) {
      setReqBycrops(JSON.parse(data));
    } else {
      axios
        .get("/admin/dashboard/requestsbycrops")
        .then((response) => {
          setStorage("MahaseelPerMonth", JSON.stringify(response.data));
          setReqBycrops(response.data);
        })
        .catch((e) => console.error(e));
    }
  }
  function getReqByViews() {
    const data = getStorage("postsViews");
    if (data) {
      setReqByViews(JSON.parse(data));
    } else {
      axios
        .get("/admin/dashboard/postsviews")
        .then((response) => {
          const data = response.data.reduce(
            (prev, curr) => {
              prev.name.push(curr._id.name);
              prev.views.push(curr.No_of_Views);
              return prev;
            },
            { name: [], views: [] }
          );
          setStorage("postsViews", JSON.stringify(data));
          setReqByViews(data);
        })
        .catch((e) => console.error(e));
    }
  }
  function getCropsId() {
    const data = getStorage("CropsId");
    if (data) {
      setCropsId(JSON.parse(data));
    } else {
      axios
        .get("/admin/crop")
        .then((response) => {
          // console.log(response.data.data);
          const data = response.data.data.reduce((prev, curr) => {
            prev.push({ name: curr.name_ar, code: curr._id });
            return prev;
          }, []);
          const sortedCropsId = data.sort(function (a, b) {
            return a.name.localeCompare(b.name, ["ar"]);
          });
          setStorage("CropsId", JSON.stringify(sortedCropsId));
          setCropsId(sortedCropsId);
        })
        .catch((e) => console.error(e));
    }
  }
  function getGovsId() {
    const data = getStorage("GovsId");
    if (data) {
      setGovsId(JSON.parse(data));
    } else {
      axios
        .get("/admin/location")
        .then((response) => {
          // console.log(response.data.data);
          const data = response.data.data.reduce((prev, curr) => {
            prev.push({ name: curr.name_ar, code: curr._id });
            return prev;
          }, []);
          const sortedGovsId = data.sort(function (a, b) {
            return a.name.localeCompare(b.name, ["ar"]);
          });
          setStorage("GovsId", JSON.stringify(sortedGovsId));
          setGovsId(sortedGovsId);
        })
        .catch((e) => console.error(e));
    }
  }

  useEffect(() => {
    getPieData();
    getReqByStatus();
    getReqByCrops();
    getReqByViews();
    getCropsId();
    getGovsId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Row>
      <Col md="4">
        <Card>
          <CardHeader>
            <CardTitle tag="h5">إحصائيات التكويد</CardTitle>
            <p className="card-category">تمثيل بياني للمحاصيل المكودة </p>
          </CardHeader>
          <CardBody style={{ height: "21em" }}>
            <Pie
              data={dashboardRequestsStatisticsChart.data}
              options={dashboardRequestsStatisticsChart.options}
            />
          </CardBody>
        </Card>
      </Col>

      {/* {markerClusterState === 'loading' && <p>Loading...</p>}
      {markerClusterState === 'ready' && (
        <Map
          center={{ lat: 26.8025, long: 30.8206 }}
          cropsId={cropsId}
          govsId={govsId}
        />
      )} */}
      {/* {!markerClusterState && <p>Loading...</p>}
      {markerClusterState && (
        <Map
          center={{ lat: 26.8025, long: 30.8206 }}
          cropsId={cropsId}
          govsId={govsId}
        />
      )} */}

      {/* // <Map */}
      {/* //   center={{ lat: 26.8025, long: 30.8206 }} */}
      {/* //   cropsId={cropsId} */}
      {/* //   govsId={govsId} */}
      {/* // /> */}
      <Col md="12">
        <Card className="card-chart">
          <CardHeader>
            <CardTitle tag="h5">بياني تكويد المحاصيل </CardTitle>
            <p className="card-category">خاص بعرض حالة الطلبات لسنة 2022</p>
          </CardHeader>
          <CardBody>
            <Bar
              data={reqByStatusChart.data}
              options={reqByStatusChart.options}
              width={500}
              height={100}
            />
          </CardBody>
        </Card>
      </Col>
      <Col md="12">
        <Card className="card-chart">
          <CardHeader>
            <CardTitle tag="h5">بياني تكويد المحاصيل </CardTitle>
            <p className="card-category">بياني خاص بعرض نسبة تكويد المحاصيل لسنة 2022</p>
          </CardHeader>
          <CardBody>
            <Bar
              data={reqByCropsChart.data}
              options={reqByCropsChart.options}
              width={400}
              height={100}
            />
          </CardBody>
        </Card>
      </Col>
      <Col md="12">
        <Card className="card-chart">
          <CardHeader>
            <CardTitle tag="h5">بياني عدد المشاهدات </CardTitle>
            <p className="card-category"> بياني خاص بعرض عدد مشاهدات الاخبار</p>
          </CardHeader>
          <CardBody>
            <Bar
              data={reqByViewsChart.data}
              options={reqByViewsChart.options}
              width={400}
              height={100}
            />
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default Charts;
