# JavaScript 里的反直觉

## `[] == ![]` 的结果是什么？并解释

以下结果由 GitHub Copilot 提供

::: tip 解释
In JavaScript, the expression [] == ![] evaluates to true. Here's why:

1. ![] is a logical NOT operation on an empty array. In JavaScript, an empty array is a truthy value, so ![] returns false.
2. Now the expression becomes [] == false. In JavaScript, when comparing an object (including arrays) with a boolean, the object is first converted to a string and then to a number, and the boolean is also converted to a number.
3. The empty array [] becomes an empty string "" when converted to a string. When this empty string is converted to a number, it becomes 0.
4. false is converted to 0 when it's converted to a number.
5. Now the comparison is 0 == 0, which is true.

So, [] == ![] is true in JavaScript due to type coercion during the comparison.
:::
