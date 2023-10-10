from uuid import uuid3, NAMESPACE_DNS
from io import BytesIO
import qrcode
from base64 import b64encode


def create_qrcode(username: str = "", url: str = "") -> list:
    try:
        # Creat Unique Identifier by the username and hash MD5
        uuid = uuid3(NAMESPACE_DNS, username)
        # Create QRCODE for the user and encode to base64
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(f'{url}/check/{uuid.hex}')
        qr.make(fit=True)
        img = qr.make_image(fill_color="black", back_color="white")

        buffered = BytesIO()
        img.save(buffered)
        img_str = b64encode(buffered.getvalue()).decode("utf-8")

        return [img_str, uuid]
    except Exception:
        print(Exception.args)
        return ["", ""]
