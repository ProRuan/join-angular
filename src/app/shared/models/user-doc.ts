import { DocumentData } from 'firebase/firestore';
import { User } from './user';

export class UserDoc {
  [key: string]: any;
  data: User;
  id: string;
  sid: string;

  // replace any type!!!
  constructor(doc: DocumentData) {
    this.data = new User(doc['data']);
    this.id = doc['id'];
    this.sid = doc['sid'];
  }

  // LoginComponent
  // --------------

  // block 1
  // -------
  // rename variables and functions!!!
  // set user + user.sid + updateUserData!!!
  // userExistend --> user due to user.sid!!!
  // fix email input error!
  // improve subscribeUser() and addSessionId()!!!
  // work with rxjs?!?

  // block 2
  // -------
  // rename functions (see: sign-up)!
  // check email hint!
  // check password hint!
  // verify hint!!!

  // remember me is not required!!!
  // provided remember me functions!!!

  // no subscribeUser() for sign-up comp!?!
  // fix email error!!!

  // adapt text input!
  // adapt password input!

  // SignUpComponent
  // ---------------
  // replace getUser() with getUserDocs()!!!
}
