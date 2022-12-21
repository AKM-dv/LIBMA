// Set up the video element and scan button
const video = document.getElementById('webcam');
const scanButton = document.getElementById('scan-button');

// Request access to the webcam
navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
  video.srcObject = stream;
});

// Start the QR code scanning process when the scan button is clicked
scanButton.addEventListener('click', () => {
  // Your QR code scanning code will go here
});
scanButton.addEventListener('click', () => {
    // Set up a canvas element to hold the video frame
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
  
    // Draw the current frame of the video onto the canvas
    ctx.drawImage(video, 0, 0);
  
    // Encode the canvas image as a data URI
    const dataURI = canvas.toDataURL('image/png');
  
    // Send the data URI to the server to decode the QR code
    fetch('/decode', {
      method: 'POST',
      body: dataURI
    }).then(response => {
      return response.text();
    }).then(data => {
      // Display the QR code data to the user
     
  