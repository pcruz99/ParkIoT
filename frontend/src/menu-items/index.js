import dashboard from './dashboard';
import reports from './reports';
import other from './other';
import check from './check';
// ==============================|| MENU ITEMS ||============================== //

const menuItems = (account) => {
  switch (account?.user.role) {
    case 'admin':
      return { items: [dashboard, reports, check, other] };
    case 'guard':
      return { items: [dashboard, check, other] };
    case 'client':
      return { items: [dashboard, other] };
    default:
      return { items: [dashboard, reports, check, other] };
  }
};

export default menuItems;
