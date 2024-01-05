// a5_main.cpp

#include "Wordlist.h"

//
// test_read() is a helper function that reads words, one at a time, from cin,
// into a Wordlist and print the stats. You can use it to help test your
// Wordlist class, e.g.:
//
//    > make a5_main
//    g++ -std=c++17 -Wall -Wextra -Werror -Wfatal-errors -Wno-sign-compare -Wnon-virtual-dtor -g   a5_main.cpp   -o a5_main
//   
//    > ./a5_main < tiny_shakespeare.txt
//    Number of different words: 25670
//        Total number of words: 202651
//           Most frequent word: the 5437
//         Number of singletons: 14919 (58%)
//

void test_read()
{
    Wordlist lst;
    string w;
    for (int x = 0; x < 5; ++x)
    {
        cin >> w;
        lst.add_word(w);
    }

    lst.print_stats();
}

int main()
{
    Wordlist lst("tiny_shakespeare.txt");
    lst.print_stats();
    lst.print_words();
}
