# LINQ

Language-Integrated Query.

## 用法

### 基础用法

```cs
int[] numbers = { 0, 1, 2, 3, 4, 5, 6 };

var numQuery =
    from num in numbers
    where (num % 2) == 0
    select num;

foreach (int num in numQuery)
{
    Console.WriteLine("{0,1}", num);
}

```

### Take

```cs
int[] grades = { 59, 82, 70, 56, 92, 98, 85 };

IEnumerable<int> topThreeGrades = grades.OrderByDescending(grade => grade).Take(3);
Console.WriteLine("The top 3 grades are: ");
foreach (int grade in topThreeGrades)
{
    Console.WriteLine(grade);
}

```
