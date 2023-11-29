const labels = [...Array(40).keys()]

export const mockChartData = {
  labels,
  datasets: [
    {
      label: 'Subscription',
      data: labels.map(() => Math.random() * 1000),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      yAxisID: 'y',
    },
    {
      label: 'Tip',
      data: labels.map(() => Math.random() * 1000),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      yAxisID: 'y',
    },
  ],
}
