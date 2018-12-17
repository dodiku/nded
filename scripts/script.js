let audioProperties = {
    dayMs: 86400000,

    currentPlayBackRate: 1,
    currentGain: 1,

    startTimeDay: 16,
    startTimeMonth: 11,
    startTimeYear: 2018,

    DailyPlayBackRateChange: 0.05,
    minimumSpeed: 0.0625,

    DaysInTheFuture: 0
}

let sound = {}
let isPlaying = false
let context

window.onload = () => {
    initAudio()

    // debug gui
    addGui()
}

const initAudio = async () => {
    return new Promise(resolve => createAudioContent(resolve))
        .then(() => {
            return createAudioBuffer('assets/audio/niggasgetshoteverydayb.wav')
        })
        .then(() => {
            addPlayButton(playAudio)
            console.log('✅ all done')
        })
        .catch(error => {
            console.log('🐞 something went wrong... =>', error)
        })
}
