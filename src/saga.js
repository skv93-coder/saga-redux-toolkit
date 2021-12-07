import { all, call, spawn } from "redux-saga/effects";
function* user() {
  yield console.log(`2jhbj`, 2);
}

export default function* rootSaga() {
  const sagas = [user];
  console.log(`'run'`, "run");
  yield all(
    sagas.map((saga) =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.log(e);
          }
        }
      })
    )
  );
}
