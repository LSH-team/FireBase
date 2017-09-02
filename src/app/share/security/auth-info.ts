/**
 * Created by ShaohuaLi on 17/9/1.
 */

export class AuthInfo {
  constructor (
    public $uid: string
  ) {

  }

  isLoggedIn () {
    return !!this.$uid
  }
}
