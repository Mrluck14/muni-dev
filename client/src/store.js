import { createStore } from 'redux';
import rootReducer from './reducers'; // Asegúrate de importar tu reductor raíz

const store = createStore(rootReducer);

export default store;