// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons';
import StorefrontIcon from '@mui/icons-material/Storefront';
import DiscountIcon from '@mui/icons-material/Discount';

// constant
const icons = { IconBrandChrome, IconHelp, StorefrontIcon, DiscountIcon };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'sample-docs-roadmap',
  title: 'Información',
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
    },
    {
      id: 'promotions',
      title: 'Promociones del Comercial Miñaca',
      type: 'item',
      url: 'https://www.comercialminaca.com/sale/',
      icon: icons.DiscountIcon,
      breadcrumbs: false,
      external: true,
      target: true
    },
    // {
    //   id: 'promotions',
    //   title: 'Promociones del Comercial Miñaca',
    //   type: 'item',
    //   url: '/sample-page',
    //   icon: icons.DiscountIcon,
    //   breadcrumbs: false
    // },
    // {
    //   id: 'documentation',
    //   title: 'Documentation',
    //   type: 'item',
    //   url: 'https://codedthemes.gitbook.io/berry/',
    //   icon: icons.IconHelp,
    //   external: true,
    //   target: true
    // }
  ]
};

export default other;
