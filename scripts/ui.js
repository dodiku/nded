const addPlayButton = func => {
    playButton = document.createElement('button')
    playButton.textContent = '▶ PLAY'
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
        playButton.textContent = '️■ STOP'
    } else {
        playButton.textContent = '️▶ PLAY'
    }
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
