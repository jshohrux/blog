import _ from 'lodash';
window._ = _;

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

// import axios from 'axios';
// window.axios = axios;

// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */
import Echo from 'laravel-echo';

import Pusher from 'pusher-js';
window.Pusher = Pusher;

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: '18f8d7457b2a1c539116333442003',
//     wsHost:'127.0.0.1',
//     wsPort: 6001,
//     cluster: "ap1",
//     forceTLS: false,
//     disableStats: true,
//     authEndpoint: "http://127.0.0.1:8000/api/broadcasting/auth",
//     auth: {
//         headers: {
//             Authorization: 'Bearer ' + localStorage.getItem('token'),
//             Accept: 'application/json',

//         }
//     },

// });
// const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
const token = localStorage.getItem('token')
window.Echo = new Echo({
  broadcaster: 'pusher',
  host: '127.0.0.1:8000',
  key: '18f8d7457b2a1c539116333442003',
  wsHost:'127.0.0.1',
  wsPort: 6001,
  cluster: "ap2",
  forceTLS: false,
  disableStats: true,
  encrypted: true,
  authEndpoint :'http://127.0.0.1:8000/api/broadcasting/auth',
  enabledTransports: ['ws', 'wss'],
  auth:{
      headers: {
          Authorization: 'Bearer 29|mXnQISlkbq9hg9pNMWWlu4VKBo1AYqHGlnwiJIDR7b8d1246',
          Accept: 'application/json',// Include CSRF token
      }
  },
});
