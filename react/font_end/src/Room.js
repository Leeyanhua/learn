import { asyncGet, asyncPost, asyncPut, asyncDelete } from './FetchAsync';

// export const getEvents = (options, cb) => {
//   asyncGet('/room', options).then((result) => {
//     if (cb) cb(result);
//   });
// };

export const getEvents = (options, cb) => {
  asyncGet('/room').then((result) => {
    if (result && cb) cb(result);
  });
};

export const postEvents = (options, cb) => {
  asyncPost('/room', options).then((result) => {
    // console.log('验证码', result);
    if (result && cb) cb(result);
  });
};

export const putEvents = (options, cb) => {
  asyncPut('/room', options).then((result) => {
    if (result && cb) cb(result);
  });
};

export const deleteEvents = (options, cb) => {
  const url = `/room${options}`;
  asyncDelete(url, {}).then((result) => {
    if (result && cb) cb(result);
  });
};
