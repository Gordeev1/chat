import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { UserItemComponent } from './user-item';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
    declarations: [
        UserItemComponent
    ],
    imports: [
        PipesModule,
        IonicModule
    ],
    exports: [
        UserItemComponent
    ]
})
export class UserItemComponentModule { }
