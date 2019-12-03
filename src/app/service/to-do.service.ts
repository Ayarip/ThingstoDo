import { Injectable, Pipe } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { contentThing } from '../Interface/thing.interface';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  private UrlGlobal = 'http://10.2.47.12:5000';
  constructor(private http:HttpClient) { }
  public postthing(thing){

    let url = `${this.UrlGlobal}/v1/things`
    return this.http.post(url, thing);
  }

  public getthings():Observable<Object>{
    let url = `${this.UrlGlobal}/v1/things`
    return this.http.get(url);
}

public putthing(thing:contentThing){
let url = `${this.UrlGlobal}/v1/things/${thing._id}`
return this.http.put(url,thing)
}

public deltething(thingId){
  let url = `${this.UrlGlobal}/v1/things/${thingId}`
  return this.http.delete(url);
}


}
