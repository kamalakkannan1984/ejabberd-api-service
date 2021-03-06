/**
 * @createdBy Kamal
 * @createdOn 18th June 2020
 */

const FCM = require('fcm-node');
import PushNotifications from 'node-pushnotifications';
import { config } from '../config/app';

const pushNotificationHandler: any = {};

/**
 *
 * @param {Object} req - request object
 * @param {Object} reply - response object
 * @description - pushNotificationAndriod
 */
pushNotificationHandler.pushNotificationAndriod = async function (req: any, res: any, done: any) {
  try {
    const data: any = {};
    const notification = req.body.notification;
    const serverKey = config.FCMkey; // put your server key here
    const fcm = new FCM(serverKey);
    const message = {
      // this may vary according to the message type (single recipient, multicast, topic, et cetera)
      to: req.body.registration_token,
      collapse_key: 'your_collapse_key',

      /*notification: {
        title: 'Title of your push notification',
        body: 'Body of your push notification',
      },*/

      notification,

      data: {
        // you can send only notification or only data(or include both)
        my_key: 'my value',
        my_another_key: 'my another value',
      },
    };

    fcm.send(message, function (err: any, response: any) {
      if (err) {
        console.log(err);
        res.send({ status_code: 200, message: 'notification sent failed' });
      } else {
        console.log(response);
        res.send({ status_code: 200, message: 'notification sent successfully' });
      }
    });
  } catch (err) {
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }
};

/**
 *
 * @param {Object} req - request object
 * @param {Object} reply - response object
 * @description - pushNotificationIos
 */
pushNotificationHandler.pushNotificationIos = async function (req: any, res: any, done: any) {
  try {
    let dataArr: any = {};
    const alert = req.body.alert;
    const settings = {
      apn: {
        token: {
          key: '../../certfile/message.p12', // optionally: fs.readFileSync('./certs/key.p8')
          //keyId: 'ABCD',
          //teamId: 'EFGH',
        },
        production: false, // true for APN production environment, false for APN sandbox environment,
      },
    };
    const push = new PushNotifications(settings);
    const registrationIds = req.body.registrationIds; //'INSERT_YOUR_DEVICE_ID';
    dataArr = {
      topic: 'topic', // REQUIRED for iOS (apn and gcm)
      /* The topic of the notification. When using token-based authentication, specify the bundle ID of the app.
       * When using certificate-based authentication, the topic is usually your app's bundle ID.
       * More details can be found under https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/sending_notification_requests_to_apns
       */

      alert,
    };

    push
      .send(registrationIds, dataArr)
      .then((results) => {
        console.log(results);
        res.send({ status_code: 200, message: 'notification sent successfully' });
      })
      .catch((err) => {
        console.log(err);
        res.send({ status_code: 200, message: 'notification sent failed' });
      });
  } catch (err) {
    console.log(err);
    res.send({ status_code: 500, message: 'internal server error' });
  }
};

export const pushNotificationHandlers: any = pushNotificationHandler;
