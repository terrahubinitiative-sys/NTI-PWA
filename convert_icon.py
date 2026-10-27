import os
from PIL import Image

os.makedirs('icons', exist_ok=True)
try:
    img = Image.open('nti-logo.jpg')
    img.resize((192, 192)).save('icons/icon-192.png')
    img.resize((512, 512)).save('icons/icon-512.png')
    print("NTI PWA Icons successfully generated inside /icons folder!")
except Exception as e:
    print("Error generating icons:", e)
