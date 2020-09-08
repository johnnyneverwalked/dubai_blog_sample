
import {animate, state, style, transition, trigger} from "@angular/animations";

export const emerge = trigger("emerge", [
    transition('void => *', [
        style({ top: '55%', opacity: 0 }),
        animate(250)
    ]),
    transition('* => void', [
        animate(100, style({ top: '55%' }))
    ])
]);

export const slideRight = trigger("slideRight", [
    state("visible", style({transform: "translateX(0%)"})),
    state("invisible", style({transform: "translateX(150%)"})),
    transition("visible => invisible", [
        animate("100ms ease-in-out", style({transform: "translateX(-5%)"})),
        animate("300ms ease-in-out", style({transform: "translateX(150%)"}))
    ]),
    transition("invisible => visible", [
        animate("300ms ease-out", style({transform: "translateX(0%)"})),
    ])
]);
