/**
 * @description user relation test
 */

const server = require('../server')
const { getFans, getFollowers } = require('../../src/controller/user-relation');
const {
  Z_ID,
  Z_USER_NAME,
  Z_COOKIE,
  L_ID,
  L_USER_NAME
} = require("../testUserInfo")

// 先取消关注，防止已经关注了还关注的情况
test('先取消关注，应该成功', async () => {
  const res = await server
      .post('/api/profile/unFollow')
      .send({ userId: L_ID })
      .set('cookie', Z_COOKIE)
  expect(1).toBe(1)
})

// 添加关注
test('张三关注李四，应该成功', async () => {
  const res = await server
      .post('/api/profile/follow')
      .send({ userId: L_ID })
      .set('cookie', Z_COOKIE)
  expect(res.body.errno).toBe(0)
})

// 获取粉丝
test('获取李四的粉丝，应该有张三', async () => {
  const res = await getFans(L_ID)
  const { fansCount, userList } = res.data
  const hasUserName = userList.some(fanInfo => fanInfo.userName === Z_USER_NAME);
  expect(fansCount > 0).toBe(true)
  expect(hasUserName).toBe(true)
})

// 获取关注者
test('获取张三关注的人，应该有李四', async () => {
  const res = await getFollowers(Z_ID)
  const { followersCount, followersList } = res.data
  const hasUserName = followersList.some(follower => follower.userName === L_USER_NAME);
  expect(followersCount > 0).toBe(true)
  expect(hasUserName).toBe(true)
})

// 取消
test('张三取关李四，应该成功', async () => {
  const res = await server
      .post('/api/profile/unFollow')
      .send({ userId: L_ID })
      .set('cookie', Z_COOKIE)
  expect(res.body.errno).toBe(0)
})