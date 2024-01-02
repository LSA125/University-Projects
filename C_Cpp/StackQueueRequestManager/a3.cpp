// a3.cpp
//why are all the classes in a3.cpp its going to be unreadable
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
// Do not #include any other files!
//
#include "Announcement.h"
#include "JingleNet_announcer.h"
#include "Queue_base.h"
#include <fstream>
#include <iostream>
#include <string>

using namespace std;

template<typename T> class queue : Queue_base<T> { // i add to head and remove from tail
    private:
        struct Node {
            T val;
            Node* next;
            Node* prev;
        };
        Node* head, *tail;
        int s;
    public:
        queue() : head(nullptr), tail(nullptr), size(0) {}

        int size() const override {
            return s;
        }

        void enqueue(const T& item) override {
            if (!head) {
                head = new Node{ item,nullptr,nullptr };
                tail = head;
            }
            else {
                Node* temp = head;
                head = new Node{ item,temp,nullptr };
                temp->prev = head;
            }
            ++s;
        }

        const T& front() const override {
            return tail->val;
        }

        void dequeue() override {
            if (s == 0) {
                return;
            }
            if (s == 1) {
                delete head;
                head = tail = nullptr;
            }
            else {
                tail = tail->prev;
                delete tail->next;
                tail->next = nullptr;
            }
            --s;
            return;
        }
        bool isEmpty() {
            return s == 0;
        }
        ~queue() {
            while (s > 0) {
                dequeue();
            }
        }
};

class JingleNet {
private:
    static const int numRanks = 5;
    queue<Announcement> data[numRanks]; //santa[0]->reindeer->elf2->elf1->snowman[4]
    ofstream outfile;
public:
    JingleNet() {
        outfile.open("announcements.txt", ios::trunc);
        if (!outfile.good()) { //if output file didnt create, stop program
            throw bad_exception();
        }
    }

    void enqueue(Announcement in) {
        switch (in.get_rank()) {
            case(Rank::SANTA):data[0].enqueue(in);break;
            case(Rank::REINDEER):data[1].enqueue(in);break;
            case(Rank::ELF2):data[2].enqueue(in);break;
            case(Rank::ELF1):data[3].enqueue(in);break;
            case(Rank::SNOWMAN):data[4].enqueue(in);break;
        }
    }

    void removeAll() {
        for (int x = 0; x < numRanks;++x) {
            while (!data[x].isEmpty()) {
                data[x].dequeue();
            }
        }
    }

    void announce(unsigned int n) {
        int prio = 0;
        for (int x = 0; x < n; ++x) {
            //if queue is empty, go to the next non-empty queue, if all are empty return
            while (data[prio].isEmpty()) {
                if (prio < numRanks) {
                    ++prio;
                }
                else {
                    return;
                }
            }

            //print announcement
            outfile << data[prio].front().get_text() << '\n';
            data[prio].dequeue();
        }
    }

    void promotion() {
        for (int x = 1; x < numRanks;++x) {
            while (!data[x].isEmpty()) {
                data[x - 1].enqueue(data[x].front());
                data[x].dequeue();
            }
        }
    }

    ~JingleNet() {
        removeAll();
        outfile.close();
    }
};

//functions for processing file
void processFile(string fileName);

int main(int argc, char* argv[])
{
    if (argc < 2) { //no file means nothing to do
        return 1;
    }

    for (int x = 1; x < argc;++x) {
        processFile(argv[x]);
    }
}


void processFile(string fileName) {
    
}