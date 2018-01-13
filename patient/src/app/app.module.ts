import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { HttpClientModule } from '@angular/common/http';


// loading components and  services
import { AppComponent } from './app.component';
import { NavigationbarComponent } from './components/navigationbar/navigationbar.component';
import { HomeComponent } from './components/home/home.component';
import { ControlpanelComponent } from './components/controlpanel/controlpanel.component';
import { SignupComponent } from './components/signup/signup.component';
import { RegauthService } from './services/regauth.service';
import { ChatbotService } from './services/chatbot.service';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChatComponent } from './components/chat/chat.component';
import { ForumComponent } from './components/forum/forum.component';
import { ChatDialogComponent } from './components/chat-dialog/chat-dialog.component';
import { PredictComponent } from './components/predict/predict.component';
import { ChatService } from './services/chat.service';
import { AboutComponent } from './components/about/about.component';

// const config: SocketIoConfig = { url: 'http://localhost:9000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    NavigationbarComponent,
    HomeComponent,
    ControlpanelComponent,
    SignupComponent,
    LoginComponent,
    ProfileComponent,
    ChatComponent,
    ForumComponent,
    ChatDialogComponent,
    PredictComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // SocketIoModule.forRoot(config)
  ],
  providers: [RegauthService, ChatbotService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
