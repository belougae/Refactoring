# Refactoring
《重构》:改善既有代码的设计实践（javascript）<Refactoring>: Improving the Design of Existing Code

这里是《重构》javascript 这本📚的代码实践。


- 如果你要给程序添加一个特性，但发现代码因缺乏良好的结构而不易于进行更改，那就先重构那个程序，使其比较容易添加该特性，然后再添加该特性；
- 我再强调一次，是需求的变化使重构变得必要。如果一段代码能正常工作，并且不会再被修改，那么完全可以不去重构它。能改进之当然很好，但若没人需要去理解它，它就不会真正妨碍什么。如果确实有人需要理解它的工作原理，并且觉得理解起来很费劲，那你就需要改进一下代码了；
- 重构前，先检查自己是否有一套可靠的测试集。这些测试必须有自我检验能力；
- 好代码的检验标准就是人们是否能轻而易举地修改它；
- 让函数小而美，争取10行以内；
- 关注有注释的地方，通常可以把提炼出新函数；
- 条件表达式和循环也可提炼出函数，switch 的每一个分支都值得化为一个函数；
- 

摘录来自: 马丁·福勒(Martin Fowler). “重构：改善既有代码的设计（第2版）。” Apple Books. 
