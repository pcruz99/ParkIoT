// assets
import { IconDashboard } from '@tabler/icons';
import { LocalParking } from '@mui/icons-material';

// constant
const icons = { IconDashboard, LocalParking };

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
      icon: icons.LocalParking,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
