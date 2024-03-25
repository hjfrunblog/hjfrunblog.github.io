# map, filter and reduce

```js
// What is map()?

const nums = [1, 2, 3, 4]

const multiplyByThree = nums.map(num => num * 3)

console.log(multiplyByThree) // [3, 6, 9, 12]

// What is filter()?

const evenNums = nums.filter(num => num % 2 === 0)
console.log(evenNums) // [2, 4]

// What is reduce()?

const sum = nums.reduce((acc, cur) => acc + cur, 0)
console.log(sum) // 10
```

## map() and foreach()

map() 返回新的数组，可以继续 chain 其他的函数，如 filter。foreach() 数组原地操作，不产生新的数据，其返回值无意义。

```js
const arr = [2, 5, 3, 4, 7]

const mapRes = arr.map(item => {
  return item + 2
})

const foreachRes = arr.forEach(item => {
  return item + 2
})

// { mapRes: [ 4, 7, 5, 6, 9 ], foreachRes: undefined }
console.log({ mapRes, foreachRes })

const foreachRes2 = arr.forEach((item, i) => {
  arr[i] = item + 3
})

// { arr: [ 5, 8, 6, 7, 10 ], foreachRes2: undefined }
console.log({ arr, foreachRes2 })
```

```js
// Question 1 - Return only name of students in Capital

let students = [
  {
    name: 'Piyush',
    rollNumber: 31,
    marks: 80
  },
  {
    name: 'Jenny',
    rollNumber: 15,
    marks: 69
  },
  {
    name: 'Kaushal',
    rollNumber: 16,
    marks: 35
  },
  {
    name: 'Dilpreet',
    rollNumber: 7,
    marks: 55
  }
]

let names = students.map(student => student.name.toUpperCase())
// { names: [ 'PIYUSH', 'JENNY', 'KAUSHAL', 'DILPREET' ] }
console.log({ names })

let names2 = []

for (let i = 0; i < students.length; i++) {
  names2.push(students[i].name.toUpperCase())
}
console.log({ names2 })

// Question 2 - Return only details of students who have scored more than 50 marks

let students2 = students.filter(student => student.marks > 50)

/**
 * {
  students2: [
    { name: 'Piyush', rollNumber: 31, marks: 80 },
    { name: 'Jenny', rollNumber: 15, marks: 69 },
    { name: 'Dilpreet', rollNumber: 7, marks: 55 }
  ]
}
 */
console.log({ students2 })

// Question 3 - Return more than 60 marks and rollNumber is greater than 15

const students3 = students.filter(
  student => student.marks > 60 && student.rollNumber > 15
)

// { students3: [ { name: 'Piyush', rollNumber: 31, marks: 80 } ] }
console.log({ students3 })

// Question 4: Sum of all marks
const total = students.reduce((acc, student) => acc + student.marks, 0)
// { total: 239 }
console.log({ total })

// Question 5: Return only name of students who have scored more than 60 marks
const students4 = students
  .filter(student => student.marks > 60)
  .map(student => student.name)
console.log({ students4 }) // { students4: [ 'Piyush', 'Jenny' ] }
```
