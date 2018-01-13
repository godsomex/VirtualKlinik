import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { ControlpanelComponent } from './components/controlpanel/controlpanel.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChatComponent } from './components/chat/chat.component';
import { ForumComponent } from './components/forum/forum.component';
import { ChatDialogComponent } from './components/chat-dialog/chat-dialog.component';
import { PredictComponent } from './components/predict/predict.component';
import { AboutComponent } from './components/about/about.component';



const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'controlpanel', component: ControlpanelComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'chat', component: ChatComponent },
    { path: 'forum', component: ForumComponent },
    { path: 'chatbot', component: ChatDialogComponent },
    { path: 'predict', component: PredictComponent },
    { path: 'about', component: AboutComponent },
    { path: '**', component: HomeComponent}
];



@NgModule({
    declarations: [],
    imports: [ RouterModule.forRoot(appRoutes)],
    providers: [],
    bootstrap: [],
    exports: [RouterModule]
})
export class AppRoutingModule { }
