const webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BHYuE4NfFYXpVWcllWq2J95vdT4fNEu2Romid7ZeNbFbbAtWag4SanXXnfplja_SQGfy5x6_vZ6n5ur-zS9_740",
    "privateKey": "EgJTeycdqDcTkaXzvlQ2u_SpHyvNens9WLNMFVvmIWw"
};


webPush.setVapidDetails(
    'mailto:azardi.business@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/eYU7DFXwJQM:APA91bE7ykwJICxSy_MEhS4Q4nl5YJphIxkdX8ZSyC9sfOdhKktWkp5jWZ-sjD0a7CfrjOp3JD0Uj7vWoDIlgJNQrWmDHnJMJHxO1ee9iAPpf0pWFkKGvFekaXFw0BiNj_uBmeyrEJaW",
    "keys": {
        "p256dh": "BMAbeZB8JBG0gE6+COl6GU4Ajs/OAxv9kc4j6shKUpamPNaBiECsuLODkTlTT82XYBNpiBqY58qlTLpLEfmYy48=",
        "auth": "yKqUFqXyQGwOlNpe85clNg=="
    }
};

const payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

const options = {
    gcmAPIKey: '610953317991',
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);