//Funcion para estraer el nombre que ha asignado al usuario en su correo
export const extraerUsuarioCorreo = function (correo) {
    let aa = "";
    for (let i = 0; i < correo.length; i++) {
    if (correo[i] != '@') {
      aa += correo[i];
    } else {      
      return aa;
    }
  }
  return null;
};
