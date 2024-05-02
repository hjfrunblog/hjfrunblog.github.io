# Kafka 概览

## 主要版本

- Apache Kafka
- Confluent Kafka

## Apache Kafka 使用

1. Start Zookeeper

   ```sh
   bin/zookeeper-server-start.sh config/zookeeper.properties
   ```

   Zookeeper: 2181

2. Start Kafka Server

   ```sh
   bin/kafka-server-start.sh config/server.properties
   ```

   Kafka Server / Broker: 9092

3. Create a Topic

   ```sh
   bin/kafka-topics.sh --bootstrap-server localhost:9092 --create --topic hjfrun-topic --partitions 3 --replication-factor 1
   // Created topic hjfrun-topic.
   ```

4. 查看当前所有 topics

   ```sh
   bin/kafka-topics.sh --bootstrap-server localhost:9092 --list
   ```

   ```sh
   hjfrun-topic
   jason-topic
   ```

5. 查看某个 topic

   ```sh
   bin/kafka-topics.sh --bootstrap-server localhost:9092 --describe --topic hjfrun-topic
   ```

   ```sh
   Topic: hjfrun-topic TopicId: lRxa4EWUR9OcE4Vr56H_zw PartitionCount: 3 ReplicationFactor: 1 Configs:
   Topic: hjfrun-topic Partition: 0 Leader: 0 Replicas: 0 Isr: 0
   Topic: hjfrun-topic Partition: 1 Leader: 0 Replicas: 0 Isr: 0
   Topic: hjfrun-topic Partition: 2 Leader: 0 Replicas: 0 Isr: 0
   ```

6. 创建 consumer

   ```sh
   bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic hjfrun-topic --from-beginning
   ```

7. 创建 producer 发布单条消息

   ```sh
   bin/kafka-console-producer.sh --broker-list localhost:9092 --topic hjfrun-topic
   ```

   **console 演示效果**
   ![producer-consumer](/tech/kafka-overview/producer-consumer.png)
   **Offset Explorer 查看结果**
   ![offset-explorer-result](/tech/kafka-overview/offset-explorer-result.png)

8. 通过文件发布多条消息

   ```sh
   bin/kafka-console-producer.sh --broker-list localhost:9092 --topic hjfrun-topic < /Users/jianfeng/Downloads/Australia.csv
   ```

## Confluent Kafka 使用

1. Start Zookeeper

   ```sh
   bin/zookeeper-server-start etc/kafka/zookeeper.properties
   ```

   Zookeeper: 2181

2. Start Kafka Server

   ```sh
   bin/kafka-server-start etc/kafka/server.properties
   ```

   Kafka Server / Broker: 9092

3. Create a Topic

   ```sh
   bin/kafka-topics --bootstrap-server localhost:9092 --create --topic confluent-hjfrun-topic --partitions 3 --replication-factor 1
   // Created topic confluent-hjfrun-topic.

   bin/kafka-topics --bootstrap-server localhost:9092 --create --topic confluent-jason-topic --partitions 3 --replication-factor 1                                                                                                                         ─╯
   // Created topic confluent-jason-topic.
   ```

4. 查看所有 topics

   ```sh
   bin/kafka-topics --bootstrap-server localhost:9092 --list
   ```

5. 描述 topics

   ```sh
   bin/kafka-topics --bootstrap-server localhost:9092 --describe --topic confluent-hjfrun-topic
   Topic: confluent-hjfrun-topic TopicId: H_vWMTqOT32DSqEMcUSLvQ PartitionCount: 3 ReplicationFactor: 1 Configs:
    Topic: confluent-hjfrun-topic Partition: 0 Leader: 0 Replicas: 0 Isr: 0
    Topic: confluent-hjfrun-topic Partition: 1 Leader: 0 Replicas: 0 Isr: 0
    Topic: confluent-hjfrun-topic Partition: 2 Leader: 0 Replicas: 0 Isr: 0
   ```

6. 创建 consumer

   ```sh
   bin/kafka-console-consumer --bootstrap-server localhost:9092 --topic confluent-hjfrun-topic --from-beginning
   ```

7. 创建 producer 发布消息

   ```sh
   bin/kafka-console-producer --broker-list localhost:9092 --topic confluent-hjfrun-topic
   ```

8. 发送 csv 数据到 kafka

   ```sh
   bin/kafka-console-producer --broker-list localhost:9092 --topic confluent-hjfrun-topic < /Users/jianfeng/Downloads/Australia.csv
   ```

## Apache Kafka without ZooKeeper

1. Generate a Cluster UUID

   ```sh
   KAFKA_CLUSTER_ID="$(bin/kafka-storage.sh random-uuid)"
   ```

2. Format Log Directories

   ```sh
   bin/kafka-storage.sh format -t $KAFKA_CLUSTER_ID -c config/kraft/server.properties
   ```

3. Start the Kafka Server

   ```sh
   bin/kafka-server-start.sh config/kraft/server.properties
   ```

4. 查看 meta data

   ```sh
   bin/kafka-metadata-quorum.sh --bootstrap-server localhost:9092 describe --status

   ClusterId:              mVgo5LTKRLqO9WnQGFXZJw
   LeaderId:               1
   LeaderEpoch:            1
   HighWatermark:          1330
   MaxFollowerLag:         0
   MaxFollowerLagTimeMs:   0
   CurrentVoters:          [1]
   CurrentObservers:       []

   bin/kafka-metadata-quorum.sh --bootstrap-server localhost:9092 describe --replication

   NodeId	LogEndOffset	Lag	LastFetchTimestamp	LastCaughtUpTimestamp	Status
   1     	2410        	0  	1714658720447     	1714658720447        	Leader
   ```
