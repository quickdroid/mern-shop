import * as types        from '../constants/actionTypes';
import * as actions from './authenticationActions';

describe('authentication actions', () => {

  test('userRegistrationFailure should return action with errors as payload', () => {
    const errors = { msg: 'This email already exists'};
    const expectedAction = {
      type: types.REGISTRATION_FAILURE,
      isRequested: false,
      isRegistered: false,
      errors
    };

    expect(actions.userRegistrationFailure(errors)).toEqual(expectedAction);
  });
});
