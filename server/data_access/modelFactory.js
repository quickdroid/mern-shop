import { UserSchema }     from './schemas';
import { serverSettings } from '../settings';
import connectionProvider from './connectionProvider';

export const getUserModel = async () => {
  try {
    const conn = await connectionProvider(serverSettings.serverUrl, serverSettings.database);
    return conn.model('User', UserSchema);
  } catch ( err ) {
    throw err;
  }
};
