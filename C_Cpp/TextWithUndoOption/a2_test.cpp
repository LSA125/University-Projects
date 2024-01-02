// a2_test.cpp

#include "Stringlist.h"
#include <cassert>

using namespace std;

int main() {
    Stringlist a;
    a.insert_back("A");
    a.insert_back("B");
    a.insert_back("C");
    cout << a << endl;
    a.undo();
    a.undo();
    cout << a << endl;
    a.insert_back("A");
    a.insert_back("B");
    a.insert_back("C");
    cout << a << endl;
    a.remove_all();
    a.undo();
    a.remove_at(2);
    a.undo();
    cout << a << endl;
    Stringlist b;
    b.insert_back("a");
    a = b;
    cout << a << endl;
    a.undo();
    cout << a << endl;
    
    a.set(1, "PENIS");
    cout << a << endl;
    a.undo();
    cout << a << endl;
    a.undo();
    a.undo();
    a.undo();
    a.undo();
    a.undo();
}