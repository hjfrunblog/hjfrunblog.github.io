# Learn Redis

## Redis 简介

### Redis 优势

- 性能极高 – Redis 能读的速度是 110000 次/s,写的速度是 81000 次/s
- 丰富的数据类型 – Redis 支持二进制案例的 Strings, Lists, Hashes, Sets 及 Ordered Sets 数据类型操作
- 原子 – Redis 的所有操作都是原子性的, 同时 Redis 还支持对几个操作全并后的原子性执行
- 丰富的特性 – Redis 还支持 publish/subscribe, 通知, key 过期等等特性

### Redis 与其他 key-value 存储有什么不同？

- Redis 有着更为复杂的数据结构并且提供对他们的原子性操作, 这是一个不同于其他数据库的进化路径. Redis 的数据类型都是基于基本数据结构的同时对程序员透明, 无需进行额外的抽象
- Redis 运行在内存中但是可以持久化到磁盘, 所以在对不同数据集进行高速读写时需要权衡内存, 因为数据量不能大于硬件内存. 在内存数据库方面的另一个优点是, 相比在磁盘上相同的复杂的数据结构, 在内存中操作起来非常简单, 这样 Redis 可以做很多内部复杂性很强的事情. 同时, 在磁盘格式方面他们是紧凑的以追加的方式产生的, 因为他们并不需要进行随机访问

## 使用 Docker 安装

`docker run -p 6379:6379 -d --name local-redis redis`

## Redis 配置

Redis 的配置文件位于 Redis 安装目录下, 文件名为 redis.conf

## Redis 数据类型

Redis 支持五种数据类型：string（字符串）, hash（哈希）, list（列表）, set（集合）及 zset(sorted set：有序集合)

### String（字符串）

string 是 redis 最基本的类型, 你可以理解成与 Memcached 一模一样的类型, 一个 key 对应一个 value

```console
redis 127.0.0.1:6379> SET name "runoob"
OK
redis 127.0.0.1:6379> GET name
"runoob"
```

### Hash（哈希）

Redis hash 是一个键值对集合

Redis hash 是一个 string 类型的 field 和 value 的映射表, hash 特别适合用于存储对象

```console
127.0.0.1:6379> HMSET user:1 username runoob password runoob points 200
OK
127.0.0.1:6379> HGETALL user:1
1) "username"
2) "runoob"
3) "password"
4) "runoob"
5) "points"
6) "200"
```

### List（列表）

Redis 列表是简单的字符串列表, 按照插入顺序排序. 你可以添加一个元素到列表的头部（左边）或者尾部（右边）

```console
redis 127.0.0.1:6379> lpush runoob redis
(integer) 1
redis 127.0.0.1:6379> lpush runoob mongodb
(integer) 2
redis 127.0.0.1:6379> lpush runoob rabitmq
(integer) 3
redis 127.0.0.1:6379> lrange runoob 0 10
1) "rabitmq"
2) "mongodb"
3) "redis"
redis 127.0.0.1:6379>
```

### Set（集合）

Redis 的 Set 是 string 类型的无序集合

集合是通过哈希表实现的, 所以添加, 删除, 查找的复杂度都是 O(1). sadd 命令
添加一个 string 元素到,key 对应的 set 集合中, 成功返回 1, 如果元素已经在集合中返回 0,key 对应的 set 不存在返回错误

```console
redis 127.0.0.1:6379> sadd runoob redis
(integer) 1
redis 127.0.0.1:6379> sadd runoob mongodb
(integer) 1
redis 127.0.0.1:6379> sadd runoob rabitmq
(integer) 1
redis 127.0.0.1:6379> sadd runoob rabitmq
(integer) 0
redis 127.0.0.1:6379> smembers runoob

1) "rabitmq"
2) "mongodb"
3) "redis"
```

### zset(sorted set：有序集合)

Redis zset 和 set 一样也是 string 类型元素的集合,且不允许重复的成员

不同的是每个元素都会关联一个 double 类型的分数. redis 正是通过分数来为集合中的成员进行从小到大的排序

zset 的成员是唯一的,但分数(score)却可以重复

zadd 命令 添加元素到集合, 元素在集合中存在则更新对应 score

```console
redis 127.0.0.1:6379> zadd runoob 0 redis
(integer) 1
redis 127.0.0.1:6379> zadd runoob 0 mongodb
(integer) 1
redis 127.0.0.1:6379> zadd runoob 0 rabitmq
(integer) 1
redis 127.0.0.1:6379> zadd runoob 0 rabitmq
(integer) 0
redis 127.0.0.1:6379> ZRANGEBYSCORE runoob 0 1000

1) "redis"
2) "mongodb"
3) "rabitmq"
```
