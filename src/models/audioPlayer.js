const audioPlayer = () => {

    // get audio element tag
    const audio = document.querySelector("audio");
    // craete audio context
    const ctx = new AudioContext();
    //create audio source
    const audioSource = ctx.createMediaElementSource(audio);
    //create analyzer
    const analyzer = ctx.createAnalyser();
    //connect source to analuzer and back to context's destination
    audioSource.connect(analyzer);
    audioSource.connect(ctx.destination);
    // print frequency
    const frequencyData = new Uint8Array(analyzer.frequencyBinCount);
    analyzer.getByteFrequencyData(frequencyData);
    console.log("frequencyData", frequencyData);
    // create set of predfined bars
    // audio.volume = 0.25
    audio.play();
}

export default audioPlayer;