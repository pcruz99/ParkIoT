// ===========================|| DASHBOARD - TOTAL GROWTH BAR CHART ||=========================== //

const chartData = (data) => {
  const MAD = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const MAN = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const TAR = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const NOC = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  data?.data.registers.forEach((d) => {
    switch (d.part_of_day) {
      case 'MAD':
        MAD[d.month - 1] = d.total;
        break;
      case 'MAN':
        MAN[d.month - 1] = d.total;
        break;
      case 'TAR':
        TAR[d.month - 1] = d.total;
        break;
      case 'NOC':
        NOC[d.month - 1] = d.total;
        break;
    }
  });

  return {
    height: 480,
    type: 'bar',
    options: {
      chart: {
        id: 'bar-chart',
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%'
        }
      },
      xaxis: {
        type: 'category',
        categories: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC']
      },
      legend: {
        show: true,
        fontSize: '14px',
        fontFamily: `'Roboto', sans-serif`,
        position: 'bottom',
        offsetX: 20,
        labels: {
          useSeriesColors: false
        },
        markers: {
          width: 16,
          height: 16,
          radius: 5
        },
        itemMargin: {
          horizontal: 15,
          vertical: 8
        }
      },
      fill: {
        type: 'solid'
      },
      dataLabels: {
        enabled: false
      },
      grid: {
        show: true
      }
    },
    series: [
      {
        name: 'MADRUGADA',
        data: MAD
      },
      {
        name: 'DE MAÑANA',
        data: MAN
      },
      {
        name: 'TARDE',
        data: TAR
      },
      {
        name: 'NOCHE',
        data: NOC
      }
    ]
  };
};
export default chartData;
