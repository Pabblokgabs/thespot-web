import React from "react";
import * as echarts from "echarts";

const Chards = ({activeTab}:any) => {

  // Initialize analytics charts
  React.useEffect(() => {
    // Revenue by Spot Chart
    const revenueBySpotChart = document.getElementById("revenue-by-spot-chart");
    if (revenueBySpotChart) {
      const chart = echarts.init(revenueBySpotChart);
      const option = {
        animation: false,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: ["Revenue", "Bookings"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: [
            "Seaside Restaurant",
            "Urban Spa",
            "Event Hall",
            "Rooftop Bar",
          ],
        },
        yAxis: [
          {
            type: "value",
            name: "Revenue ($)",
            min: 0,
            max: 50000,
            interval: 10000,
          },
          {
            type: "value",
            name: "Bookings",
            min: 0,
            max: 250,
            interval: 50,
          },
        ],
        series: [
          {
            name: "Revenue",
            type: "bar",
            data: [45000, 32000, 28000, 37500],
            itemStyle: {
              color: "#2563EB",
            },
          },
          {
            name: "Bookings",
            type: "line",
            yAxisIndex: 1,
            data: [180, 145, 120, 210],
            itemStyle: {
              color: "#10B981",
            },
          },
        ],
      };
      chart.setOption(option);
      window.addEventListener("resize", () => chart.resize());
      return () => {
        window.removeEventListener("resize", () => chart.resize());
        chart.dispose();
      };
    }
    // Booking Distribution Chart
    const bookingDistChart = document.getElementById(
      "booking-distribution-chart"
    );
    if (bookingDistChart) {
      const chart = echarts.init(bookingDistChart);
      const option = {
        animation: false,
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          right: 10,
          top: "center",
        },
        series: [
          {
            name: "Booking Type",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "16",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 45, name: "Direct", itemStyle: { color: "#2563EB" } },
              { value: 25, name: "Website", itemStyle: { color: "#10B981" } },
              { value: 20, name: "Partners", itemStyle: { color: "#F59E0B" } },
              { value: 10, name: "Others", itemStyle: { color: "#6B7280" } },
            ],
          },
        ],
      };
      chart.setOption(option);
      window.addEventListener("resize", () => chart.resize());
      return () => {
        window.removeEventListener("resize", () => chart.resize());
        chart.dispose();
      };
    }
    // Demographics Chart
    const demographicsChart = document.getElementById("demographics-chart");
    if (demographicsChart) {
      const chart = echarts.init(demographicsChart);
      const option = {
        animation: false,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: ["Male", "Female", "Other"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
          data: ["18-24", "25-34", "35-44", "45-54", "55+"],
        },
        series: [
          {
            name: "Male",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: [120, 200, 150, 80, 70],
            itemStyle: { color: "#2563EB" },
          },
          {
            name: "Female",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: [110, 190, 140, 90, 80],
            itemStyle: { color: "#EC4899" },
          },
          {
            name: "Other",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: [20, 30, 25, 15, 10],
            itemStyle: { color: "#6B7280" },
          },
        ],
      };
      chart.setOption(option);
      window.addEventListener("resize", () => chart.resize());
      return () => {
        window.removeEventListener("resize", () => chart.resize());
        chart.dispose();
      };
    }
    // Peak Hours Chart
    const peakHoursChart = document.getElementById("peak-hours-chart");
    if (peakHoursChart) {
      const chart = echarts.init(peakHoursChart);
      const option = {
        animation: false,
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["Weekday", "Weekend"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM", "10PM"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "Weekday",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: "#2563EB",
            },
            emphasis: {
              focus: "series",
            },
            data: [30, 45, 75, 70, 60, 85, 95, 60],
          },
          {
            name: "Weekend",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: "#10B981",
            },
            emphasis: {
              focus: "series",
            },
            data: [40, 65, 85, 80, 75, 95, 100, 85],
          },
        ],
      };
      chart.setOption(option);
      window.addEventListener("resize", () => chart.resize());
      return () => {
        window.removeEventListener("resize", () => chart.resize());
        chart.dispose();
      };
    }
    // Followers Chart
    const chartDom = document.getElementById("followers-chart");
    if (chartDom) {
      const myChart = echarts.init(chartDom);
      const option = {
        animation: false,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: [
              "Seaside Restaurant",
              "Urban Spa",
              "Event Hall",
              "Rooftop Bar",
            ],
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              rotate: 30,
              fontSize: 10,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Followers",
            type: "bar",
            barWidth: "60%",
            data: [
              { value: 1250, itemStyle: { color: "#4F46E5" } },
              { value: 875, itemStyle: { color: "#4F46E5" } },
              { value: 520, itemStyle: { color: "#4F46E5" } },
              { value: 1680, itemStyle: { color: "#4F46E5" } },
            ],
          },
        ],
      };
      myChart.setOption(option);
      // Resize chart on window resize
      window.addEventListener("resize", () => {
        myChart.resize();
      });
      return () => {
        window.removeEventListener("resize", () => {
          myChart.resize();
        });
        myChart.dispose();
      };
    }
  }, [activeTab]);
}

export default Chards