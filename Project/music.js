
// Instantiate the model by loading the desired checkpoint.
const model = new mm.MusicVAE(
    'https://storage.googleapis.com/download.magenta.tensorflow.org/' +
    'tfjs_checkpoints/music_vae/trio_4bar_lokl_small_q1');
const player = new mm.Player();

const start = () => {
    document.getElementById("start").style.visibility = "hidden";
    document.getElementById("stop").style.visibility = "visible";
    // Resume AudioContext on user action to enable audio.
    mm.Player.tone.context.resume();
    model.initialize().then(
        // Endlessly sample and play back the result.
        function sampleAndPlay() {
        return model.sample(1)
            .then((samples) => player.start(samples[0]))
            .then(sampleAndPlay);
        }
    )
};

const stop = () => {
    document.getElementById("start").style.visibility = "visible";
    document.getElementById("stop").style.visibility = "hidden";
    player.stop()
}