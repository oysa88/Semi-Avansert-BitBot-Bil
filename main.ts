function Fjernkontroll () {
    if (input.buttonIsPressed(Button.AB)) {
        if (PåAv) {
            PåAv = 0
            basic.showIcon(IconNames.No)
        } else {
            PåAv = 1
            basic.showIcon(IconNames.Yes)
        }
    }
    if (PåAv == 1) {
        Hastighet = input.rotation(Rotation.Pitch)
        if (input.buttonIsPressed(Button.A)) {
            Knapp_A = 1
            basic.showLeds(`
                . . # . .
                . # . . .
                # # # # #
                . # . . .
                . . # . .
                `,0)
        } else {
            Knapp_A = 0
        }
        if (input.buttonIsPressed(Button.B)) {
            Knapp_B = 1
            basic.showLeds(`
                . . # . .
                . . . # .
                # # # # #
                . . . # .
                . . # . .
                `,0)
        } else {
            Knapp_B = 0
        }
        if (Knapp_A == 0 && Knapp_B == 0 && Hastighet < 0) {
            basic.showLeds(`
                . . # . .
                . # # # .
                # . # . #
                . . # . .
                . . # . .
                `,0)
        } else if (Knapp_A == 0 && Knapp_B == 0 && Hastighet > 0) {
            basic.showLeds(`
                . . # . .
                . . # . .
                # . # . #
                . # # # .
                . . # . .
                `,0)
        }
    }
}
function Sende_Info () {
    radio.sendValue("H", Hastighet)
    radio.sendValue("A", Knapp_A)
    radio.sendValue("B", Knapp_B)
    radio.sendValue("P", PåAv)
}
function BitBot_Bilen () {
    if (PåAv_Bil) {
        if (Venstre) {
            bitbot.motor(BBMotor.Right, Kjør)
            bitbot.motor(BBMotor.Left, Kjør * -1)
        } else if (Høyre) {
            bitbot.motor(BBMotor.Left, Kjør)
            bitbot.motor(BBMotor.Right, Kjør * -1)
        } else {
            bitbot.motor(BBMotor.Both, Kjør)
        }
    } else {
        bitbot.motor(BBMotor.Both, Stopp)
    }
}
radio.onReceivedValue(function (name, value) {
    if (name == "P") {
        PåAv_Bil = value
    } else if (name == "A") {
        Venstre = value
    } else if (name == "B") {
        Høyre = value
    } else if (name == "H") {
        Kjør = value * -22.5
    }
})
let Kjør = 0
let Høyre = 0
let Venstre = 0
let PåAv_Bil = 0
let Knapp_B = 0
let Knapp_A = 0
let Hastighet = 0
let PåAv = 0
let Stopp = 0
let Radiogruppe = 42
Stopp = 0
radio.setGroup(Radiogruppe)
bitbot.ledRainbow()
basic.showIcon(IconNames.Heart)
basic.forever(function () {
    Fjernkontroll()
    Sende_Info()
    BitBot_Bilen()
})
