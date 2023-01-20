
export class User {

  constructor(
      public name: string,
      public email: string,
      public password: string,
      public isAdmin?: boolean,
      public id?: number,
      public gender?:boolean

  ) {}
}