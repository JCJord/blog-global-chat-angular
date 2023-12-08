import { AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { User } from 'src/app/core/entities/user.type';
import { RxStompService } from 'src/app/services/rx-stomp.service';
import { UserService } from 'src/app/services/user.service';
import { Message, MessageService, OnlineUser } from 'src/app/shared/services/message.service';
import { SubSink } from 'subsink';
type UserStatus = {
  username: string,
  userChatStatus: string,
}
@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit, OnDestroy, AfterViewChecked {
  messages!: Array<Message>;
  enteredUsers: Array<OnlineUser> = [];
  user!: User;

  private subs = new SubSink();

  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  chatForm = new FormGroup({
    message: new UntypedFormControl({value: undefined, disabled: false}, [Validators.required]),
  });
  
  constructor(private rxStompService: RxStompService, private userService: UserService, private messageService: MessageService) {}

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    this.notifyUserLeave();
  }

  @HostListener('window:unload', ['$event'])
  unload($event: any): void {
    this.notifyUserLeave();
  }

  ngOnInit() {
    this.subs.sink = this.userService.getSignedUser()
    .subscribe((user: User)=>{
      this.user = user;
    });

    this.notifyUserEntry();
    this.loadMessages();
    this.loadOnlineUsers();
    this.onMessageReceived();
    this.onUserEntry();
    this.onUserLeave();
  }
  
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngOnDestroy() {
    this.notifyUserLeave();
  }

  onSendMessage() {
    this.subs.sink = this.userService.getSignedUser()
    .subscribe((user) => {
      if(this.chatForm.valid) {
        let messageDTO = {
          user: {
            id: user.id,
            username: user.username,
          },
          message: this.chatForm.get('message')?.value
        };
        const jsonMessage = JSON.stringify(messageDTO);
        console.log(jsonMessage)
        this.rxStompService.publish({ destination: '/app/chat/send', body: jsonMessage });
      }
    });
  }

  onMessageReceived() {
    this.subs.sink = this.rxStompService.watch('/topic/global-chat').subscribe((message) => {
      const body = JSON.parse(message.body);
      this.messages.push(body)
       setTimeout(() => {
        this.scrollToBottom();
      });
    });
  }

  notifyUserEntry() {
    this.subs.sink = this.userService.getSignedUser()
    .subscribe((user) => {
      console.log('trying to notify the user entry ....')
      console.log(user)
      const userStatusMessage = {
        user: {
          id: user.id,
          username: user.username, 
        }
      };

      this.rxStompService.publish({ destination: '/app/chat/save-user', body: JSON.stringify(userStatusMessage) });
    });
  }

  onUserEntry() {
    console.log('trying receive user status notification....')

    this.subs.sink = this.rxStompService.watch('/topic/chat-status').subscribe((response) => {
      const body = JSON.parse(response.body);
      this.enteredUsers.push(body);
    });
  }

  onUserLeave() {
    console.log('trying receive user status notification....')

    this.subs.sink = this.rxStompService.watch('/topic/chat-leave').subscribe((response) => {
      const body = JSON.parse(response.body);
      this.enteredUsers = this.enteredUsers.filter(onlineUsers => onlineUsers.id != body.id)
    });
  }

  notifyUserLeave() {
    this.subs.sink = this.userService.getSignedUser()
    .subscribe((leavingUser) => {
      const leaveUser = this.enteredUsers.find(onlineUser => onlineUser.user.id === leavingUser.id)

      const offlineUser = {
        id: leaveUser?.id
      };
  
      this.rxStompService.publish({ destination: '/app/chat/remove-user', body: JSON.stringify(offlineUser) });
    });
  }

  loadMessages() {
    this.subs.sink = this.messageService.getMessages().subscribe((messages)=>{
      this.messages = messages;
    })
  }

  loadOnlineUsers() {
    this.subs.sink = this.messageService.getOnlineUsers().subscribe((onlineUsers)=>{
      this.enteredUsers = onlineUsers;
    });
  }

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
  }

  isUserMessageOwner(id: number) {
    return id === this.user.id;
  }

  imageRenderer(image: string | null) {
    if(image) {
      return atob(image);
    }else {
      return '../../../assets/images/profile-pic-empty.webp';
    }
  }
}
