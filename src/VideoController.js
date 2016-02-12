/**
 * Created by Arthur on 13/02/2016.
 */

class VideoController {
    constructor(video, framerate) {
        this.video = video;
        this.framerate = framerate;
    }

    render(frame) {
        this.video.currentTime = frame / this.framerate;
    }
}

export default VideoController;
