from uuid import uuid3, NAMESPACE_DNS
from io import BytesIO
import qrcode
from base64 import b64encode

def create_qrcode(username:str="") -> str:
    try:
        # Creat Unique Identifier by the username and hash MD5
        uid = uuid3(NAMESPACE_DNS, username)
        # Create QRCODE for the user and encode to base64
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(uid.hex)
        qr.make(fit=True)
        img = qr.make_image(fill_color="black", back_color="white")

        buffered = BytesIO()
        img.save(buffered)
        img_str = b64encode(buffered.getvalue()).decode("utf-8")
        return img_str
    except Exception:
        print(Exception.args)
        return uid.hex


    
