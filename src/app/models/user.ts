
export class User {

  constructor(
      public name: string,
      public email: string,
      public password: string,
      public homeCourse: string,
      public isAdmin?: boolean,
      public id?: number,
      public gender?:boolean,
      public country?:string,
      public birthdate?: string,
      public countryCode? : string,
      public nickname? : string

  ) {}
}