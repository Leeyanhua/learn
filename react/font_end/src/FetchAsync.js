import { message } from 'antd';

async function getUrl(url, cookie) {
  console.log(`[Get URL]: ${url}`);
  try {
    const response = await fetch(url, cookie ? {
      credentials: 'include', // 携带 cookie
      // credentials: 'same-origin'   // 生产模式  只允许同域发送
    } : {});
    const result = response.json();
    return result;
  } catch (error) {
    console.log('[error] ', error);
    return false;
  }
}

async function postUrl(url, value) {
  // console.log(`[POST URL]: ${url}`);
  // console.log('[POST DATA]:', value);
  try {
    const response = await fetch(url, {
      credentials: 'include', // 携带 cookie
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    });
    const result = response.json();
    return result;
  } catch (error) {
    console.log('[error] ', error);
    return false;
  }
}

async function putUrl(url, value) {
  try {
    const response = await fetch(url, {
      credentials: 'include', // 携带 cookie
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    });
    const result = response.json();
    return result;
  } catch (error) {
    console.log('[error] ', error);
    return false;
  }
}

async function deleteUrl(url, value) {
  try {
    const response = await fetch(url, {
      credentials: 'include', // 携带 cookie
      method: 'Delete',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    });
    const result = response.json();
    return result;
  } catch (error) {
    console.log('[error] ', error);
    return false;
  }
}

export const asyncGet = (url) => {
  return getUrl(url, true).then(result => {
    if (result.code && result.code > 0) {
      const msg = result.msg || '获取信息失败！'
      message.error(msg, 2)
      // return false;
    } else {
      return result
    }
  })
};
export const asyncPost = (url, value) => {
  return postUrl(url, value).then(result => {
    return result;
  })
};

export const asyncPut = (url, value) => {
  return putUrl(url, value).then(result => {
    if (result.code && result.code > 0) {
      const msg = result.msg || '修改信息失败！'
      message.error(msg, 2)
      // return false;
    } else {
      // console.log('修改信息成功！', url, value);
      return result
    }
  })
};
export const asyncDelete = (url, value) => {
  return deleteUrl(url, value).then(result => {
    if (result.code && result.code > 0) {
      const msg = result.msg || '删除信息失败！'
      message.error(msg, 2)
      // return false;
    } else {
      return result
    }
  })
};

export const asyncGetAmap = (url) => {
  return getUrl(url, false);
};
