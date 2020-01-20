# Config

- baseUrl: <https://www.vanlansh.wang/api/>

## Run

- npm run android

## screens

> 所有的页面

- [x] Login 登陆
- [ ] Registerd 注册
- [ ] Home 首页
- [ ] Find 发现
- [ ] Mine 我的
- [ ] Search & List 搜索
- [ ] Detail 详情

>对应也页面所有的功能

- Login => 输入框(用户名，密码），登录按钮
- Registerd => 输入框(用户名)，发送邮件快速注册，给邮箱发一组随机注册数（5位数），点击发送邮件按钮后在当前界面输入框底下出现新的一个输入框（邮箱随机注册码），按钮会从发送邮件变成注册按钮

- Home => 搜索框, 三种卡片类似可以左右滑动，页面最多展示两种卡片，都是每日推荐的职位。我的投递记录功能，邀约结果等
- Find => 最新发布的职位与社区（发一些工作中遇到的问题，如何使用等信息，类似于朋友圈这种功能）
- Mine => 头像，查看简历（分两种，一种是简洁的，由用户自己去填写，另一种是通过固定的网址去上传的），投递职位的记录，意见反馈等

- Search & List 通过Home里面搜索后进入的页面，暂时与Find里展示的list一样
- Detail 通过Search，Find等页面进入到职位详情，由JD（Job Description）等招聘的基本信息，底部有一个按钮（一键投递），点击按钮之后就会发给对应HR的邮箱里面。在此页面可以看到公司详情（单独的一页，暂定）

### Tips

- 主题颜色： #FFA500
- 去掉顶部的header

``` javascript
 navigationOptions:{
    header: null
}
```

- 所有的通知均为邮箱推送通知

### dev

- 调试 Command + M

### Effects

> Plan

- [input动画](https://github.com/halilb/react-native-textinput-effects)

### Future

- 定位

### Node

> API

统一返回格式：

```json
{
    success:true,
    data:[]
}
```

此表<code>response</code>为统一返回格式<code>data</code>中的数据：
/ | methods |  request  | response |description
-|-|-|-|-
login | post | email & passcode || 登录
registered | post | email & pascode || 注册
home | get | | | 首页信息
search | post | city & key| | 搜索
job/detail | get | | | 职位详情
job/submit | post | uid & hr_id & email | | 详情页中投递
Find | get | | | 最新职位等
Find/forum | get| | | 论坛最新消息
Find/publish | post | uid & message & time || 发布消息 
Mine | get | | pre_path  |我的页面
upload | post | type & avatar | pre_path  |头像上传
