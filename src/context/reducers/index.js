import globalReducer from './global-reducer';

export default ({ global }, action) => ({
    global: globalReducer(global, action),
});
