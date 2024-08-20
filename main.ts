function triggerAlert () {
    if (!(alertTriggered)) {
        alertTriggered = true
        music.play(music.tonePlayable(988, music.beat(BeatFraction.Double)), music.PlaybackMode.UntilDone)
        serial.writeString("triggerAlert")
        basic.showIcon(IconNames.No)
        radio.sendNumber(1)
        basic.pause(5000)
    }
}
let combinedAngle3 = 0
let roll3 = 0
let pitch3 = 0
let startTime = 0
let combinedAngle2 = 0
let roll = 0
let pitch = 0
let alertTriggered = false
radio.setGroup(1)
serial.writeLine("AlertTriggered")
basic.forever(function () {
    pitch = input.rotation(Rotation.Pitch)
    roll = input.rotation(Rotation.Roll)
    combinedAngle2 = Math.abs(90 - pitch)
    serial.writeValue("strat", combinedAngle2)
    if (combinedAngle2 > 30) {
        basic.showIcon(IconNames.Sad)
        startTime = input.runningTime()
        while (input.runningTime() - startTime < 10000) {
            pitch3 = input.rotation(Rotation.Pitch)
            roll3 = input.rotation(Rotation.Roll)
            combinedAngle3 = Math.abs(90 - combinedAngle2)
            if (combinedAngle2 < 30) {
                basic.showIcon(IconNames.Happy)
            }
            basic.pause(1000)
        }
    }
    pitch = input.rotation(Rotation.Pitch)
    combinedAngle2 = Math.abs(90 - pitch)
    if (combinedAngle2 > 30) {
        basic.showIcon(IconNames.Sad)
        triggerAlert()
    } else if (combinedAngle2 < 30) {
        basic.showIcon(IconNames.Happy)
        serial.writeString("safty")
    }
})
namespace screenmagic {
    /** 
     * Address LEDS linearly row first
     * /
     //% blockid=screenmagicplotat
     //% block="plot at index"
     //% index.min=0 index.maz
    export function plotAt(index: number): void {
    index = 0
    const y = Math.floor(index / 5);
    const x = Math.floor(index % 5);
    led.plot(x,y)
    }
}