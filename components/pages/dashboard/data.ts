export const chartOptions = {
  responsive: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Line Chart - Multi Axis',
    },
  },
  scales: {
    y: {
      type: 'linear' as const,
      display: true,
      position: 'left' as const,
    },
    // y1: {
    //   type: 'linear' as const,
    //   display: true,
    //   position: 'right' as const,
    //   grid: {
    //     drawOnChartArea: false,
    //   },
    // },
  },
}
