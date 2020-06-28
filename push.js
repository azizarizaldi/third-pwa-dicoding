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
    "endpoint": "https://fcm.googleapis.com/fcm/send/ezuandPgZNk:APA91bHVlG3lqzmvb_K9VtaLWB777rKhO6QYpO2u-MV3bo8bD-uTOntYKCiSxfvrQ9JIcSCXHgqUnHKjJ3LK03a5jYbGLI2bIZ0V-rvSJ2pC5bQXnizw1_69NtFdodMFH-Sij-oUpiiT",
    "keys": {
        "p256dh": "BHSeQoGCEneUg/nXIoNy8DZgPcDNKSxE5DTu12b1zQTilVIYdNhtgJ3DuxDgqU8UDcn0CtgYCyZQ3WvEzZO29jI=",
        "auth": "tyFojp1Ei09vSXaPYFCSGA=="
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