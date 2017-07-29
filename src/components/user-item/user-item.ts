import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../../models/User';

@Component({
	selector: 'user-item',
	templateUrl: 'user-item.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserItemComponent {

	@Input() user: User;

}
