import {all, takeLatest} from 'redux-saga/effects';

import * as AccountSagas from './accountSagas';

import {actions} from '../actions/index';

export default function* sagas() {
  yield all([
    takeLatest(actions.account.CHANGE_LANG, AccountSagas.changeLanguage),
  ]);
}
