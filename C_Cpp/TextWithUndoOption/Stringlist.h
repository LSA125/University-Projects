// Stringlist.h

/////////////////////////////////////////////////////////////////////////
//
// Student Info
// ------------
//
// Name : Lucas Stolba
// St.# : 301555531
// Email: lsa125
//
//
// Statement of Originality
// ------------------------
//
// All the code and comments below are my own original work. For any non-
// original work, I have provided citations in the comments with enough
// detail so that someone can see the exact source and extent of the
// borrowed work.
//
// In addition, I have not shared this work with anyone else, and I have
// not seen solutions from other students, tutors, websites, books,
// etc.
//
/////////////////////////////////////////////////////////////////////////

//
// Do not use any other #includes or #pragmas in this file.
//

#pragma once

#include <cassert>
#include <iostream>
#include <string>

using namespace std;

class Stringlist
{
    // stack stuffs
    struct ListNode {
        string val;
        ListNode* next;
    };
    struct {
    private:
        ListNode* head;
        int len = 0;
    public:
        void push(string in) {
            ListNode* temp = new ListNode{ in,head };
            head = temp;
            ++len;
        }
        string pop() {
            string out = "";
            if (len > 0) {
                ListNode* temp = head;
                out = head->val;
                head = head->next;
                delete temp;
                --len;
            }
            return out;
        }
        int size() {
            return len;
        }

    }myStack;

    int cap;     // capacity
    string* arr; // array of strings
    int sz;      // size
    bool isUser = true; //checks if function is called by undo or by user
    //
    // Helper function for throwing out_of_range exceptions.
    //
    void bounds_error(const string& s) const
    {
        throw out_of_range("Stringlist::" + s + " index out of bounds");
    }

    //
    // Helper function for checking index bounds.
    //
    void check_bounds(const string& s, int i) const
    {
        if (i < 0 || i >= sz)
            bounds_error(s);
    }

    //
    // Helper function for copying another array of strings.
    //
    void copy(const string* other)
    {
        for (int i = 0; i < sz; i++)
        {
            arr[i] = other[i];
        }
    }

    //
    // Helper function for checking capacity; doubles size of the underlying
    // array if necessary.
    //
    void check_capacity()
    {
        if (sz == cap)
        {
            cap *= 2;
            string* temp = new string[cap];
            for (int i = 0; i < sz; i++)
            {
                temp[i] = arr[i];
            }
            delete[] arr;
            arr = temp;
        }
    }

    string getToken(string& inp) {
        string out = "";
        int count = 0;
        for (auto it : inp) {
            ++count;
            if (it == ' ')
                break;
            out += it;
        }
        inp.erase(0, count);
        return out;
    }

public:
    //
    // Default constructor: makes an empty StringList.
    //
    Stringlist()
        : cap(10), arr(new string[cap]), sz(0)
    {
    }

    //
    // Copy constructor: makes a copy of the given StringList.
    //
    // Does *not* copy the undo stack, or any undo information from other.
    //
    Stringlist(const Stringlist& other)
        : cap(other.cap), arr(new string[cap]), sz(other.sz)
    {
        copy(other.arr);
    }

    //
    // destructor
    //
    ~Stringlist()
    {
        delete[] arr;
        while (myStack.size() > 0) {
            myStack.pop();
        }
    }

    //
    // Assignment operator: makes a copy of the given StringList.
    //
    // undoable
    //
    // For undoing, when assignment different lists, the undo stack is not
    // copied:
    //
    //    lst1 = lst2; // lst1 undo stack is updated to be able to undo the //
    //    assignment; lst1 does not copy lst2's stack
    //    //
    //    // lst2 is not change in any way
    //
    // Self-assignment is when you assign a list to itself:
    //
    //    lst1 = lst1;
    //
    // In this case, nothing happens to lst1. Nothing is changed. Both its
    // stirng data and undo stack are left as-is.
    //
    Stringlist& operator=(const Stringlist& other)
    {
        if (isUser) {
            string command = "__REPLACE";
            for (int x = 0; x < sz;++x) {
                command += " " + arr[x];
            }
            myStack.push(command);
        }
        if (this != &other)
        {
            delete[] arr;
            cap = other.capacity();
            arr = new string[cap];
            sz = other.size();
            copy(other.arr);
        }
        return *this;
    }

    //
    // Returns the number of strings in the list.
    //
    int size() const { return sz; }

    //
    // Returns true if the list is empty, false otherwise.
    //
    bool empty() const { return size() == 0; }

    //
    // Returns the capacity of the list, i.e. the size of the underlying array.
    //
    int capacity() const { return cap; }

    //
    // Returns the string at the given index.
    //
    string get(int index) const
    {
        check_bounds("get", index);
        return arr[index];
    }

    //
    // Returns the index of the first occurrence of s in the list, or -1 if s is
    // not in the lst.
    //
    int index_of(const string& s) const
    {
        for (int i = 0; i < sz; i++)
        {
            if (arr[i] == s)
            {
                return i;
            }
        }
        return -1;
    }

    //
    // Returns true if s is in the list, false otherwise.
    //
    bool contains(const string& s) const
    {
        return index_of(s) != -1;
    }

