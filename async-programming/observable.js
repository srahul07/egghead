var Observable = Rx.Observable;

var button = document.getElementById("button");

/*
var handler = function(e) {
  alert("Clicked");
  button.removeEventListener('click', handler);
};

button.addEventlistener('click', handler);
*/

var clicks = Observable.fromEvent(button, 'click');

var subscription = clicks.forEach(
  function onNext(e) {
    alert('Clicked');
    subscription.dispose();
  },
  function onError(error) {
    console.log('ERROR!');
  },
  function onCompleted() {
    console.log("done");
  });

