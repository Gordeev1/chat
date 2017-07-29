import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'message-item',
	templateUrl: 'message-item.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageItemComponent {

	@Input() message;
	@Input() userId: string;

	get byUser() {
		return this.message && this.message.author && this.message.author._id === this.userId;
	}

}
