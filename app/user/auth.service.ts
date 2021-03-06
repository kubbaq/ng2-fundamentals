import { IUser } from './user.model'
import { Injectable } from '@angular/core'
import { Headers, Http, RequestOptions, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class AuthService {
  constructor(private http: Http) { }
  currentUser: IUser
  lognUser(userName: string, password: string) {
    let headers = new Headers({
      'Content-Type': 'application/json',
    })

    let options = new RequestOptions({ headers: headers })
    let loginInfo = {
      username: userName,
      password: password
    }

    return this.http.post('/api/login', JSON.stringify(loginInfo), options)
      .do(resp => {
        this.currentUser = <IUser>resp.json().user
      }).catch(error => {
        return Observable.of(false)
      })
  }

  isAuthenticated() {
    return !!this.currentUser
  }

  checkAuthenticationStatus() {
    return this.http.get('api/currentIdentity').map((response: any) => {
      if (response._body) {
        return response.json()
      } else {
        return {}
      }
    }).do(currentUser => {
      if (!!currentUser.userName) {
        this.currentUser = currentUser
      }
    }).subscribe()
  }

  updateCurrentUser(firstName: string, lastName: string) {
    this.currentUser.firstName = firstName
    this.currentUser.lastName = lastName

    let headers = new Headers({
      'Content-Type': 'application/json',
    })

    let options = new RequestOptions({ headers: headers })

    return this.http.put(`/api/users/${this.currentUser.id}`,
      JSON.stringify(this.currentUser),
      options)
  }

  logout() {
    this.currentUser = undefined

    let headers = new Headers({
      'Content-Type': 'application/json',
    })

    let options = new RequestOptions({ headers: headers })

    return this.http.post('/api/logout', JSON.stringify({}), options)
  }
}