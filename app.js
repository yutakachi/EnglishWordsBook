// Registering Service Worker
// ブラウザでサービスワーカーが使用出来る場合はサービスワーカーを登録する
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then( (reg) => {
      // registration worked
      console.log('Registration succeeded. Scope is ' + reg.scope);
    }).catch( (err) => {
      // registration failed
      console.log('Registration failed with ' + err);
    });
}

// インストールバナーを表示するイベント
// インストールバーナーを表示するイベントをフックして手動でインストールするボタンなと作成する
// このイベントは、Webアプリインストール要件を満たした場合に発火されるので
// このイベントが発火していない場合は、Webアプリとしてインストールするいことが出来ない。
window.addEventListener('beforeinstallprompt', function(event){
  console.log("beforeinstallprompt: ", event);
  // event.preventDefault(); // event をキャンセルすることで、インストールバナー表示をキャンセルできる

});

window.addEventListener('load', (event) => {
  const swipeBtn = document.querySelector('#swipe_btn');
  swipeBtn.addEventListener('click', pageSwipe);

  // const target = document.querySelector('.answerArea');
  // const target = document.querySelector('.questionArea');
  const target = document.querySelector('.slider-x');
  // const target = window;



  target.addEventListener('touchstart', (ev)=>{
    console.log('touchstart');
  });
  
  target.addEventListener('touchmove', (ev)=>{
    console.log('touchmove');
    // console.log('x=', ev.targetTouches[0].clientX);
    // console.log('x=', ev.targetTouches[0].clientY);

    // let clientRect = ev.currentTarget.getBoundingClientRect();
    // console.log('clientX = ', clientRect.left);
    // console.log('clientY = ', clientRect.top);

    const ans = document.querySelector('.answerArea');
    const qt = document.querySelector('.questionArea');

    let cRAns = ans.getBoundingClientRect();
    let cRQt = qt.getBoundingClientRect();

    console.log('answerX = ', cRAns.left);
    console.log('answerY = ', cRAns.top);
    console.log('questionX = ', cRQt.left);
    console.log('questionY = ', cRQt.top);

    // ans.style.left = "550px";


  });
  
  target.addEventListener('touchend', (ev)=>{
    console.log('touchend');
  });
  
});

// 回答と問題ページを行き来する？
const pageSwipe = (ev)=> {
  // const questionArea = document.querySelector('.questionArea');
  // const answerArea = document.querySelector('.answerArea');

  // let ts = new Event('touchstart');
  // let te = new Event('touchend');
  // questionArea.dispatchEvent(ts);
  // questionArea.dispatchEvent(te);

  
  // タッチイベントを発火させる
  // 移動は、ｘ：８５５～１００まで
  var emulator = new TouchEmulator();
  emulator.touchstart(1, {x: 855, y: 300});
  emulator.touchmove(1, {x: 755, y: 300});
  emulator.touchmove(1, {x: 655, y: 300});
  emulator.touchmove(1, {x: 555, y: 300});
  emulator.touchmove(1, {x: 455, y: 300});
  emulator.touchmove(1, {x: 355, y: 300});
  emulator.touchmove(1, {x: 255, y: 300});
  emulator.touchmove(1, {x: 155, y: 300});
  emulator.touchend(1, {x: 100, y: 300});
}

class TouchEmulator {
  constructor(){
    this.touches = []; // 全タッチを保持
  }

  touchstart(id, point){
    const target = document.elementFromPoint(point.x, point.y);
    const touch = this.createTouch(id, target, point);

    // touchesに追加
    this.touches.push(touch);

    this.triggerTouchEvent('touchstart', touch);
  }

  touchmove(id, point){
    const index = this.touches.findIndex(t => t.identifier === id);
    const target = this.touches[index].target;

    const touch = this.createTouch(id, target, point);

    // touchesを更新
    this.touches[index] = touch;

    this.triggerTouchEvent('touchmove', touch);
  }

  touchend(id, point){
    const target = this.touches.find(t => t.identifier === id).target;

    const touch = this.createTouch(id, target, point);

    // touchesから除去
    this.touches = this.touches.filter(t => t.identifier !== id);

    this.triggerTouchEvent('touchend', touch);    
  }

  // Touchをxとyから生成する
  createTouch(identifier, target, point){
    return new Touch({
      identifier,
      target,
      clientX: point.x,
      clientY: point.y,
      pageX: point.x + window.pageXOffset,
      pageY: point.y + window.pageYOffset,
      radiusX: 10,
      radiusY: 10,
      force: 1
    });  
  }

  // TouchEventを作って発火する
  triggerTouchEvent(name, touch) {
    // targetが同じTouchを取り出す
    const targetTouches = this.touches.filter(t => t.target === touch.target);
    const event = new TouchEvent(name, {
      touches: this.touches,
      targetTouches,
      changedTouches: [touch],
      bubbles: true, // これがないとバブリングしない
      cancelable: true,
      view: window
    });
    touch.target.dispatchEvent(event);
  }
}