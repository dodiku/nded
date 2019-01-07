const createAudioContent = resolve => {
    window.AudioContext = window.AudioContext || window.webkitAudioContext
    context = new AudioContext()
    console.log('🔊 audio context loaded')
    return resolve()
}

const createAudioBuffer = soundPath => {
    sound.audio = new Audio()
    sound.audio.src = soundPath
    // sound.audio.loop = true
    sound.audio.onended = () => {
        readAudioProperties()
        sound.audio.play()
    }

    sound.source = context.createMediaElementSource(sound.audio)

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

const readAudioProperties = () => {
    // playback rate
    const newPlayBackRate =
        audioProperties.currentPlayBackRate -
        ((new Date() -
            new Date(
                audioProperties.startTimeYear,
                audioProperties.startTimeMonth,
                audioProperties.startTimeDay
            ) +
            audioProperties.dayMs * audioProperties.DaysInTheFuture) /
            audioProperties.dayMs) *
            audioProperties.DailyPlayBackRateChange

    sound.audio.playbackRate =
        newPlayBackRate < audioProperties.minimumSpeed
            ? audioProperties.minimumSpeed
            : newPlayBackRate

    console.log('👟 current playback rate:', sound.audio.playbackRate)
}

const playAudio = changeButtonLabel => {
    readAudioProperties()
    isPlaying = !isPlaying
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
        promise = sound.audio.play()
        // changePlayButtonLabel()
    } else {
        promise = sound.audio.pause()
        changeButtonLabel && changePlayButtonLabel()
    }

    if (promise !== undefined) {
        promise
            .then(_ => {
                changeButtonLabel && changePlayButtonLabel()
                // Autoplay started!
            })
            .catch(error => {
                // Autoplay was prevented.
                // Show a "Play" button so that user can start playback.
                console.log('ERROR:', error)
            })
    }
}

const muteAudio = changeButtonLabel => {
    if (sound.gain.gain.value === 0) {
        sound.gain.gain.value = 1
        changeButtonLabel && changeMuteButtonLabel(true)
        console.log('🔊 unmuted')
    } else {
        sound.gain.gain.value = 0
        changeButtonLabel && changeMuteButtonLabel(false)
        console.log('🔇 muted')
    }
}
