document.addEventListener('DOMContentLoaded', function() {
    const videoUrls = [
        "https://www.youtube.com/embed/ItIgZiW0k_0?si=6jYmr3DtwjDrC509",
        "https://www.youtube.com/embed/YFLMWv9fuo4?si=O8Diqn-Fc1Gt3qcE",
        "https://www.youtube.com/embed/cXO3T7UlgTw?si=YqGzWHzEBypJdlKb",
        "https://www.youtube.com/embed/auqEKREmlBw?si=U02mQ6ZcLMJP2xCB",
        "https://www.youtube.com/embed/oVc8MaiUPPQ?si=NiZyqwL0QnnTwHRw"
    ];

    const carousel = document.getElementById('carousel');
    const videos = [];

    videoUrls.forEach(url => {
        const iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        carousel.appendChild(iframe);
        videos.push(iframe);
    });
    

    let currentIndex = 0;

    document.getElementById('prevBtn').addEventListener('click', () => {
        if (currentIndex > 0) {
            pauseCurrentVideo();
            currentIndex--;
            updateCarousel();
        }
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        if (currentIndex < videoUrls.length - 1) {
            pauseCurrentVideo();
            currentIndex++;
            updateCarousel();
        }
    });

    function updateCarousel() {
        const offset = -currentIndex * 100;
        carousel.style.transform = `translateX(${offset}%)`;
    }

    function pauseCurrentVideo() {
        const currentVideo = videos[currentIndex];
        currentVideo.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }
});
