//Cambiar el tamaño del texto, definiendo la primera letra siempre en mayuscula
export const capitalizerCustom = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
