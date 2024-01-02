#ifndef A4_BIRTHDAYLIB_HPP
#define A4_BIRTHDAYLIB_HPP

#include <string>
#include <iostream>
using namespace std;

//the structure used for holding one birthday entry
typedef struct {
    short year;
    short month;
    short day;
    string name;
    string knownFor;
} Birthday;

//Creates a Birthday struct variable storing three short representing 
// year, month, and day respectively, a string representing a name,
// and a string representing a trait (knownFor)
//Returns the address of the dynamically (i.e., uses malloc) created variable
//For example:
//Given the code:
//Birthday* person = create_Birthday(1985, 1, 1, 
//                                      "J. Edgar Hoover",
//                                      "First director of the FBI");
//cout << person->year << "-" << person->month << "-" << person->day << endl
//<< person->name << endl << person->knownFor;
//will result in an output like this:
//1985-1-1
//J. Edgar Hoover
//First director of the FBI
Birthday* create_Birthday(short year, short month, short day,
                            string name, string knownFor);

//Releases the memory created to store the 2 members name and knownFor using
// the address of a Birthday struct variable
//Note that the person parameter can be NULL
// and if this is the case the function should do nothing.
//This function now also releases the memory used for the Birthday struct variable,
// and since string is used there really is no need to handle name and knownFor
void delete_Birthday(Birthday* person);

//helper function printing a Birthday struct variable nicely
void print_Birthday(Birthday* person, ostream& os);

//helper function for comparing birthdays by month and day
//-ve means p1 is "smaller" than p2, +ve means the other way
//0 means they are "the same"
int compareBirthdaysByMD(const Birthday* p1, const Birthday* p2);

//see if two birthdays are the same
bool cmpBday(const Birthday* p1, const Birthday* p2);

#endif