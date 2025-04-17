import { trigger, transition, style, animate } from '@angular/animations';

const delay = 300;

export const fadeSlideInOut = {
    animations: [
        trigger('fadeSlideInOut', [
            // Transition for entering (optional, can add if needed)
            transition(':enter', [
                style({ opacity: 0, transform: 'translateX(100%)' }),
                animate(`${delay}ms ease-out`, style({ opacity: 1, transform: 'translateX(0)' }))
            ]),
            // Transition for leaving (hiding)
            transition(':leave', [
                animate(`${delay}ms ease-in`, style({ opacity: 0, transform: 'translateX(100%)' }))
            ])
        ])
    ]
}