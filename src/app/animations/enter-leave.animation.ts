import {animate, keyframes, style, transition, trigger} from "@angular/animations";

export const pulsate = trigger("pulsate", [
    transition(':enter', [
        style({transform: "scale(0)", opacity: 0}),
        animate("100ms ease-in", style({transform: "scale(1.2)", opacity: 1})),
        animate("100ms ease-in", style({transform: "scale(1)"})),
        animate("100ms ease-in", style({transform: "scale(1.2)"})),
        animate("100ms ease-in", style({transform: "scale(0.9)"})),
        animate("100ms ease-in", style({transform: "scale(1)"}))
    ]),
    transition(':leave', [
        animate(200, style({transform: "scale(0)", opacity: 0}))
    ])
]);

export const wiggle = trigger('wiggle', [
    transition(':enter', animate('800ms ease-in', keyframes([
        style({transform: 'rotateZ(-5deg)', offset: 0}),
        style({transform: 'rotateZ(5deg)', offset: 0.1}),
        style({transform: 'rotateZ(15deg)', offset: 0.2}),
        style({transform: 'rotateZ(-15deg)', offset: 0.3}),
        style({transform: 'rotateZ(15deg)', offset: 0.4}),
        style({transform: 'rotateZ(-15deg)', offset: 0.5}),
        style({transform: 'rotateZ(15deg)', offset: 0.6}),
        style({transform: 'rotateZ(5deg)', offset: 0.7}),
        style({transform: 'rotateZ(-5deg)', offset: 0.8})
    ]))),
    transition(':leave', [
        animate(100, style({opacity: 0}))
    ])
]);

export const fade = trigger("fade", [
    transition(':enter', [
        style({opacity: 0}),
        animate(200, style({opacity: 1})),
    ]),
    transition(':leave', [
        animate(100, style({opacity: 0}))
    ])
]);

export const fadeIn = trigger("fadeIn", [
    transition(':enter', [
        style({opacity: 0}),
        animate(200, style({opacity: 1})),
    ])
]);

export const fadeOut = trigger("fadeOut", [
    transition(':leave', [
        style({opacity: 1}),
        animate(100, style({opacity: 0}))
    ])
]);
