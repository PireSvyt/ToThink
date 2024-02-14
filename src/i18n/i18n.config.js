import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Language reset on refresh from cookies
import Cookies from 'js-cookie'
let language = Cookies.get('tothink_language')
if (language === undefined) {
  language = 'enGB'
}

i18n.use(initReactI18next).init({
  fallbackLng: 'enGB',
  lng: language,
  resources: {
    enGB: {
      translations: require('./i18n.enGB.json'),
    },
  },
  ns: ['translations'],
  defaultNS: 'translations',
})

i18n.languages = ['frFR', 'enGB']

export default i18n
