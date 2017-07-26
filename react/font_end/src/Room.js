import { asyncGet, asyncPost } from './FetchAsync';

// export const getArea = (city, cb) => {
//   const url = 'http://restapi.amap.com/v3/config/district' +
//   '?key=777b20425433e59dc13e0c013911a96b' +
//   `&keywords=${city}` +
//   '&subdistrict=1' +
//   '&showbiz=false';
//   asyncGetAmap(url).then((result) => {
//     if (cb) cb(result);
//   });
// };

// export const getPoint = (options, cb) => {
//   asyncPost('/room').then((result) => {
//     if (cb) cb(result);
//   });
// };
export const postEvents = (options, cb) => {
  asyncPost('/room', options).then((result) => {
    // console.log('验证码', result);
    if (result && cb) cb(result);
  });
};
// export const getIncubator = (options, cb) => {
//   asyncGet(`/api/incubator/${options}`).then((result) => {
//     if (cb) cb(result);
//   });
// };
// export const getSearchList = (options, cb) => {
//   const area = {
//     0: '',
//     1: '&area_gte=300&area_lte=3000',
//     2: '&area_gte=3000&area_lte=6000',
//     3: '&area_gte=6000&area_lte=9000',
//     4: '&area_gte=9000',
//   };
//   const price = {
//     0: '',
//     1: '&price_gte=200&price_lte=600',
//     2: '&price_gte=600&price_lte=1000',
//     3: '&price_gte=1000',
//     4: '&price_gte=0&price_lte=50',
//     5: '&price_gte=50&price_lte=100',
//   };
//   let url = '/api/incubator?a=a';
//   if (options.zone) {
//     url += `&zone=${options.zone}`;     // 区域
//   }
//   if (options.area) {
//     url += area[options.area];    // 面积
//   }
//   if (options.price) {
//     url += price[options.price];
//     console.log('url search', price[options.price]);
//   }
//   if (options.type) {
//     url += `&type=${options.type}`;
//   }
//   console.log('url search', url);
//   asyncGet(url).then((result) => {
//     if (result && cb) cb(result);
//   });
// };
