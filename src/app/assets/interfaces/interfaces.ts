///import { ArrayType } from "@angular/compiler";


export interface Course {
    active: boolean;
    address: string;
    city: string;
    country:string;
    description: String;
    name: string;
    url: string;
    _id: string;
    tees?:any;
    coursenames:any;
    teecolors:any;
    front9yd: number,
    back9yd: number,
    totalyd: number
  
  }

export interface Score {
   date: Date;
   course:string;
   tee: string;
   gtotal:number;
   ntotal:number;
   hdcp:number;
   slope:number;
   
}