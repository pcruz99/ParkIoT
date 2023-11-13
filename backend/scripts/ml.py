from datetime import date
import pandas as pd

# sklearn
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn import preprocessing

from .feriados import es_feriado
from .promotionalday import es_promotionday
from .api_clima import get_temperature
from .partofday import pod_to_num

LR = LogisticRegression(random_state=0)
label_encoder = preprocessing.LabelEncoder()
ML_SCORE = None


def get_ml_score():
    return ML_SCORE

def teach_model(queryset):
    global LR
    global ML_SCORE

    data = pd.DataFrame(list(queryset.values(
        'part_of_day', 'is_holiday', 'is_weekend', 'is_promotionday', 'number_vehicles', 'temperature')))

    data['is_holiday'] = label_encoder.fit_transform(data['is_holiday'])
    data['is_weekend'] = label_encoder.fit_transform(data['is_weekend'])
    data['is_promotionday'] = label_encoder.fit_transform(
        data['is_promotionday'])
    # data['part_of_day'] = label_encoder.fit_transform(data['part_of_day'])
    pod = []
    for i in data['part_of_day']:
        pod.append(pod_to_num(i))
    data['part_of_day'] = pod

    avg = data['number_vehicles'].mean()
    amount = []
    for i in data['number_vehicles']:
        # 0 es una cantidad baja y 1 es alta
        amount.append(1 if i >= avg else 0)
    data['amount'] = amount

    y = data['amount']
    data.drop(['number_vehicles', 'amount'], axis=1, inplace=True)
    X = data

    try:
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=99)
    except ValueError:
        return 0

    try:
        LR.fit(X_train.values, y_train.values)
    except ValueError:
        return 0

    # print(X_train.values)
    # print(y_train.values)
    # print(X_test.values)
    # print(y_test.values)
    ML_SCORE = LR.score(X_test.values, y_test.values)
    return ML_SCORE


def prognosis_model(date: date, pod: str):
    """
    @param: date The value is de date selected
    @param: pod The value is the part of day (values MAD, MAN, TAR, NOC)
    """
    global LR

    if ML_SCORE == None:
        return {"success": False, "msg": "Modelo no Entrenado", "error": "mlNotTeach"}

    try:
        part_of_day = pod_to_num(pod)
    except ValueError:
        return {"success": False, "msg": "Error de Tipo/Formato de Datos de POD", "error": "wrongDataPOD"}

    is_holiday = es_feriado(date)
    is_weekend = True if date.weekday() >= 5 else False
    is_promotionday = es_promotionday(date)

    temp = get_temperature(str(date))
    # TODO: FIX: Arreglar el mensaje de error donde solo se puede hacer el pedido de temperatura
    # para 10 dias adelantes y 1 dia para atras en la cuenta gratutita
    if not temp['success'] and temp['error'] == 'max10days':
        return {"success": False, "msg": 'Predicciones de mas de 10 dias no se pueden realizar', "error": "max10days"}

    #!: En caso de que la temperatura no se obtenga de la API Meteomatics
    #!: mantendre el resultado de 0 como un string para que salte la excepcion de la prediccion
    #!: para saber que el valor de la temperatura no se esta obteniendo de la API.
    temperature = temp['data']['temp'] if temp['success'] else "0"

    try:
        data = LR.predict(
            [[is_holiday, is_weekend, is_promotionday, part_of_day, temperature]])
        # data = LR.predict(
        #     [[0, 0, 0, 3, 1]])
        return {"success": True, "msg": "Prediccion Realizada con Exito", "data": data[0]}
    except Exception:
        return {"success": False, "msg": "Problema en la prediccion", "error": "errorPredict"}
