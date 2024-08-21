# Prometheus

## 安装

参考： https://prometheus.io/docs/prometheus/latest/getting_started/

### 官网下载

Mac 下载官网安装包 `prometheus-2.52.0.darwin-amd64.tar.gz`
使用 `tar xvfz prometheus-2.52.0.darwin-amd64.tar.gz`进行解压，然后进入到目录。修改`prometheus.yml`文件为以下，然后执行`./prometheus`。
在`localhost:9090`可以打开本地 **Prometheus** 页面进行调试。

```yml
global:
  scrape_interval: 5s

scrape_configs:
  - job_name: prometheus
    static_configs:
      - targets:
          - localhost:9090
  - job_name: demo
    static_configs:
      - targets:
          - demo.promlabs.com:10000
          - demo.promlabs.com:10001
          - demo.promlabs.com:10002
```

## 架构

### Prometheus Server

1. Collects metrics
2. Stores in TSDB
3. Provides an API

### Exporters

1. Fetch metrics
2. Convert to Prometheus format
3. Expose via an API

## PromQL

### PromQL 使用场景

1. 获取感兴趣的 metrics
2. 聚合 metrics(Aggregate)
3. 创建 Dashboard
4. 配置 alerts

### Data Types

1. Scalar: `sum(http_server_requests_seconds_count)`
2. Instant Vector: `http_server_requests_seconds_count`
3. Range Vector: `http_server_requests_seconds_count[5m]`

### 4 种类型 Metrics

在 Prometheus 监控中，对于采集过来的数据，统一称为 metrics 数据。

1. Counter
   - 单增，从数据量 0 开始累积计算，理想状态下，只能是永远增长，不会降低。
2. Gauge
   - 能增能减，瞬时状态，数值。随着时间的推移，不断的产生瞬时，没有规则的变化的。
3. Histogram
   - Histogram 统计数据的分布情况。比如最小值，最大值，中间值，还有中位数，75 百分位，90 百分位，95 百分位，99 百分位等。这是一种特殊的 metrics 数据类型，代表一种近似的百分比估算数值。
4. Summary

### 函数

1. rate: 专门搭配 counter 类型数据使用的函数，它的功能是按照一个时间段，取 counter 在这个时间段中平均每秒的增量。
   - rate[1m]这样的取值比起 rate[5m]，因为它的取值时间段更短，所以任何某一瞬间的凸起或者降低。在成图的时候，会体现的更加细致、更敏感。
   - 而 rate[5m]把整个 5 分钟内的都一起平均了，那么当凸起发生的时候，会显得更平缓一些。因为取的时间段常，把波峰波谷都给平均消下去了。
2. increase: 取一段时间增量的总量
3. sum: 把结果集的输出，进行总加和。
4. topk: 取前几位的最高值
5. count: 把数值符合条件的，输出数目进行加合。

### 4 种黄金 Metrics

1. Traffic: Rate
   `sum(rate(http_request_duration_seconds_count{}[10m]))`
2. Error Rate: Error Rate
   `sum(rate(http_request_duration_seconds_count{code!="200"}[10m]))`
3. Latency: Duration
   `histogram_quantile(0.9, sum by (le) (rate(http_request_duration_seconds_bucket[10m])))`
4. Saturation: Saturation
   `100 - (avg by (node) (irate(node_cpu_seconds_total{node="minikube"}[5m])) * 100)`
