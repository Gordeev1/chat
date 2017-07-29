import { Directive, ElementRef, HostListener, Renderer, Input } from '@angular/core';

const DEFAULT_HEIGHT: number = 16;

@Directive({
    selector: 'textarea[elastic]'
})
export class ElasticInput {

    @Input() bounded: boolean = false;

    constructor(
        private el: ElementRef,
        private renderer: Renderer
    ) { }

    @HostListener('keyup') change() {
        const element = this.el.nativeElement;
        const condition = this.bounded ? element.scrollHeight < DEFAULT_HEIGHT * 5 : true;

        if (condition) {
            this.renderer.setElementStyle(element, 'height', element.scrollHeight + 'px');
        }
    }
}