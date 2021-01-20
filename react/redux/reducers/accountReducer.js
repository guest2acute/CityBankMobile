import { actions } from "./../actions/index";
import en from "../../localization/en";
import bn from "../../localization/bangla";
import bangla from "../../localization/bangla";


const initialState = {
  langId:'en',
  language: en,
};

export function accountReducer(state = initialState, action) {
  switch (action.type) {
    case actions.account.CHANGE_LANG:
      return Object.assign(
        {},
        {
          ...state,
          langId:action.payload.langId,
          language: action.payload.langId === 'en' ? en : bangla,
        },
      );
    default:
      return state;
  }
}
