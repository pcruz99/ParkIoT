import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
// const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
// const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
// const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
// const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
// const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

//qrcode page
const QrcodeShow = Loadable(lazy(() => import('views/pages/QrcodeShow')));
const CheckShow = Loadable(lazy(() => import('views/pages/CheckShow')));
const CheckManualShow = Loadable(lazy(() => import('views/pages/CheckManualShow')));

const VehicleShow = Loadable(lazy(() => import('views/pages/VehicleShow')));
const VehicleCreate = Loadable(lazy(() => import('views/pages/VehicleCreate')));
const VehicleEdit = Loadable(lazy(() => import('views/pages/VehicleEdit')));

const ParkingShow = Loadable(lazy(() => import('views/dashboard/ParkingShow')));

const PrognosisShow = Loadable(lazy(() => import('views/reports/PrognosisShow')));
const GeneralReportShow = Loadable(lazy(() => import('views/reports/GeneralReportShow')));
const ESResportShow = Loadable(lazy(() => import('views/reports/ESReportShow')));

import { ProtectedRoute } from 'components/Route/ProtectedRoute';

// ==============================|| MAIN ROUTING ||============================== //
const MainRoutes = (account) => {
  const role = account.user?.role ?? 'anonymous';
  const Routes = {
    path: '/',
    element: <ProtectedRoute isAllowed={account.isLoggedIn} redirecTo="/login" />,
    children: [
      {
        path: '/',
        element: <MainLayout />,
        children: [
          {
            path: '/',
            element: <ParkingShow />
          },
          {
            path: 'dashboard',
            children: [
              {
                path: 'default',
                element: <DashboardDefault />
              },
              {
                path: 'parking',
                element: <ParkingShow />
              }
            ]
          },
          {
            path: 'qrcode',
            element: <QrcodeShow />
          },
          {
            path: 'check',
            element: <ProtectedRoute isAllowed={role === 'guard' || role === 'admin'} redirecTo="/" />,
            children: [
              {
                path: 'manual',
                element: <CheckManualShow />
              },
              {
                path: ':uuid',
                element: <CheckShow />
              }
            ]
          },
          {
            path: 'vehicle',
            children: [
              {
                path: 'show',
                element: <VehicleShow />
              },
              {
                path: 'create',
                element: <VehicleCreate />
              },
              {
                path: 'edit/:id',
                element: <VehicleEdit />
              }
            ]
          },
          {
            path: 'prognosis',
            element: (
              <ProtectedRoute isAllowed={role === 'admin'} redirecTo="/">
                <PrognosisShow />
              </ProtectedRoute>
            )
          },
          {
            path: 'report',
            element: <ProtectedRoute isAllowed={role === 'admin'} redirecTo="/" />,
            children: [
              {
                path: 'general',
                element: <GeneralReportShow />
              },
              {
                path: 'es',
                element: <ESResportShow />
              }
            ]
          }
        ]
      }
    ]
  };
  return Routes;
};

export default MainRoutes;
