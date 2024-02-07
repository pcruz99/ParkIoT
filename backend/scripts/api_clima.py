import os
import environ
import requests
from requests.auth import HTTPBasicAuth
from pathlib import Path

env = environ.Env()
environ.Env.read_env(os.path.join(
    Path(__file__).resolve().parent.parent, '.env'))

API_USER = str(env('METEOMATICAS_API_USER'))
API_PASS = str(env('METEOMATICAS_API_PASS'))

LATITUDE = str(env('LATITUDE'))
LONGITUDE = str(env('LONGITUDE'))

def get_temperature(date: str) -> dict:
    try:
        # url = f'https://api.meteomatics.com/2023-10-10T00:00:00Z/t_2m:C,precip_24h:mm,wind_speed_10m:ms/0.2531,79.1754/json'
        url = 'https://api.meteomatics.com/{0}T00:00:00Z/t_2m:C/{1},{2}/json'.format(
            date, LATITUDE, LONGITUDE)
        response = requests.get(url, auth=HTTPBasicAuth(API_USER, API_PASS))
        if response.ok:
            data = {"temp": response.json(
            )['data'][0]['coordinates'][0]['dates'][0]['value']}
            response.close()
            return {"success": True, "data": data, "msg":"Datos obtenidos con exito"}
        else:
            response.close()
            if response.status_code == 403:
                return {'success': False, "msg": "No se puede predecir la temperatura del dia en mas de 10 dias", "error": "max10days"}
            return {"success": False, "error": "other"}
    except Exception:
        return {"success": False, "error": "other"}