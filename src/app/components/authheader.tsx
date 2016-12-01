/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { AuthActionTypes, ProviderTypes, EditorActionTypes } from '../actions/types';
import * as AuthActions from '../actions/authActions';
import Emitter from '../events/appEvent';
import GAuthStore from '../stores/gAuthStore';
import browserHistory from '../browserHistory';
import CalendarWrapper from '../components/calendarwrapper';
import { Server } from '../api/baseDAO';

export default class AuthHeader extends React.Component<{}, any> {
  _listenerToken: FBEmitter.EventSubscription;
  toggledClass: string = 'hide-header-menu';
  _inputNode;
  constructor() {
    super();
    GAuthStore.cleanState();
    this.state = GAuthStore.getState();
  }

  /**
   * @description
   *
   * Adds listener, updates profile info and creates initial folder structure in google drive
   * 
   * @returns 
   */
  componentDidMount() {
    this._listenerToken = GAuthStore.addChangeListener(AuthActionTypes.AUTH_GET_PROFILE, this._setStateFromStores.bind(this));
    //AuthActions.updateProfileInfo({ provider: ProviderTypes.GOOGLE });
    AuthActions.createInitialFolderStructure({ provider: ProviderTypes.GOOGLE});

    this._inputNode = ReactDOM.findDOMNode(this.refs["fileChooser"]);
    this._inputNode.addEventListener("click", this.clickHiddenFile);
  }

  /**
   * @description
   *
   * Removes listener while unmounting
   * 
   * @returns 
   */
  componentWillUnmount() {
    GAuthStore.removeChangeListener(this._listenerToken);
  }

  /**
   * @description
   *
   * Sets state based on GAuthStore
   * 
   * @returns 
   */
  _setStateFromStores() {
    this.setState(GAuthStore.getState());
  }

  /**
   * @description
   *
   * Emits the editor related actions
   * 
   * @param type: refers to the type of editor action
   * @returns 
   */

  toggleClass(){
    this.toggledClass =  this.toggledClass.indexOf('hide-header-menu') !== -1 ? 'show-header-menu' : 'hide-header-menu' ;
    this.setState({'name':'button-state-changed'});
  }

  /**
   * @description
   *
   * Emits the editor related actions
   * 
   * @param type: refers to the type of editor action
   * @returns 
   */
  editorAction(type: any) {
    Emitter.emit('editor.actions', type);
  }

  logout() {
    GAuthStore._sign_out();
    browserHistory.replace('/');
    browserHistory.push('/');  
  }

  clickHiddenFile() {
    if(this._inputNode && this._inputNode.click){
      this._inputNode.click();
    }
  }

  handleFileInput(e) {
    var file = e.target.files[0];

    var reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = function(e) {
      var base64Data = btoa(reader.result);

      Server.call('uploadToImgur', null, {
        image : reader.result,
        type : 'file',
        title: file.name,
        description: 'memoirable image'
      }).done(function(response){
        console.log("meow, meow, meow")
        console.log(response);
      }).fail(function(reason){
        console.log(reason);
      });  

    }
  }

  render() {
    return (
      <div className="auth-header row">
          <CalendarWrapper></CalendarWrapper>
          <button className="strip-button pull-left">
            <span className="memocon-format_bold" onClick={() => this.editorAction(EditorActionTypes.BOLD)} />
          </button>
          <button className="strip-button pull-left">
            <span className="memocon-format_italic" onClick={() => this.editorAction(EditorActionTypes.ITALICS)} />
          </button>
          <div>
      <a class="post" href="https://api.imgur.com/oauth2/authorize?response_type=token&client_id=2288bd68956bfa9&callback">
        Post image to imgur
      </a>
    </div>
          <button className="strip-button pull-left">
            <span className="memocon-attach" onClick={this.clickHiddenFile.bind(this)} />
            <input type="file" hidden onChange={(e) => this.handleFileInput(e)}  ref="fileChooser" accept="image/*"/>
          </button>
          <div className="dropdown pull-right">
            <button className="strip-button text-content" type="button" onClick={this.toggleClass.bind(this)}>
              {this.state.displayName}
            </button>
            <div className={this.toggledClass}>
              <button className="strip-button dropdown-button" onClick={this.logout}>Sign Out</button>
            </div>
          </div>
      </div>
    );
  }
}
