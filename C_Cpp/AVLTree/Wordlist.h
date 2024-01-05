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

//
// IMPORTANT: no global variables are permitted in this file!
//
// It is okay to define helper functions defined outside the class.
//

class Wordlist : public Wordlist_base
{
private:
    //
    // Use this Node to implement an AVL tree for the word list. You can *add*
    // extra variables/methods/features to this struct if you like, but you must
    // keep its name the same, and also keep the word, count, left, and right
    // variables as defined.
    //
    struct Node
    {
        string word;
        int count;
        int height;
        Node* left;
        Node* right;
        Node(string w) : word(w), count(1), height(1),left(nullptr),right(nullptr){}
    };

    Node* root = nullptr;

    int num_different_words_rec(Node* node) const {
        if (node) {
            //all nodes in left tree + all nodes in right tree + current node
            return num_different_words_rec(node->left) + num_different_words_rec(node->right) + 1;
        }
        //if node is null return 0
        return 0;
    }

    Node* most_frequent_rec(Node* node) const {
        if (!node) // check if cur node exists
            return nullptr;
        //get most frequent of left and right trees
        Node* tempL = most_frequent_rec(node->left), * tempR = most_frequent_rec(node->right);
        //how many times they occur
        int valL = 0, valR = 0;
        if (tempL) // if temp is valid, put count into value
            valL = tempL->count;
        if (tempR)
            valR = tempR->count;

        //if valL is greatest
        if (valL >= valR && valL >= node->count) {
            return tempL;
        }
        else //if valR is greatest
            if (valR >= valL && valR >= node->count) {
                return tempR;
            }
            else { // if current node is greatest
                return node;
            }
    }

    int num_singletons_rec(Node* node) const {
        //base return 0
        if (!node)
            return 0;
        // return val of right and left trees + 1 if the cur node is a singleton
        return num_singletons_rec(node->left)
            + num_singletons_rec(node->right) + (node->count == 1 ? 1 : 0);
    }

    int total_words_rec(Node* node) const {
        if (node) {
            //all nodes in left tree + all nodes in right tree + current node
            return total_words_rec(node->left) + total_words_rec(node->right) + node->count;
        }
        //if node is null return 0
        return 0;
    }

    bool is_sorted_rec(Node* node, Node*& prev) const {
        if (!node) //base: return true
            return true;
        //go all the way left, if its false, no check necessary
        if (!is_sorted_rec(node->left, node))
            return false;
        //visit node, check condition(check top of func), make sure prev is valid
        if (prev && prev->word >= node->word)
            return false;
        //set prev and continue
        prev = node;
        //go right
        return is_sorted_rec(node->right, node);
    }

    //helper functions:
    //based off: https://www.geeksforgeeks.org/insertion-in-an-avl-tree/
    int height(Node* node) {
        if (node) {
            return node->height;
        }
        return 0;
    }

    int getBalance(Node* node)
    {
        if (node == nullptr)
            return 0;
        return height(node->left) - height(node->right);
    }

    Node* lRotate(Node* x) {
        Node* y = x->right;
        Node* T2 = y->left;

        //rotate
        y->left = x;
        x->right = T2;

        //update height
        x->height = max(height(x->left), height(x->right)) + 1;
        y->height = max(height(y->left), height(y->right)) + 1;

        //return new root
        return y;
    }
    Node* rRotate(Node* y) {
        Node* x = y->left;
        Node* T2 = x->right;

        // Perform rotation
        x->right = y;
        y->left = T2;

        // Update heights
        y->height = max(height(y->left), height(y->right)) + 1;
        x->height = max(height(x->left), height(x->right)) + 1;

        // Return new root
        return x;
    }
    Node* add_word_rec(Node* node, const string& w) {
        /* 1. Perform the normal BST insertion */
        if (node == NULL)
            return(new Node(w));

        if (w < node->word)
            node->left = add_word_rec(node->left, w);
        else if (w > node->word)
            node->right = add_word_rec(node->right, w);
        else { // If equal add to count
            ++node->count;
            return node;
        }
        /* 2. Update height of this ancestor node */
        node->height = 1 + max(height(node->left),
            height(node->right));

        /* 3. Get the balance factor of this ancestor
            node to check whether this node became
            unbalanced */
        int balance = getBalance(node);

        // If this node becomes unbalanced, then
        // there are 4 cases

        // Left Left Case
        if (balance > 1 && w < node->left->word)
            return rRotate(node);

        // Right Right Case
        if (balance < -1 && w > node->right->word)
            return lRotate(node);

        // Left Right Case
        if (balance > 1 && w > node->left->word)
        {
            node->left = lRotate(node->left);
            return rRotate(node);
        }

        // Right Left Case
        if (balance < -1 && w < node->right->word)
        {
            node->right = rRotate(node->right);
            return lRotate(node);
        }

        /* return the (unchanged) node pointer */
        return node;
    }
    void deleteTree(Node* node) {
        if (node) {
            deleteTree(node->left);
            deleteTree(node->right);
            delete node;
        }
    }
    //has variable count passed to all recursive calls,
    //increases by 1 each time there is a print
    void print_words_rec(Node* node, int& count) const {
        if (node) {
            print_words_rec(node->left, count);
            cout << ++count << ". {\"" << node->word << "\", " << node->count << "}\n";
            print_words_rec(node->right, count);
        }
    }
public:

