const startButton = document.getElementById('startButton');
const screenSharingVideo = document.getElementById('screen-sharing-video');

// Check if the browser supports screen sharing
if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
    alert('Screen sharing is not supported in this browser.');
} else {
    startButton.addEventListener('click', startScreenSharing);
}

function startScreenSharing() {
    navigator.mediaDevices.getDisplayMedia({ video: true })
        .then((stream) => {
            screenSharingVideo.srcObject = stream;
            startButton.disabled = true;
        })
        .catch((error) => {
            console.error('Error accessing screen sharing:', error);
        });
}
