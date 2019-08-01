/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import mainscreens from './screens/mainscreens'


AppRegistry.registerComponent(appName, () => mainscreens);
