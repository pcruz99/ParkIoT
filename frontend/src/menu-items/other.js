// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons';
import StorefrontIcon from '@mui/icons-material/Storefront';
import DiscountIcon from '@mui/icons-material/Discount';

// constant
const icons = { IconBrandChrome, IconHelp, StorefrontIcon, DiscountIcon };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'sample-docs-roadmap',
  title: 'Más Información',
  type: 'group',
  children: [
    {
      id: 'sample-page',
      title: 'Información del Comercial Miñaca',
      type: 'item',
      url: 'https://www.comercialminaca.com/',
      icon: icons.StorefrontIcon,
      breadcrumbs: false,
      external: true,
      target: true
    }
  ]
};

export default other;
