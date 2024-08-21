# 找第二大的数

Q: ar1[] = {-2, 1, -3, 7, -1, 2, 10, -5, 4}, Find the second largest number and sum from the given integers

```cs

using System;

class Program
{
    static void Main()
    {
        int[] ar1 = {-2, 1, -3, 7, -1, 2, 10, -5, 4};

        if (ar1.Length < 2)
        {
            Console.WriteLine("Array should have at least two elements.");
            return;
        }

        int largest = int.MinValue;
        int secondLargest = int.MinValue;
        int sum = 0;

        foreach (int num in ar1)
        {
            sum += num;

            if (num > largest)
            {
                secondLargest = largest;
                largest = num;
            }
            else if (num > secondLargest && num != largest)
            {
                secondLargest = num;
            }
        }

        Console.WriteLine("Second Largest Number: " + secondLargest);
        Console.WriteLine("Sum of All Numbers: " + sum);
    }
}
```
