import { combineReducers } from 'redux';

// reducers
import cartReducer from './cart';
import compareReducer from './compare';
import currencyReducer from './currency';
import localeReducer from './locale';
import mobileMenuReducer from './mobile-menu';
import quickviewReducer from './quickview';
import sidebarReducer from './sidebar';
import wishlistReducer from './wishlist';
import categoryReducer from './category';
import adReducer from './ad';
import userAccountReducer from './userAccount';
import profileReducer from './profile';
import orderReducer from './order';
import photoReducer from './photo';

export default combineReducers({
    cart: cartReducer,
    compare: compareReducer,
    currency: currencyReducer,
    locale: localeReducer,
    mobileMenu: mobileMenuReducer,
    quickview: quickviewReducer,
    sidebar: sidebarReducer,
    wishlist: wishlistReducer,
    category: categoryReducer,
    ad: adReducer,
    userAccount: userAccountReducer,
    profile: profileReducer,
    order: orderReducer,
    photo: photoReducer,

});
