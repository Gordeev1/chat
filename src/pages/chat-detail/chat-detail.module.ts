import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatDetailPage } from './chat-detail';
import { ChatItemComponentModule } from '../../components/chat-item/chat-item.module';
import { UserItemComponentModule } from '../../components/user-item/user-item.module';

@NgModule({
    declarations: [ChatDetailPage],
    imports: [
        ChatItemComponentModule,
        UserItemComponentModule,
        IonicPageModule.forChild(ChatDetailPage)
    ],
})
export class ChatDetailModule { }