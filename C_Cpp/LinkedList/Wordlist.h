// Wordlist.h

#pragma once

/////////////////////////////////////////////////////////////////////////
//
// Student Info
// ------------
//
// Name : Lucas Stolba
// St.# : 301555531
// Email: lsa125@sfu.ca
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
// Do not use any other #includes
//
#include "Wordlist_base.h"
#include <cassert>
#include <fstream>
#include <iostream>
#include <string>

using namespace std;

class Wordlist : public Wordlist_base
{
    //
    // Use this Node to implement the singly-linked list for the word list. You
    // can *add* extra variables/methods/features to this struct if you like,
    // but you must keep its name the same, and also keep the word, count, and
    // next variables as defined.
    //
private:
    struct Node // why cant we use map
    {
        string word = "";
        int count = 0;
        Node *next = nullptr;
        Node(){} //needs default constructor
        Node(string w) : word(w),count(1),next(nullptr) {} // makes for cleaner code
    };
    Node* head = nullptr;

    //calculate all these in constructor cause why not
    unsigned int numDifferentWords = 0, totalWords = 0, singletons = 0;
    //cant do most frequent because of duplicate case

public:
    Wordlist(){}
    Wordlist(string fileName) {
        ifstream myFile;
        myFile.open(fileName);
        if (myFile.is_open()) {
            //input one entry
            string curWord = "";
            while (myFile.good() && curWord.size() == 0) {
                myFile >> curWord;
            }
            if (curWord.size() == 0) return;

            head = new Node(curWord);
            ++numDifferentWords;
            ++singletons;
            ++totalWords;
            //input all entries into node->next
            Node* tail = head;
            while (myFile.good()) {
                //get valid word
                curWord = "";
                while (myFile.good() && curWord.size() == 0) {
                    myFile >> curWord;//make sure if the file has \n\n word wont be ""
                }
                if (curWord.size() == 0) return;
                ++totalWords;//one word added
                if (curWord < head->word) { // case: add to front
                    ++numDifferentWords;
                    ++singletons;
                    Node* temp = head;
                    head = new Node(curWord);
                    head->next = temp;
                    continue;
                }
                //check for duplicates
                Node* dup = head;
                while (dup) {
                    if (dup->word == curWord) {//case: dup found
                        if (dup->count == 1) {
                            --singletons;//remove a singleton
                        }
                        ++dup->count;//add one to word count
                        break;
                    } // case: word is inbetween two nodes
                    if (dup->next && dup->word < curWord && curWord < dup->next->word) {
                        ++numDifferentWords;
                        ++singletons;
                        Node* temp = dup->next;
                        dup->next = new Node(curWord);
                        dup->next->next = temp;
                        break;
                    }
                    dup = dup->next;
                }//case: add to tail
                if (!dup) { // add to back
                    ++numDifferentWords;
                    ++singletons;
                    tail->next = new Node(curWord);
                    tail = tail->next;
                }
            }
        }
    }
    // Virtual destructor: de-allocate all memory allocated by the class.
    ~Wordlist() override { 
        while (head) {
            Node* temp = head;
            head = head->next;
            delete temp;
        } 
    }

    //
    // Returns the number of times w occurs as a word in the list.
    //
    int get_count(const string& w) const override {
        Node* it = head;//iterator

        while (it) {
            if (w == it->word) {
                return it->count;
            }
            it = it->next;
        }
        return 0; // none found
    }

    //
    // Returns the number of nodes in the list.
    //
    int num_different_words() const override {
        return numDifferentWords;
    }

    //
    // Returns the total number of words in the list, i.e. the sum of the word
    // counts.
    //
    int total_words() const override {
        return totalWords;
    }

    //
    // Returns true if the words in the list are in ascending sorted order,
    // false otherwise.
    //
    bool is_sorted() const override{
        if (head) {
            Node* first = head;//iterator
            Node* second = first->next;
            while (first && second) {
                if (first->word >= second->word) {
                    return false;
                }
                first = first->next;
                second = second->next;
            }
            return true;
        }
        return true;
    }

    //
    // Returns a string of the most frequent word in the format "word freq".
    // E.g. if the most frequent word is "the" with count 5437, then "the 5437"
    // is returned. If there is a tie, the first word in the list is returned.
    //
    string most_frequent() const override {
        int highest = 0;
        string hWord = "";
        Node* it = head;
        while (it) {
            if (it->count > highest) {
                highest = it->count;
                hWord = it->word;
            }
            it = it->next;
        }
        hWord += " " + to_string(highest);
        return hWord;
    }

    //
    // Returns the number of nodes with count 1.
    //
    int num_singletons() const override {
        return singletons;
    }

    //
    // Adds w to the word list. If w is already in the list, then increment its
    // count, otherwise add a new Node (with count 1) at the alphabetically
    // correct location.
    //

    //copied from constructor
    void add_word(const string& curWord) {
        ++totalWords;
        if(!head){
            head = new Node(curWord);
            ++numDifferentWords;
            ++singletons;
        }else{
            if (curWord < head->word) { // add to front
                ++numDifferentWords;
                ++singletons;
                Node* temp = head;
                head = new Node(curWord);
                head->next = temp;
                return;
            }
            //check for duplicates
            Node* dup = head;
            while (dup) {
                if (dup->word == curWord) {
                    if (dup->count == 1) {
                        --singletons;
                    }
                    ++dup->count;
                    break;
                }
                if (dup->next && dup->word < curWord && curWord < dup->next->word) { //insert
                    ++numDifferentWords;
                    ++singletons;
                    Node* temp = dup->next;
                    dup->next = new Node(curWord);
                    dup->next->next = temp;
                }
                if (!dup->next) {
                    ++numDifferentWords;
                    ++singletons;
                    dup->next = new Node(curWord);
                    return;
                }
                dup = dup->next;
            }
        }
    }
    //
    // Prints the words in the list in ascending sorted order with their counts.
    // The first word is 1, the second 2, and so on, e.g.:
    //
    //   ❯ ./a1_sol < small.txt
    //   1. {"This", 1}
    //   2. {"a", 2}
    //   3. {"is", 2}
    //   4. {"or", 1}
    //   5. {"test", 1}
    //   6. {"test?", 1}
    //   7. {"this", 1}
    //
    void print_words() const override {
        Node* it = head;
        int count = 0;
        while (it) {
            cout << ++count << ". {\"" << it->word << "\", " << it->count << "}\n";
            it = it->next;
        }
    }
}; // class Wordlist

//
// ... you can write helper functions here (or before Wordlist) if you need them
// ...
//

//
// ... write functions to test every method of Wordlist ...
//
