let sound
let isPlaying = false
let context

window.onload = () => {
    initAudio()
}

const initAudio = async () => {
    return new Promise(resolve => createAudioContent(resolve))
        .then(() => {
            return createAudioBuffer('assets/audio/niggasgetshoteverydayb.wav')
        })
        .then(() => {
            console.log('✅ all done')
            return addPlayButton(playAudio)
        })
        .catch(error => {
            console.log('🐞 something went wrong... =>', error)
        })
}

const createAudioContent = resolve => {
    window.AudioContext = window.AudioContext || window.webkitAudioContext
    context = new AudioContext()
    console.log('🔊 audio context loaded')
    return resolve()
}

const createAudioBuffer = soundPath => {
    sound = new Audio()
    sound.loop = true
    sound.src = soundPath

    sound.source = context.createMediaElementSource(sound)

    sound.analyser = context.createAnalyser()

    sound.analyser.fftSize = 2048
    sound.dataArray = new Uint8Array(sound.analyser.frequencyBinCount)

    sound.gain = context.createGain()

    // source --> analyser
    sound.source.connect(sound.analyser)

    // analyser --> gain
    sound.analyser.connect(sound.gain)

    // gain --> out
    sound.gain.connect(context.destination)

    console.log('📻 audio buffer loaded')
}

const addPlayButton = func => {
    playButton = document.createElement('button')
    playButton.textContent = '▶️ PLAY'
    playButton.className = 'playButton'
    playButton.id = 'playButton'

    document.getElementsByClassName('controls')[0].appendChild(playButton)

    document.getElementById('playButton').addEventListener('click', () => {
        playAudio()
    })
    console.log('▶️ button added')
}

const changeButtonLabel = () => {
    if (isPlaying) {
        playButton.textContent = '️⏹ STOP'
    } else {
        playButton.textContent = '️▶️ PLAY'
    }
}

const playAudio = () => {
    console.log('isPlaying:', isPlaying)

    let promise

    // check if context is in suspended state (autoplay policy)
    if (context.state === 'suspended') {
        context.resume().then(() => {
            console.log('Playback resumed successfully')
        })
    }

    // play or pause track depending on state
    if (isPlaying) {
        promise = sound.play()
        // changeButtonLabel()
    } else {
        promise = sound.pause()
        // changeButtonLabel()
    }

    if (promise !== undefined) {
        promise
            .then(_ => {
                isPlaying = !isPlaying
                changeButtonLabel()
                // Autoplay started!
            })
            .catch(error => {
                // Autoplay was prevented.
                // Show a "Play" button so that user can start playback.
                console.log('ERROR:', error)
            })
    }
}
