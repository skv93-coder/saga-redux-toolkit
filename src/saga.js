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

function* user1() {
  yield takeEvery("saga", worker1);
}
function* worker2() {
  console.log(`isFailing`, isFailing);
  yield call(delay, 10, isFailing);
  console.log(`'object3'`, "object");
}

function* user2() {
  yield takeEvery("saga2", worker2);
}

// export default function* rootSaga() {
//   // const sagas = [user];
//   // console.log(`'run'`, "run");
//   yield all([user1(), user2()]);
// }
export default function* rootSaga() {
  const sagas = [user1, user2];
  // console.log(`'run'`, "run");
  // yield all([user1(), user2()]);
  // yield spawn(user1);
  // yield spawn(user2);
  yield all(
    sagas.map((saga) =>
      spawn(function* () {
        while (true) {
          console.count("count");
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.log({ e });
          }
        }
      })
    )
  );
}
