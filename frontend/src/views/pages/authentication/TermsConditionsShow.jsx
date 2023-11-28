import React from 'react';
//MUI
import { Typography, Box, Button } from '@mui/material';
import { Undo } from '@mui/icons-material';
//react-router
import { Link } from 'react-router-dom';
//customs
import GeneralBack from 'components/GeneralBack';

const TermsConditionsShow = () => {
  return (
    <GeneralBack title="Términos y Condiciones">
      <Box textAlign={'end'} sx={{ margin: 2 }}>
        <Button variant="contained" component={Link} to="/register" size="medium">
          <Undo />
          <Typography sx={{ margin: 1 }}>Regresar</Typography>
        </Button>
      </Box>
      <Typography variant="h3">Términos y Condiciones Generales:</Typography>
      <Typography variant="body1" align="justify">
        {`Al registrarse y utilizar nuestra aplicación web, el usuario acepta los siguientes términos y condiciones.`}
      </Typography>
      <Box textAlign={'justify'}>
        <ul>
          <li>El usuario debe proporcionar información precisa y actualizada durante el proceso de registro.</li>
          <li>El usuario es responsable de mantener la confidencialidad de su información de cuenta y contraseña.</li>
          <li>
            La aplicación está destinada exclusivamente para el uso personal de los usuarios. Cualquier uso comercial o no autorizado está
            prohibido.
          </li>
          <li>
            Nos reservamos el derecho de modificar, suspender o descontinuar cualquier aspecto de la aplicación, incluida la gestión de
            parqueaderos, en cualquier momento y sin previo aviso.
          </li>
          <li>
            La disponibilidad de espacios de estacionamiento está sujeta a cambios y puede no reflejar la situación en tiempo real debido a
            factores como la actualización periódica de datos y eventos imprevistos.
          </li>
          <li>
            La aplicación registra la entrada y salida de vehículos con el propósito de mejorar la gestión del estacionamiento y brindar
            información precisa a los usuarios.
          </li>
          <li>La información del usuario y los datos de vehículos serán tratados de acuerdo con nuestra política de privacidad.</li>
          <li>
            Se implementan medidas de seguridad, pero no se puede garantizar la seguridad absoluta de los datos. El usuario acepta los
            riesgos asociados con la transmisión de información a través de internet.
          </li>
          <li>El usuario es responsable de la precisión de la información proporcionada y del uso adecuado de la aplicación.</li>
          <li>El usuario debe notificar cualquier acceso no autorizado a su cuenta de inmediato.</li>
          <li>No nos hacemos responsables de pérdidas, daños o gastos incurridos como resultado del uso de la aplicación.</li>
          <li>No nos responsabilizamos de la disponibilidad de espacios de estacionamiento en tiempo real.</li>
          <li>Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento.</li>
          <li>
            Nos reservamos el derecho de suspender o cancelar la cuenta de un usuario en caso de violación de estos términos y condiciones.
          </li>
          <li>Estos términos y condiciones se rigen por las leyes del lugar donde se encuentra el sistema.</li>
        </ul>
      </Box>
    </GeneralBack>
  );
};

export default TermsConditionsShow;
