import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthorizationComponent} from "./authorization/authorization.component";
import {RegistrationComponent} from "./registration/registration.component";
import {ChatsComponent} from "./chats/chats.component";
import {AuthGuard} from "./shared/classes/auth.guard";
import {ChatComponent} from "./chat/chat.component";

const routes: Routes = [
  {path: 'authorization', component: AuthorizationComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: '', component: ChatsComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard]},
  {path: 'chats/:memberId', component: ChatComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
