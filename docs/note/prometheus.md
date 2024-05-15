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

### 4 Types of Metrics

1. Counter
   单增
2. Gauge
   能增能减
3. Histogram
4. Summary

### 4 Golden Metrics

1. Traffic: Rate
   `sum(rate(http_request_duration_seconds_count{}[10m]))`
2. Error Rate: Error Rate
   `sum(rate(http_request_duration_seconds_count{code!="200"}[10m]))`
3. Latency: Duration
   `histogram_quantile(0.9, sum by (le) (rate(http_request_duration_seconds_bucket[10m])))`
4. Saturation: Saturation
   `100 - (avg by (node) (irate(node_cpu_seconds_total{node="minikube"}[5m])) * 100)`
