let audioProperties = {
    dayMs: 86400000,

    currentPlayBackRate: 1,
    currentGain: 1,

    startTimeDay: 1,
    startTimeMonth: 0,
    startTimeYear: 2019,

    DailyPlayBackRateChange: 0.04,
    minimumSpeed: 0.0625,

    DaysInTheFuture: 0
}

let sound = {}
let isPlaying = false
let context

window.onload = () => {
    initAudio()

    // debug gui
    // addGui()
}

const initAudio = async () => {
    return new Promise(resolve => createAudioContent(resolve))
        .then(() => {
            return createAudioBuffer('assets/audio/niggasgetshoteverydayb.wav')
        })
        .then(() => {
            // addPlayButton(playAudio, 'PLAY')
            addPlayButton(muteAudio, 'UNMUTE')
            muteAudio()
            playAudio(false)
            console.log('✅ all done')
        })
        .then(() => {
            draw()
        })
        .catch(error => {
            console.log('🐞 something went wrong... =>', error)
        })
}
