# 一些 shell 脚本

## 递归删除所有.DS_Store

```shell
find . -name '.DS_Store' -type f -delete
```

## 统一去除文件名的前缀

```shell
for file in prefix*; do mv "$file" "${file#prefix}"; done;
```

The for loop iterates over all files with the prefix. The do removes from all those files iterated over the prefix.

Here is an example to remove "bla\_" form the following files:

```console
bla_1.txt
bla_2.txt
bla_3.txt
blub.txt
```

Command

```shell
for file in bla_*; do mv "$file" "${file#bla_}";done;
```

Result in file system:

```console
1.txt
2.txt
3.txt
blub.txt
```

## 其他重命名

### 添加后缀

```shell
for file in *; do mv "$file" "$(basename "$file")yourSuffix"; done;
```

Example to add an underscore "\_" at the end each text file:

```shell
for file in *.txt; do mv "$file" "$(basename "$file")_"; done;
```

### 添加前缀

```shell
for file in *.txt; do mv "$file" "yourPrefix$file"; done;
```

Example to add an underscore "\_" in front of text each file name:

```shell
for file in *.txt; do mv "$file" "_$file"; done;
```

_Make sure you run those commands in Bash shell._

### 使用 find 添加后缀

```shell
find . -type f -exec bash -c 'mv $0 $0yourSuffix' {} \;
```

Example to add an underscore "\_" at the end each text file:

```shell
find . -type f -exec bash -c 'mv $0 $0_' {} \;
```

### 使用 find 添加前缀

```shell
find . -type f -exec bash -c 'mv $0 yourPrefix$0' {} \;
```

Example to add an underscore "\_" in front of text each file name:

```shell
find . -type f -exec bash -c 'mv $0 _$0' {} \;
```

_This will run in any shell and you can easily define the set of files that should be renamed by using the name or iname parameter for find._
