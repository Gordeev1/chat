import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Chat } from '../../models/Chat';

@Component({
	selector: 'chat-item',
	templateUrl: 'chat-item.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatItemComponent {

	@Input() chat: Chat;
	@Output() open = new EventEmitter();

}
