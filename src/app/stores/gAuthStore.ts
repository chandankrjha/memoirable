/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../../lib/dtds/index.d.ts" />

import AppDispatcher from '../dispatchers/appDispatcher';

import { AuthActionTypes, ProviderTypes } from '../actions/types';
import { BaseStore } from './baseStore';
import { Server } from '../api/baseDAO';
import { AppEvent } from '../events/appEvent';
import { IAuth } from '../interfaces/auth';

// https://developers.google.com/drive/v3/web/appdata
// https://console.developers.google.com/apis/credentials?project=memoirable
// https://security.google.com/settings/security/permissions
class GoogleAuthStore extends BaseStore<IAuth>{
  _clientId = '185002064279-5b927uofmib8o4q7cch7ae9n0stu9369.apps.googleusercontent.com';
  _scopes = ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/plus.me'];
  callback: () => void;
  _authorize(immediate: boolean, event: AppEvent) {

    gapi.auth.authorize(
      {
        'client_id': this._clientId,
        'scope':this._scopes.join(' '),
        'immediate': true,
        'response_type': 'token'
      }, function (authResult) {
        if (!authResult || authResult.error) {
          this._authorize.bind(this, false, event)();
          return;
        }
        console.log(authResult);
        this._changeToken = event.type;
        this.emitChange();
      }.bind(this));
  }
  _getProfileInfo(event: AppEvent) {
    gapi.client.load('plus', 'v1', function () {
      var request = gapi.client.plus.people.get({
        'userId': 'me'
      });
      request.execute(function (resp) {
        this._state = {
          displayName: resp.result.displayName
        };       
        this._changeToken = event.type;
        this.emitChange();
      }.bind(this))
    }.bind(this));
  }

  _saveToGoogleDrive(data:string){
    console.log(data);
    gapi.client.load('drive', 'v3', function(){
      var createRequest = gapi.client.drive.files.create({'uploadType':'media'});
      createRequest.then(function(res){
        console.log(res);
        gapi.client.request({'path': ('/upload/drive/v3/files/'+res.result.id).toString(), 'method':'PATCH', 'body':data, 'headers':'',  'params': ''}).then(function(response) {
          console.log(response);
        }, function(reason) {
          console.log(reason);
        });

      },function(err){
        console.log(err);
      });

   });
  }

  constructor(dispatcher: Flux.Dispatcher<AppEvent>) {
    super(dispatcher, (event: AppEvent) => {
      if (event.payLoad.provider !== ProviderTypes.GOOGLE) {
        return;
      }
      switch (event.type) {
        case AuthActionTypes.AUTH_INITIALIZE:
          this._authorize.bind(this, true, event)();
          break;
        case AuthActionTypes.AUTH_GET_PROFILE:
          this._getProfileInfo.bind(this, event)();
          break;
        default:
          break;
      }

    }, () => {
      return {
        displayName: ''
      };
    });
  }
}

const GoogleAuthStoreInstance = new GoogleAuthStore(AppDispatcher);

export default GoogleAuthStoreInstance;