    //
    // IMPORTANT: root is the only variable that can be defined in this class.
    // It should point to the top node of your AVL tree. When root == nullptr,
    // the tree is empty.
    //
    // No variables other than root are permitted!
    //
        //
    // Virtual destructor: de-allocate all memory allocated by the class.
    //
    Wordlist(){}
    Wordlist(string fileName) {
        ifstream myFile(fileName);
        string temp;
        while (myFile.good()) {
            myFile >> temp;
            add_word(temp);
        }
    }
    ~Wordlist() {
        deleteTree(root);
    }

    //
    // Returns the number of times w occurs as a word in the word list.
    //
    virtual int get_count(const string& target) const {
        if (root) {
            //traverse list
            Node* temp = root;
            while (temp) {
                if (temp->word == target) {// when found return count
                    return temp->count;
                }
                if (target < temp->word) { //if target is less, go left
                    temp = temp->left;
                }
                else { //otherwise go right
                    temp = temp->right;
                }
            }
        }
        return 0;//if not found return 0
    }

    //
    // Returns true if w is in the word list, false otherwise.
    //
    bool contains(const string& w) const
    {
        return get_count(w) > 0;
    }

    //
    // Returns the number of nodes in the word list.
    //

    int num_different_words() const override {
        return num_different_words_rec(root);
    }

    //
    // Returns the total number of words in the word list, i.e. the sum of the
    // word counts.
    //
    int total_words() const override {
        return total_words_rec(root);
    }

    //
    // Returns true if the words in the word list are in ascending sorted order,
    // false otherwise.
    //
    // For an AVL implementation, this should return true if the AVL tree is a
    // BST, and false otherwise.
    //
    //does inorder search and makes sure the previous is always less than current
    //very important that prev is passed by reference when returning, prev gets updated
    //I solved a similar problem in leetcode 6 months ago:
    //https://leetcode.com/LStolba/
    //my solution was based off of:
/*
https://leetcode.com/problems/validate-binary-search-tree/
solutions/32104/c-in-order-traversal-and-please-
do-not-rely-on-buggy-int-max-int-min-solutions-any-more/
*/

    bool is_sorted() const override {
        Node* prev = nullptr;
        return is_sorted_rec(root,prev);
    }

    //
    // Returns a string of the most frequent word in the format "word freq".
    // E.g. if the most frequent word is "the" with count 5437, then "the 5437"
    // is returned. 
    //
    // If there is a tie, the first word in the list is returned. For an AVL
    // implementation, this means return the word that occurs first
    // alphabetically.
    //
    // Assumes the list is not empty.
    //
    string most_frequent() const override {
        Node* temp = most_frequent_rec(root);
        return temp->word + " " + to_string(temp->count);
    }

    //
    // Returns the number of nodes with count 1.
    //
    int num_singletons() const override {
        return num_singletons_rec(root);
    }

    //
    // Adds w to the word list. If w is already in the word list, then increment
    // its count. Otherwise add a new Node (with count 1) at the alphabetically
    // correct location for the word.
    //

    void add_word(const string& w) override {
        root = add_word_rec(root, w);
    }

    //
    // Prints the words in the word list in alphabetical order by word, along
    // with their counts. The first word is 1, the second 2, and so on, e.g.:
    //
    //   ❯ ./a5_main < small.txt
    //   1. {"This", 1}
    //   2. {"a", 2}
    //   3. {"is", 2}
    //   4. {"or", 1}
    //   5. {"test", 1}
    //   6. {"test?", 1}
    //   7. {"this", 1}
    //
    void print_words() const override {
        int count = 0;
        print_words_rec(root,count);
    }
}; // class Wordlist

//
// Make sure to thoroughly test your code as you go!
//
