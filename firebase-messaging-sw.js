importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

const firebaseConfig={
    apiKey:"AIzaSyC1kFKHlRTYdul2XFsJI5qHVvSzHlUCNBw",
    authDomain:"whats-napp.firebaseapp.com",
    databaseURL:"https://whats-napp-default-rtdb.firebaseio.com",
    projectId:"whats-napp",
    storageBucket:"whats-napp.firebasestorage.app",
    messagingSenderId:"723060342195",
    appId:"1:723060342195:web:ebae6b3c6568199a189fc6"
};

firebase.initializeApp(firebaseConfig);
const messaging=firebase.messaging();

messaging.onBackgroundMessage((payload)=>{
    const notificationTitle=payload.notification.title;
    const notificationOptions={
        body:payload.notification.body,
        icon:payload.notification.icon||'/icon-192x192.png',
        badge:'/badge-72x72.png',
        tag:payload.data?.chatId||'default',
        requireInteraction:false,
        silent:false,
        vibrate:[200,100,200]
    };
    self.registration.showNotification(notificationTitle,notificationOptions);
});

self.addEventListener('notificationclick',(event)=>{
    event.notification.close();
    event.waitUntil(
        clients.matchAll({type:'window'}).then((clientList)=>{
            if(clientList.length>0)return clientList[0].focus();
            return clients.openWindow('/');
        })
    );
});
