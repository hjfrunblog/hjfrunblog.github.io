# C# 基础

## 语法

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

### 4. TryParse

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
