import {database, initializeApp} from "firebase/app";
import {firebaseConfig} from "./src/environments/firebaseConfig";
import {auth} from 'firebase';
var Queue = require('firebase-queue');

console.log('Running batch server ...');
initializeApp(firebaseConfig);

auth()
  .signInWithEmailAndPassword('lsh294753@gmail.com', 'lsh...')
  .then(runConsumer)
  .catch(onError);


function onError(err) {
  console.error('请求失败', err);
  process.exit();
}

function runConsumer() {
  const lessonRef = database().ref('lessons');
  const lessonsPerCourseRef = database().ref('lessonsPerCourse');

  const queueRef = database().ref('queue');

  const queue = new Queue(queueRef, function (data, progress, resolve, reject) {
    console.log('received delete request ...', data);
    const deleteLessonPromise = lessonRef.child(data.lessonId).remove();
    const deleteLessonPerCoursePromise =
      lessonsPerCourseRef.child(`${data.courseId}/${data.lessonId}`).remove();

    Promise.all([deleteLessonPromise, deleteLessonPerCoursePromise])
      .then(
        () => {
          console.log('lesson deleted');
          resolve();
        }
      )
      .catch(
        () => {
          console.log('lesson deletion in error');
          reject();
        }
      )
  });
}
