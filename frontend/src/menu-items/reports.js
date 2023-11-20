// assets
import { Assessment, ImportExport, SmartToy } from '@mui/icons-material';

// constant
const icons = {
  Assessment,
  ImportExport,
  SmartToy
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const reports = {
  id: 'pages',
  title: 'Analisis',
  caption: 'Visualizar Información',
  type: 'group',
  children: [
    {
      id: 'prognosis',
      title: 'Prognóstico IA',
      type: 'item',
      url: '/prognosis/',
      icon: icons.SmartToy
      // target: true
    },
    {
      id: 'reports',
      title: 'Reportes',
      type: 'collapse',
      icon: icons.Assessment,
      children: [
        {
          id: 'general',
          title: 'General',
          type: 'item',
          url: '/report/general/'
          // icon: icons.SmartToy
          // target: true
        },
        {
          id: 'es',
          title: 'E/S de Vehiculos',
          type: 'item',
          url: '/report/es/'
          // icon: icons.ImportExport
          // target: true
        }
      ]
    }
  ]
};

export default reports;
