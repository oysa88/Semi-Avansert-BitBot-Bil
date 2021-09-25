input.onGesture(Gesture.Shake, function () {
    if (PåAv == 0) {
        PåAv = 1
    } else {
        PåAv = 0
    }
})
radio.onReceivedValue(function (name, value) {
    if (name == "P") {
        PåAvBil = value
    } else if (name == "A") {
        Venstre = value
    } else if (name == "B") {
        Høyre = value
    } else if (name == "H") {
        Kjør = value * -22.5
    }
})
let Knapp_B = 0
let Knapp_A = 0
let Hastighet = 0
let Kjør = 0
let Høyre = 0
let Venstre = 0
let PåAvBil = 0
let PåAv = 0
radio.setGroup(1)
bitbot.ledRainbow()
basic.forever(function () {
    Hastighet = input.rotation(Rotation.Pitch)
    if (input.buttonIsPressed(Button.A)) {
        Knapp_A = 1
    } else {
        Knapp_A = 0
    }
    if (input.buttonIsPressed(Button.B)) {
        Knapp_B = 1
    } else {
        Knapp_B = 0
    }
    radio.sendValue("H", Hastighet)
    radio.sendValue("A", Knapp_A)
    radio.sendValue("B", Knapp_B)
    radio.sendValue("P", PåAv)
    if (PåAvBil == 1) {
        if (Venstre == 1) {
            bitbot.motor(BBMotor.Right, Kjør)
            bitbot.motor(BBMotor.Left, Kjør * -1)
        } else if (Høyre == 1) {
            bitbot.motor(BBMotor.Left, Kjør)
            bitbot.motor(BBMotor.Right, Kjør * -1)
        } else {
            bitbot.motor(BBMotor.Both, Kjør)
        }
    } else {
        bitbot.motor(BBMotor.Both, 0)
    }
})
