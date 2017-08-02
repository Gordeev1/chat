import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'input-message-toolbar',
	templateUrl: 'input-message-toolbar.html'
})
export class InputMessageToolbarComponent {

	text: string;
	@Input() loading: boolean;
	@Output() submit = new EventEmitter();
	@Output() focus = new EventEmitter();

	submitMessage = () => {
		this.submit.emit({ text: this.text })
		this.text = '';
	}
}
