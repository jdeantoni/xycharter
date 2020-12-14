import Vue from 'vue'
import {
  extend,
  ValidationObserver,
  ValidationProvider,
} from 'vee-validate'
import {
  max,
  min,
  required,
} from 'vee-validate/dist/rules'

extend('max', max)
extend('min', min)
extend('required', required)

Vue.component('validation-provider', ValidationProvider)
Vue.component('validation-observer', ValidationObserver)
