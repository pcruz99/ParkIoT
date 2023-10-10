// assets
import { Assessment, ImportExport, SmartToy } from '@mui/icons-material';

// constant
const icons = {
  Assessment,
  ImportExport,
  SmartToy
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  // title: 'Pages',
  // caption: 'Pages Caption',
  type: 'group',
  children: [
    {
      id: 'prognosis',
      title: 'Prognostico IA',
      type: 'item',
      url: '/report/prognosis',
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
          url: '/',
          // icon: icons.SmartToy
          // target: true
        },
        {
          id: 'es',
          title: 'E/S de Vehiculos',
          type: 'item',
          url: '/report/show',
          // icon: icons.ImportExport
          // target: true
        }
      ]
    }
  ]
};

export default pages;
