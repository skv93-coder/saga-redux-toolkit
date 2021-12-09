import {
  all,
  fork,
  call,
  spawn,
  takeLatest,
  takeEvery,
} from "redux-saga/effects";
let isFailing = false;
const delay = (t, r) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!r) {
        resolve();
      } else {
        reject();
      }
    }, t * 100);
  });

function* worker1() {
  // yield call(console.log, 222656141646);
  yield call(delay, 19);
  console.log(`'object'`, "object");
}

function* watcher1() {
  yield takeEvery("saga", worker1);
}
function* worker2({ payload: { resolve } }) {
  console.log(`isFailing`, isFailing);
  yield call(delay, 10, isFailing);
  console.log(`'object3'`, "object", resolve);
  resolve(6526512566);
  return 9;
}

function* watcher2() {
  const res = yield takeEvery("saga2", worker2);
  console.log(`res`, res);
}

// export default function* rootSaga() {
//   // const sagas = [user];
//   // console.log(`'run'`, "run");
//   yield all([watcher1(), watcher2()]);
// }
export default function* rootSaga() {
  const sagas = [watcher1, watcher2];
  // console.log(`'run'`, "run");
  // yield all([watcher1(), watcher2()]);
  // yield spawn(watcher1);
  // yield spawn(watcher2);
  yield all(
    sagas.map((saga) =>
      spawn(function* () {
        while (true) {
          console.count("count");
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.log({ e }, 11);
          }
        }
      })
    )
  );
}
