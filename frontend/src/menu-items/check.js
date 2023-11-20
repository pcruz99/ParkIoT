// assets
import { BackHand } from "@mui/icons-material";

// constant
const icons = {
  BackHand
};

const check = {
  id: 'utilities',
  title: 'Registro de Vehículos',
  caption: 'Registro de E/S',
  type: 'group',
  children: [
    {
      id: 'manual-check',
      title: 'Registro Manual',
      type: 'item',
      url: '/check/manual',
      icon: icons.BackHand,
      breadcrumbs: false
    }
  ]
};

export default check;
