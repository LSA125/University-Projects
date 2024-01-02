#include "a4_birthdayBST.hpp"
#include <fstream>//for files
#include <sstream>//for getting input from files
void loadFile(string,BirthdayBST&);
bool isEmpty(BirthdayBST&);

int main(){
    cout << "<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>\n";
    cout << "<><><><><><><><><>THE BIRTHDAY LOOKUP-INATOR<><><><><><><><><>\n";
    cout << "<><><><><><><><><><><><>LUCAS STOLBA<><><><><><><><><><><><><>\n";
    cout << "<><><><><><><><><><><><><>301555531<><><><><><><><><><><><><><\n";
    cout << "<><><><><><><><><><><><>lsa125@sfu.ca<><><><><><><><><><><><><\n";
    cout << "<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>\n";
    char input = '0';
    BirthdayBST LOB;
    short year, month = 0,day = 0;
    string name, knownFor;
    string inpstr;
    ofstream userFile;
    Birthday nodeToDelete;
    while(input != '6'){
        cout << "Press numbers 1-5 for the following options and then enter:\n";
        cout << "1) to load a birthday file.\n";
        cout << "2) to list birthdays sorted by Month-Day.\n";
        cout << "3) to look up a birthday.\n";
        cout << "4) to add a birthday.\n";
        cout << "5) to save a birthday file.\n";
        cout << "6) to terminate the program\nOption: ";
        cin >> input;//space infront of c to skip \n in buffer
        cout << "\n";
        //dealing with input
        switch(input){
            case('1'):
            cout << "Enter the full name of the birthday file (with extension): ";
            cin >> inpstr;
            cout << "\n";

            //clear file and load new one
            loadFile(inpstr, LOB);
            cout << LOB.getSize() << " entries read." << endl;
            break;
            case('2'):
            if(isEmpty(LOB)){break;}
            LOB.inOrderPrint(cout);
            break;

            case('3'):
            if(isEmpty(LOB)){break;}
            cout << "What is the month (input 1-12 and press enter)? ";
            cin >> month;
            cout << "\nWhat is the day (input 1-31 and press enter)? ";
            cin >> day;
            cout << "\nYou have entered: " << month << '-' << day << '\n' << endl;
            //in function
            LOB.printAllNodeWithMatchingMD(month, day, cout);
            break;
            case('4'):
                cout << "What is the year (input 0-2023 and press enter)? ";
                cin >> year;
                cout << "\nWhat is the month (input 1-12 and press enter)? ";
                cin >> month;
                cout << "\nWhat is the day (input 1-31 and press enter)? ";
                cin >> day;
                cout << "\nWhat is their name? ";
                cin.get(); // read the buffered \n
                getline(cin, name);
                if (!name.empty() && name[name.size() - 1] == '\n') {
                    name.erase(name.size() - 1); //delete \n at the end
                }
                cout << "\nWhat are they known for? ";

                getline(cin, knownFor);
                if (!knownFor.empty() && knownFor[knownFor.size() - 1] == '\n') {
                    knownFor.erase(knownFor.size() - 1);//delete \n at the end
                }
                cout << "\nyou have entered: " << year << '-' << month << '-' << day << endl;
                cout << name << endl << knownFor << endl;
                if (LOB.findNodeByYMDN(year, month, day, name)) {
                    cout << "\nA matching entry already exists.\n" << endl;
                    break;
                }
                LOB.insertNode(create_Birthday(year, month, day, name, knownFor));
                cout << endl;
                break;
            case('5'):
                cout << "What do you want to name your birthday file(including extention)?: ";
                cin >> name;
                userFile.open(name,ios::trunc);//create a file with trunc to overwrite anything
                LOB.inOrderPrint(userFile);
                cout << "\nSaved file \"" << name << "\" with " << LOB.getSize() << " entries.\n" << endl;
                userFile.close();
                break;
            case('6'):break;
            case('7'): //top secret delete function just for fun...
                cout << "What is the year (input 0-2023 and press enter)? ";
                cin >> year;
                cout << "\nWhat is the month (input 1-12 and press enter)? ";
                cin >> month;
                cout << "\nWhat is the day (input 1-31 and press enter)? ";
                cin >> day;
                cout << "\nWhat is their name? ";
                cin.get(); // read the buffered \n
                getline(cin, name);
                if (!name.empty() && name[name.size() - 1] == '\n') {
                    name.erase(name.size() - 1);//delete \n at the end
                }
                cout << "Deleting entry: " << year << '-' << month << '-' << day << endl;
                cout << name << endl;
                if (!LOB.findNodeByYMDN(year, month, day, name)) {
                    cout << "\nEntry not found\n" << endl;
                    break;
                }
                nodeToDelete.year = year;
                nodeToDelete.month = month;
                nodeToDelete.day = day;
                nodeToDelete.name = name;
                nodeToDelete.knownFor = knownFor;
                LOB.removeNode(&nodeToDelete);
                cout << endl;
                break;
            default:
            cout << "\nInvalid Input. Please try again!\n\n";
        }
    }
    return EXIT_SUCCESS;
}
void loadFile(string input, BirthdayBST& LOB){
    LOB.deleteTree();
    ifstream file;
    file.open(input);
    if (!file.is_open()) {
        cout << "Error Opening File!" << endl;
        return;
    }
    while (file.good()) {
        short year, month, day;
        char temp;
        string name,knownFor;
        file >> year >> temp >> month >> temp >> day;
        file.get();
        if(!getline(file, name)){ // test if name is valid when reading
            break;
        }
        if (!name.empty() && name[name.size() - 1] == '\n') {
            name.erase(name.size() - 1);//delete \n at the end
        }
        if(!getline(file, knownFor)){//test if knownFor is valid when reading
            break;
        }
        if (!knownFor.empty() && knownFor[knownFor.size() - 1] == '\n') {
            knownFor.erase(knownFor.size() - 1);//delete \n at the end
        }
        LOB.insertNode(create_Birthday(year, month, day, name, knownFor));
        getline(file,name); // read the line of ===============
        
    }
    file.close();
}
bool isEmpty(BirthdayBST &input){
    if(input.getSize() == 0){
        cout << "\nNo Birthdays are Loaded! Please add a Birthday first.\n\n";
        return true;
    }
    return false;
}