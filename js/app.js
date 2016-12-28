var config = {
  apiKey: "AIzaSyByEyxRuNiMsCRqrCv6iFYsnE_fM5C1Dwc",
  authDomain: "chat-b57ce.firebaseapp.com",
  databaseURL: "https://chat-b57ce.firebaseio.com",
  storageBucket: "chat-b57ce.appspot.com",
  messagingSenderId: "381750446833"
};

var firebaseApp = firebase.initializeApp(config);
var db = firebaseApp.database();
var messagesRef = db.ref('messages');

var hasScrolledToBottom = false;

var messages = new Vue({
    el: '#messages',
    firebase: {
        messages: messagesRef.limitToLast(25)
    },
    ready:function(){
        console.log("test");
    },
    watch: {
        messages: function (val, oldVal) {
            if ( !hasScrolledToBottom ) {
                hasScrolledToBottom = true
                setTimeout(function () {
                    var elem = document.getElementById('messages');
                    elem.scrollTop = elem.scrollHeight;
                }, 500);
            }
        },
    }
});

var input = new Vue({
    el: '#input',
    data: {
        message: ''
    },
    methods: {
        addMessage: function() {
            if ( this.message.length > 0 ) {
                messagesRef.push({
                    text: this.message,
                    time: new Date().toLocaleTimeString(),
                })
                this.message = '';
            }
        }
    }
});
