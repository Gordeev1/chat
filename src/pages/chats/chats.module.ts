import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatsPage } from './chats';
import { ChatItemComponentModule } from '../../components/chat-item/chat-item.module';

@NgModule({
    declarations: [ChatsPage],
    imports: [
        ChatItemComponentModule,
        IonicPageModule.forChild(ChatsPage)
    ],
})
export class ChatsModule { }