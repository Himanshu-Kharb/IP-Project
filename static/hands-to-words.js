// Initialize the video stream
const videoElement = document.getElementById('gesture-video');
const gestureText = document.getElementById('gesture-text');

// Start video feed
navigator.mediaDevices.getUserMedia({
    video: true
}).then((stream) => {
    videoElement.srcObject = stream;
}).catch((err) => {
    console.error("Error accessing webcam: " + err);
});

// Mediapipe Hand Gesture Detection setup
const hands = new Hands({
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    }
});

hands.onResults((results) => {
    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        // This is where you will add the code to detect gestures from landmarks
        // For now, we'll just display a message
        gestureText.innerText = "Gesture detected!";
    } else {
        gestureText.innerText = "No gesture detected yet...";
    }
});

// Set up video capture and feed to Mediapipe
const camera = new Camera(videoElement, {
    onFrame: async () => {
        await hands.send({ image: videoElement });
    },
    width: 640,
    height: 480
});
camera.start();
