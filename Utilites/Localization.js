import I18n from 'ex-react-native-i18n';
import { DangerZone } from 'expo';

I18n.initAsync = async () => {
  const locale = await Expo.Localization.locale;
  I18n.locale = (locale) ? locale.replace(/_/, '-') : '';
};

I18n.fallbacks = true;
I18n.translations = {
  en: {
    //экран входа
    enterYourBirthday: 'Enter your birthday',
    enter: 'Enter',
    signUp: 'Sign Up',
    logIn: 'Log in',
    logInWithFacebook: 'Log in with Facebook',
    enterYourBirthdayError: 'Please, enter your birthday or Log in!',
    //меню
    search1: 'Search',
    messages: 'Messages',
    favourites: 'Favourites',
    notifications: 'Notifications',
    shop: 'Shop',
    calculator: 'Calculator',
    settings: 'Settings',
    //фильтр
    age: 'Age',
    compatibility: 'Compatibility',
    onlineNow: 'Online now',
    location: 'Location',
  },
  ru: {
    //экран входа
    enterYourBirthday: 'Введите Вашу дату рождения',
    enter: 'Войти',
    signUp: 'Регистрация',
    logIn: 'Вход',
    logInWithFacebook: 'Вход через Facebook',
    enterYourBirthdayError: 'Пожалуйста введите дату рождения или войдите в приложение!',
    //меню
    search1: 'Поиск',
    messages: 'Сообщения',
    favourites: 'Избранное',
    notifications: 'Уведомления',
    shop: 'Магазин',
    calculator: 'Калькулятор',
    settings: 'Настройки',
    //фильтр
    age: 'Возраст',
    compatibility: 'Подходимость',
    onlineNow: 'Online сейчас',
    location: 'Местонахождение',
  }
};

export default I18n;
