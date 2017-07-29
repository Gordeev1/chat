import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatPage } from './chat';
import { MessageItemComponentModule } from '../../components/message-item/message-item.module';
import { InputMessageToolbarComponentModule } from '../../components/input-message-toolbar/input-message-toolbar.module';

@NgModule({
    declarations: [ChatPage],
    imports: [
        MessageItemComponentModule,
        InputMessageToolbarComponentModule,
        IonicPageModule.forChild(ChatPage)
    ],
})
export class ChatModule { }