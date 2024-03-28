# JWT

## 是什么

`JWT (JSON Web Token)` , 本质上就是一个字符串书写规范. 作用是在用户和服务器之间传递安全可靠的信息.

在目前的前后端分离的开发过程中, 使用 `token` 鉴权机制用于身份验证是最常见的方案, 流程如下：

- 服务器当验证用户的账号和密码正确的时候, 给用户颁发一个令牌, 这个令牌作为后续用户访问一些接口的凭证
- 后续访问会根据这个令牌判断用户是否有权限进行访问

`token` , 分为 3 个部分. `头部`（`header`）、`载荷`（`payload`）、`签名`（`signature`）, 并以 `.`进行拼接.

### header

每个 `jwt` 都会带有头部信息, 这里主要声明使用的算法. 生命算法的字段名为 `alg`, 同时还有一个 `typ` 字段, 默认 `JWT` 即可. 例如：

```json
{ "alg": "HS256", "typ": "JWT" }
```

因为 `JWT` 是字符串, 所以还需要对上面的内容进行 `base64` 编码. 编码之后的字符串如下：

```json
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```

### payload

载荷即消息体, 这里会存放实际的内容. 也就是 `token` 的数据声明, 例如用户的 `id` 和 `name` , 默认情况下也会携带令牌的签发时间 `iat` , 通常还可以设置过期时间. 如下：

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}
```

同样进行 `base64` 编码, 字符串如下：

```json
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ
```

### signature

签名是对头部和载荷内容进行签名, 一般情况, 设置一个 `secretKey` , 对前两个结果进行 `HMACSHA25` 算法. 一旦前两部分的数据被篡改. 只要服务器加密用的密钥没有泄露, 得到的签名肯定和之前的签名不一样.

## 如何实现

`token` 的使用分成两部分.

- 生成 `token` ： 登陆成功的时候, 颁发 `token`
- 验证 `token` ： 访问某些资源或者接口时, 验证 `token`

### 生成 token

借助第三方库 `jsonwebtoken` , 通过 `jsonwebtoken` 的 `sign` 方法生成一个 `token. `

- 第一个参数是 `payload`
- 第二个参数是密钥, 服务端持有
- 第三个参数是 `option, ` 可以定义 `token` 的过期时间

在前端接收到 `token` 后, 一般情况下会通过 `localStorage` 进行缓存, 然后将 `token` 放到 `HTTP` 请求头 `Authorization` 中. 关于 `Authorization` 的设置, 前面要加上 `Bearer` , 注意后面带有空格.

## 优缺点

### 优点

- `json` 具有通用性, 所以可以跨语言
- 组成简单, 字节占用小, 便于传输
- 服务端无需保存会话信息, 很容易进行水平扩展
- 一处生成, 多处使用, 可以在分布式系统中, 解决单点登录问题
- 可以防护 `CSRF` 攻击

### 缺点

- `payload` 部分仅仅是进行简单编码, 所以只能用于存储逻辑必需的非敏感信息
- 需要保护好加密密钥, 一旦泄露后果严重
- 为避免 `token` 被挟持, 最好使用 `https` 协议
