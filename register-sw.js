// Periksa service worker
if (!('serviceWorker' in navigator)) {
    console.log("Service worker tidak didukung browser ini.");
} else {
    registerServiceWorker();
    requestPermission();
}
// Register service worker
function registerServiceWorker() {
    navigator.serviceWorker.register('service-worker.js')
        .then(function (registration) {
            console.log('Registrasi service worker berhasil.');
            return registration;
        })
        .catch(function (err) {
            console.error('Registrasi service worker gagal.', err);
        });

    navigator.serviceWorker.ready.then(function () {
        pushManagerSubscribe();
    });
}

function requestPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(function (result) {
            if (result === "denied") {
                console.log("Fitur notifikasi tidak diijinkan.");
                return;
            } else if (result === "default") {
                console.error("Pengguna menutup kotak dialog permintaan ijin.");
                return;
            }
        });
    }
}

function pushManagerSubscribe() {
    if (('PushManager' in window)) {
        navigator.serviceWorker.getRegistration().then(function (registration) {
            registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array("BHYuE4NfFYXpVWcllWq2J95vdT4fNEu2Romid7ZeNbFbbAtWag4SanXXnfplja_SQGfy5x6_vZ6n5ur-zS9_740")
            }).then(function (subscribe) {
                console.log('Berhasil melakukan subscribe dengan endpoint: ',
                    subscribe.endpoint);
                var xxx = btoa(String.fromCharCode.apply(
                    null, new Uint8Array(subscribe.getKey('p256dh'))
                ));
                console.log('Berhasil melakukan subscribe dengan p256dh key: ', xxx);

                var auth = btoa(String.fromCharCode.apply(
                    null, new Uint8Array(subscribe.getKey('auth'))));

                console.log('Berhasil melakukan subscribe dengan auth key: ', auth);


            }).catch(function (e) {
                console.error('Tidak dapat melakukan subscribe ', e.message);
            });
        });
    }
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}