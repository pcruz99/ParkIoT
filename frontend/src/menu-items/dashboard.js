// assets
import { IconDashboard } from '@tabler/icons';
import { LocalParking } from '@mui/icons-material';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'parking',
      title: 'Parqueadero',
      type: 'item',
      url: '/dashboard/parking',
      icon: LocalParking,
      breadcrumbs: false
    },
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
