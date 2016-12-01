/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { AuthActionTypes, ProviderTypes } from '../actions/types';
import * as AuthActions from '../actions/authActions';
import MarkDown from '../components/markdown';
import AuthHeader from '../components/authheader';
import GAuthStore from '../stores/gAuthStore';

import { IAuth } from '../interfaces/auth';

export class Dashboard extends React.Component<{}, IAuth> {
  _listenerToken: FBEmitter.EventSubscription;
  constructor() {
    super();
    GAuthStore.cleanState();
    this.state = GAuthStore.getState();    
  }

  /**
   * @description
   *
   * Handles functionality when componentDidMount
   * 
   * @returns 
   */
  componentDidMount() {
    this._listenerToken = GAuthStore.addChangeListener(AuthActionTypes.AUTH_GET_PROFILE, this._setStateFromStores.bind(this));
    AuthActions.updateProfileInfo({ provider: ProviderTypes.GOOGLE });
  }

  /**
   * @description
   *
   * Handles functionality when componentWillUnmount 
   * 
   * @returns 
   */
  componentWillUnmount() {
    GAuthStore.removeChangeListener(this._listenerToken);
  }

  /**
   * @description
   *
   * Sets state based on GAuthStore state
   * 
   * @returns 
   */
  _setStateFromStores() {
    this.setState(GAuthStore.getState());
  }

  render() {
    return (
      <div>
        <div className="row">
          <AuthHeader></AuthHeader>
        </div>
          <MarkDown></MarkDown>
      </div>
    );
  }
}