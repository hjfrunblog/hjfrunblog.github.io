# C# 基础

## 执行控制

### 1. switch

```cs
Console.WriteLine("Enter a day of the week: ");
int day = Convert.ToInt32(Console.ReadLine());

switch(day)
{
    case 1:
        Console.WriteLine("Monday");
        break;
    case 2:
        Console.WriteLine("Tuesday");
        break;
    default:
        Console.WriteLine("Invalid day");
        break;
}
```

### 2. for loop

```cs
Console.WriteLine("What do you want to repeat?: ");
string message = Console.ReadLine();

Console.WriteLine("How many times do you want to repeat it?: ");
int loopCount = int.Parse(Console.ReadLine());

if (loopCount < 0)
{
    Console.WriteLine("Invalid number of times to repeat.");
    return;
} else
{
    for (int i = 0; i < loopCount; i++)
    {
        Console.WriteLine(message);
    }
}
```

### 3. while

```cs
string numberA = Console.ReadLine();
string numberB = Console.ReadLine();
int a = int.Parse(numberA);
int b = int.Parse(numberB);
int sum = a + b;
int answer = 0;

Console.WriteLine("The sum of " + a + " and " + b + "is ?");
while (answer != sum)
{
    string input = Console.ReadLine();
    answer = int.Parse(input);
    if (answer != sum)
    {
        Console.WriteLine("Try again!");
    }
}
Console.WriteLine("Correct!");
```

## string

### 1. TryParse

```cs
Console.Write("Enter a number: ");
string numInput = Console.ReadLine();

if (int.TryParse(numInput, out int num))
{
    Console.WriteLine("You entered: " + num);
}
else
{
    Console.WriteLine("Invalid input");
}
```

### 2. @ - Verbatim string literal

```cs
string path = "C:\\Users\\User\\Desktop\\MyFolder\\MyFile.txt";
Console.WriteLine("Path: " + path);

string path2 = @"C:\Users\User\Desktop\MyFolder\MyFile.txt";
Console.WriteLine("Path2: " + path2);
```

### 3. string formatting

```cs
string name = "Jason";
int age = 25;
Console.WriteLine("Hello, my name is " + name + " and I am " + age + " years old.");
Console.WriteLine("Hello, my name is {0} and I am {1} years old.", name, age);
Console.WriteLine($"Hello, my name is {name} and I am {age} years old.");
Console.WriteLine(string.Concat("Hello, my name is ", name, " and I am ", age, " years old."));

string[] names = new string[] { "Jason", "John", "Jane" };
Console.WriteLine(string.Join(", ", names));
Console.WriteLine(string.Concat(names));
```

### 4. string equal

```cs
string message1 = "Hello World!";
string message2 = "Hello World!";

if (message1.Equals(message2))
{
    Console.WriteLine("The two strings are equal.");
}
else
{
    Console.WriteLine("The two strings are not equal.");
}
```

### 5. string reverse

```cs
string message = Console.ReadLine();
for (int i = 0; i < message.Length; i++)
{
    Console.Write(message[message.Length - i - 1]);
}
```

## Array

### 1. basic

```cs
const int angleCount = 3;
int[] angles = new int[angleCount];
int angleSum = 0;

for (int i = 0; i < angleCount; i++)
{
    Console.Write($"Enter angle {i + 1}: ");
    angles[i] = int.Parse(Console.ReadLine());
    angleSum += angles[i];
}

Console.WriteLine(angleSum == 180 ? "The triangle is valid." : "The triangle is not valid.");
```

### 2. Sort

```cs
int[] numbers = new int[] { 1, 3234, 542, 652, 462, 42, 642, 4243 };
Array.Sort(numbers);
foreach(int num in numbers)
{
    Console.Write($"{num} ");
}
```

### 3. Reverse

```cs
int[] numbers = new int[] { 1, 4, 23, 25, 5, 8 };
Array.Reverse(numbers);
foreach(var item in numbers)
{
    Console.Write($"{item} ");
}
```

### 4. Clear

```cs
int[] numbers = new int[] { 1, 4, 23, 25, 5, 8 };
Array.Clear(numbers, 0, numbers.Length);
foreach(var item in numbers)
{
    Console.Write($"{item} ");
}
```

### 5. IndexOf

```cs
int[] numbers = new int[] { 1, 4, 23, 25, 5, 8 };
Console.WriteLine("Enter a number to search for in the array: ");
int search = int.Parse(Console.ReadLine());

int pos = Array.IndexOf(numbers, search);
if (pos != -1)
{
    Console.WriteLine($"The number {search} is at position {pos + 1}");
} else
{
    Console.WriteLine("The number is not in the array");
}
```

## List

```cs
int[] numbers = new int[3] { 1, 2, 3 };

List<int> listNumbers = new List<int>();
listNumbers.Add(1);
listNumbers.Add(2);
listNumbers.Add(3);

List<int> listNumbers2 = new List<int>() { 23, 14, 2, 31, 54 };

foreach(var item in listNumbers)
{
    Console.Write(item + " ");
}
```

## Dictionary

```cs
Dictionary<int, string>names = new Dictionary<int, string>();
names.Add(1, "John");
names.Add(2, "Jane");
names.Add(3, "Jack");

foreach (KeyValuePair<int, string> name in names)
{
    Console.WriteLine("Key: {0}, Value: {1}", name.Key, name.Value);
}

Dictionary<string, string> teachers = new Dictionary<string, string>
{
    { "Math", "Mr. Smith" },
    { "Science", "Mrs. Johnson" },
    { "History", "Mr. Brown" }
};

if (teachers.ContainsKey("Math"))
{
    Console.WriteLine("Math teacher is {0}", teachers["Math"]);
}

if (teachers.TryGetValue("Science", out string scienceTeacher))
{
    Console.WriteLine("Science teacher is {0}", scienceTeacher);
}
```

## Exception

### 1. try-catch

```cs
try
{
    Console.WriteLine("Enter a number: ");

    int number = Convert.ToInt32(Console.ReadLine());
    Console.WriteLine(number);
}
catch(OverflowException)
{
    Console.WriteLine("Number is too big or too small!");
}
catch (FormatException)
{
    Console.WriteLine("Please enter a number!");
}
catch (Exception)
{
    Console.WriteLine("Something has went wrong!");
}
```

### 2. print error messages

```cs
try
{
    Console.WriteLine("Enter a number: ");

    int number = Convert.ToInt32(Console.ReadLine());
    Console.WriteLine(number);
}
catch (Exception e)
{
    Console.WriteLine($"Something has went wrong!: {e.Message}");
}
```
