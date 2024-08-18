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
