from datetime import date

feriados = (
    ('anio nuevo', ['02/01/2023', '01/01/2024', '01/01/2025']),
    ('carnaval', ['20/02/2023', '12/02/2024', '03/02/2025']),
    ('carnaval', ['21/02/2023', '13/02/2024', '04/02/2025']),
    ('viernes santo', ['07/04/2023', '29/04/2024', '18/04/2025']),
    ('dia del trabajo', ['01/05/2023', '03/05/2024', '02/05/2025']),
    ('batalla de pichincha', ['26/05/2023', '24/05/2024', '23/05/2025']),
    ('primer grito de independencia', [
     '11/08/2023', '11/08/2024', '11/08/2025']),
    ('independencia de guayaquil', ['09/10/2023', '11/10/2024' '10/10/2025']),
    ('dia de difuntos', ['03/11/2023', '01/11/2024', '04/11/2025']),
    ('independencia de cuenca', ['03/11/2023', '04/11/2024', '03/11/2025']),
    ('navidad', ['25/12/2023', '25/12/2024', '25/12/2025']),
)

def es_feriado(fecha: date) -> bool:
    fecha = fecha.strftime("%d/%m/%Y")
    for f in feriados:
        tam_fechas = len(f[1])
        if tam_fechas > 1:
            for k in f[1]:
                if k == fecha:
                    return True
        elif tam_fechas > 0 and tam_fechas <= 1:
            return True if f[1][0] == fecha else False
        return False