    //
    // Returns a string representation of the list.
    //
    string to_string() const
    {
        string result = "{";
        for (int i = 0; i < size(); i++)
        {
            if (i > 0)
                result += ", ";
            result += "\"" + get(i) + "\"";
        }
        return result + "}";
    }

    //
    // Sets the string at the given index.
    //
    // undoable
    //
    void set(int index, string value)
    {
        check_bounds("set", index);
        if (isUser) {
            string command = "__SET " + std::to_string(index) + " " + arr[index];
            myStack.push(command);
        }
        arr[index] = value;
    }

    //
    // Insert s before index; if necessary, the capacity of the underlying array
    // is doubled.
    //
    // undoable
    //
    void insert_before(int index, const string& s)
    {

        if (index < 0 || index > sz) // allows insert at end, i == sz
            bounds_error("insert_before");
        check_capacity();

        if (isUser) {
            string command = "__REMOVE " + std::to_string(index);
            myStack.push(command);
        }
        for (int i = sz; i > index; i--)
        {
            arr[i] = arr[i - 1];
        }
        arr[index] = s;
        sz++;
    }

    //
    // Appends s to the end of the list; if necessary, the capacity of the
    // underlying array is doubled.
    //
    // undoable
    //
    void insert_back(const string& s)
    {
        insert_before(size(), s);
    }

    //
    // Inserts s at the front of the list; if necessary, the capacity of the
    // underlying array is doubled.
    //
    // undoable
    //
    void insert_front(const string& s)
    {
        insert_before(0, s);
    }

    //
    // Removes the string at the given index; doesn't change the capacity.
    //
    // undoable
    //
    void remove_at(int index)
    {
        check_bounds("remove_at", index);
        if (isUser) {
            string command = "__INSERT " + std::to_string(index) + " " + arr[index];
            myStack.push(command);
        }
        for (int i = index; i < sz - 1; i++)
        {
            arr[i] = arr[i + 1];
        }
        sz--;
    }

    //
    // Removes all strings from the list; doesn't change the capacity.
    //
    // undoable
    //
    void remove_all()
    {
        if (isUser) {
            string command = "__END";
            myStack.push(command);
        }
        while (sz > 0)
        {
            remove_at(sz - 1);
        }
        if (isUser) {
            string command = "__START";
            myStack.push(command);
        }
    }

    //
    // Removes the first occurrence of s in the list, and returns true. If s is
    // nowhere in the list, nothing is removed and false is returned.
    //
    // undoable
    //
    bool remove_first(const string& s)
    {
        int index = index_of(s);
        if (index == -1)
            return false;
        remove_at(index);
        return true;
    }

    // //
    // // Removes all occurrences of s in the list, and returns the number of items
    // // removed.
    // //
    // // undoable
    // //
    // int remove_all(const string &s)
    // {
    //     int count = 0;
    //     for (int i = 0; i < sz; i++)
    //     {
    //         if (arr[i] == s)
    //         {
    //             remove_at(i);
    //             count++;
    //             i--;
    //         }
    //     }
    //     return count;
    // }

    //
    // Undoes the last operation that modified the list. Returns true if a
    // change was undone.
    //
    // If there is nothing to undo, does nothing and returns false.
    //
    bool undo()
    {
        if (myStack.size() <= 0) {
            return false;
        }
        isUser = false;
        string command = myStack.pop();
        string temp = getToken(command);
        if (temp == "__SET") {
            int i = stoi(getToken(command)); //get index
            temp = getToken(command); //get val
            set(i, temp);
        }
        else
            if (temp == "__INSERT") {
                int i = stoi(getToken(command)); //get index
                temp = getToken(command); //get val
                insert_before(i, temp);
            }
            else
                if (temp == "__START") { // go through commands until end is reached
                    command = myStack.pop();
                    temp = getToken(command);
                    while (temp != "__END" && myStack.size() > 0) {
                        getToken(command); //get index
                        temp = getToken(command); //get val
                        insert_back(temp);

                        command = myStack.pop();
                        temp = getToken(command);
                    }
                }
                else
                    if (temp == "__REPLACE") {
                        remove_all();
                        temp = getToken(command);
                        while (!temp.empty()) {
                            insert_back(temp);
                            temp = getToken(command);
                        }
                    }
                 else
                    if (temp == "__REMOVE") {
                        temp = getToken(command);
                        remove_at(stoi(temp));
                    }
        isUser = true;
        return true;
    }

}; // class Stringlist

//
// Prints list to in the format {"a", "b", "c"}.
//
ostream& operator<<(ostream& os, const Stringlist& lst)
{
    return os << lst.to_string();
}

//
// Returns true if the two lists are equal, false otherwise.
//
// Does *not* consider any undo information when comparing two Stringlists. All
// that matters is that they have the same strings in the same order.
//
bool operator==(const Stringlist& a, const Stringlist& b)
{
    if (a.size() != b.size())
    {
        return false;
    }
    for (int i = 0; i < a.size(); i++)
    {
        if (a.get(i) != b.get(i))
        {
            return false;
        }
    }
    return true;
}

//
// Returns true if the two lists are not equal, false otherwise.
//
// Does *not* consider any undo information when comparing two Stringlists.
//
bool operator!=(const Stringlist& a, const Stringlist& b)
{
    return !(a == b);
}
