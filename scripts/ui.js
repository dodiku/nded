const addPlayButton = (func, buttonLabel) => {
    playButton = document.createElement('button')
    playButton.textContent = '▶ ' + buttonLabel
    playButton.className = 'playButton'
    playButton.id = 'playButton'

    document.getElementsByClassName('controls')[0].appendChild(playButton)

    document.getElementById('playButton').addEventListener('click', () => {
        func()
    })
    console.log('▶️ button added')

    addOscilloscope(document.getElementsByClassName('controls')[0])
}

const changePlayButtonLabel = () => {
    if (isPlaying) {
        playButton.textContent = '️■ STOP'
    } else {
        playButton.textContent = '️▶ PLAY'
    }
}

const changeMuteButtonLabel = state => {
    playButton.textContent = state ? '️🔇 MUTE' : '️🔊 UNMUTE'
}

const addOscilloscope = parentElement => {
    let canvas = document.createElement('canvas')
    canvas.id = 'oscilloscope'
    parentElement.appendChild(canvas)
    console.log('〰 oscilloscope added')
}

const addGui = () => {
    gui = new dat.GUI({ name: 'audio properties' })
    gui.width = 420
    const f1 = gui.addFolder('start time')
    f1.add(audioProperties, 'startTimeDay', 1, 31, 1)
    f1.add(audioProperties, 'startTimeMonth', 0, 11, 1)
    f1.add(audioProperties, 'startTimeYear', 2018, 2028, 1)
    // f1.open()

    const f2 = gui.addFolder('days in the future')
    f2.add(audioProperties, 'DaysInTheFuture', 0, 100, 1)
    f2.open()

    const f3 = gui.addFolder('change over time')
    f3.add(audioProperties, 'DailyPlayBackRateChange', 0.001, 0.2, 0.0001)
    f3.open()
}

const draw = () => {
    requestAnimationFrame(draw)

    sound.analyser.getByteTimeDomainData(sound.dataArray)
    let canvas = document.getElementById('oscilloscope')
    let canvas2dContext = canvas.getContext('2d')
    let bufferLength = sound.analyser.frequencyBinCount

    canvas2dContext.fillStyle = 'rgb(255, 255, 255)'
    canvas2dContext.fillRect(0, 0, canvas.width, canvas.height)

    canvas2dContext.lineWidth = 2
    canvas2dContext.strokeStyle = 'rgb(234, 234, 234)'

    canvas2dContext.beginPath()

    let sliceWidth = (canvas.width * 1.0) / bufferLength
    let x = 0

    for (let i = 0; i < bufferLength; i++) {
        let v = sound.dataArray[i] / 128.0
        let y = (v * canvas.height) / 2

        if (i === 0) {
            canvas2dContext.moveTo(x, y)
        } else {
            canvas2dContext.lineTo(x, y)
        }

        x += sliceWidth
    }

    canvas2dContext.lineTo(canvas.width, canvas.height / 2)
    canvas2dContext.stroke()
}
