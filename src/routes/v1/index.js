const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const placeRoute = require('./place.route');
const checkinRoute = require("./checkin.route");
const organizationsRoute = require("./organizations.route");
const scanQRRoute = require('./scanQR.route')
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: "/places",
    route: placeRoute,
  },
  {
    path: "/checkin",
    route: checkinRoute,
  },
  {
    path: "/organizations",
    route: organizationsRoute,
  },
  {
    path: "/scan-qr",
    route: scanQRRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
