// Get webcam access
const webcamElement = document.getElementById('webcam');
const startButton = document.getElementById('startButton');
const captureButton = document.getElementById('captureButton');
const recordButton = document.getElementById('recordButton');
const canvas = document.getElementById('canvas');
const constraints = {
    video: true,
    audio: false
};

startButton.addEventListener('click', async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        handleSuccess(stream);
    } catch (e) {
        console.error('Webcam access error:', e);
    }
});

function handleSuccess(stream) {
    webcamElement.srcObject = stream;
}

// Capture Snapshot
captureButton.addEventListener('click', () => {
    canvas.width = webcamElement.videoWidth;
    canvas.height = webcamElement.videoHeight;
    canvas.getContext('2d').drawImage(webcamElement, 0, 0);
    // You can save or process the captured snapshot here
});

// Record Video
let mediaRecorder;
let recordedChunks = [];

recordButton.addEventListener('click', () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
        console.log('Recording stopped');
    } else {
        recordedChunks = [];
        const stream = webcamElement.srcObject;
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };
        mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, { type: 'video/webm' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            document.body.appendChild(a);
            a.style.display = 'none';
            a.href = url;
            a.download = 'webcam-recorded-video.webm';
            a.click();
            window.URL.revokeObjectURL(url);
        };
        mediaRecorder.start();
        console.log('Recording started');
    }
});
