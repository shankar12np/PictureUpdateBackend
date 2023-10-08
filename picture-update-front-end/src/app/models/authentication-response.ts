export class AuthenticationResponse {
  jwt: string;
  message: string;

  constructor(jwt: string, message: string) {
    this.jwt = jwt;
    this.message = message;
  }


}
