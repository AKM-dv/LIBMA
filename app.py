from flask import Flask, request
import pyzbar.pyzbar as pyzbar
import base64
import cv2

app = Flask(__name__)

@app.route('/decode', methods=['POST'])
def decode_qr_code():
  # Get the data URI from the request body
  data_uri = request.data

  # Decode the data URI
  header, encoded_image = data_uri.split(',', 1)
  image_data = base64.b64decode(encoded_image)

  # Load the image data into a NumPy array
  image = np.frombuffer(image_data, dtype=np.uint8)

  # Decode the QR code
  decoded_objs = pyzbar.decode(image)

  # Extract the data from the QR code
  if decoded_objs:
    qr_data = decoded_objs[0].data.decode('utf-8')
  else:
    qr_data = ''

  # Return the QR code data as the response
  return qr_data

if __name__ == '__main__':
  app.run()
