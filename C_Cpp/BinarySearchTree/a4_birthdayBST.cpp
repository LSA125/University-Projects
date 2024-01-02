#include "a4_birthdayBST.hpp"

/*PRIVATE FUNCTIONS*/

//internal recursive insert function
//DELETED

//internal recursuve remove function
BirthdayBSTreeNode* BirthdayBST::removeNode_rec(BirthdayBSTreeNode* node, Birthday* value) {
    if (!node) {
        return node;
    }
    if (compareBirthdaysByMD(node->value, value) > 0) {
        node->left = removeNode_rec(node->left,value);
    }else
    if (compareBirthdaysByMD(node->value, value) < 0) {
        node->right = removeNode_rec(node->right, value);
    }
    else {
        if (!node->left && !node->right) {
            cout << "\nfound leaf node\n";
            delete_Birthday(node->value);
            delete node;
            --size;
            return nullptr;
        }else 
        if(!node->right){
            cout << "\nfound left node\n";
            BirthdayBSTreeNode* temp = node->left;
            delete_Birthday(node->value);
            delete node;
            --size;
            return temp;
        }else 
        if (!node->left) {
            cout << "\nfound right node\n";
            BirthdayBSTreeNode* temp = node->right;
            delete_Birthday(node->value);
            delete node;
            --size;
            return temp;
        }
        else {
            cout << "\nfound parent node\n";
            BirthdayBSTreeNode* v = minSuccessor(node->right);
            delete_Birthday(node->value);
            node->value = create_Birthday(v->value->year, v->value->month, 
                        v->value->day, v->value->name, v->value->knownFor);
            node->right = removeNode_rec(node->right, node->value);
        }
    }
    return node;
}

//internal recursive find function for duplicates, useful for insert
//DELETED

//internal recursive find function for same month and day, useful for remove
//DELETED

//internal recursive print function with matching month and day
//DELETED


//internal recursive print function performing an in-order traversal
void BirthdayBST::inOrderPrint_rec(BirthdayBSTreeNode* node, ostream& os){
    if (node) {
        if (node->left) {
            inOrderPrint_rec(node->left, os);
        }

        print_Birthday(node->value, os);

        if (node->right) {
            inOrderPrint_rec(node->right, os);
        }
    }
}
//internal recursive delete function releasing memory use by the tree
//also releases the Birthday structs along the way
void BirthdayBST::deleteTree_rec(BirthdayBSTreeNode* node){
    if(!node) return;
    if(node->left)
        deleteTree_rec(node->left);
    if(node->right)
        deleteTree_rec(node->right);
    delete_Birthday(node->value);
    delete node;
    size--;
}
//internal helper function for creating a new tree node
BirthdayBSTreeNode* BirthdayBST::newNode(Birthday* v){
    BirthdayBSTreeNode* out = new BirthdayBSTreeNode;
    out->value = v;
    out->left = nullptr;
    out->right = nullptr;
    out->parent = nullptr;
    return  out;
}
//internal helper function for finding the minimal successor, used by remove
BirthdayBSTreeNode* BirthdayBST::minSuccessor(BirthdayBSTreeNode* node){
    while(node && node->left){
        node = node->left;
    }
    return node;
}

/*PUBLIC FUNCTIONS*/

//constructor
BirthdayBST::BirthdayBST(){
    root = nullptr;
    size = 0;
}
//return the size of the tree
int BirthdayBST::getSize(){
    return size;
}
//insert the Birthday entry to the tree
void BirthdayBST::insertNode(Birthday* value){
    BirthdayBSTreeNode* curr = root;
    BirthdayBSTreeNode* prev = curr;
    if (!root) {
        root = newNode(value);++size;return;
    }
    while(curr){
        prev = curr;
        if(compareBirthdaysByMD(value,curr->value) < 0){
            curr = curr->left; // if target value is smaller go left
        }else{
            curr = curr->right;// if target value is bigger/equal to go right
        }
    }
    curr = newNode(value);
    curr->parent = prev;
    if(compareBirthdaysByMD(prev->value,curr->value) > 0){
        prev->left = curr;
    }else{
        prev->right = curr;
    }
    ++size;
}
//remove a node with matching content from the tree, return the data
Birthday* BirthdayBST::removeNode(Birthday* value){
    root = removeNode_rec(root, value);
    if (root) {
        return root->value;
    }
    else {
        return nullptr;
    }
}
//find a node with matching year, month, day, and name, return the data
Birthday* BirthdayBST::findNodeByYMDN(short year, short month, short day, string name){
    BirthdayBSTreeNode* curr = root;
    while(curr){
        if(cmp(month,day,curr->value->month,curr->value->day) < 0){
            curr = curr->left; // if target value is smaller go left
        }else
        if(cmp(month,day,curr->value->month,curr->value->day) > 0){
            curr = curr->right;// if target value is bigger go right
        }
        else if (curr->value->name == name && curr->value->year == year) {
            return curr->value;//if match is found return the bDay
        }
        else{
            curr = curr->right;// if only MD matches go right because fake BST
        }
    }
    return nullptr;
}
//find a matching node with month and date, return the data
Birthday* BirthdayBST::findNodeByMD(short month, short day){
    BirthdayBSTreeNode* curr = root;
    while(curr){
        if(cmp(month,day, curr->value->month,curr->value->day) < 0){
            curr = curr->left; // if target value is smaller go left
        }else
        if(cmp(month,day, curr->value->month,curr->value->day) > 0){
            curr = curr->right;// if target value is bigger go right
        }
        else{
            return curr->value;//if match is found return the bDay
        }
    }
    return nullptr;
}
//print all content with matching node with month and day
void BirthdayBST::printAllNodeWithMatchingMD(short month, short day, ostream& os){
    BirthdayBSTreeNode* curr = root;
    unsigned int count = 0;
    while(curr){
        if(cmp(month,day, curr->value->month,curr->value->day) < 0){
            curr = curr->left; // if target value is smaller go left
        }else
        if(cmp(month,day, curr->value->month,curr->value->day) > 0){
            curr = curr->right;// if target value is bigger go right
        }
        else{
            print_Birthday(curr->value,os);
            ++count;
            curr = curr->right; // have to go right because this is a fake BST
        }
    }
    if (count == 0) {
        cout << "No birthdays found on " << month << '-' << day << ".\n" << endl;
    }
}
//performs an in-order traversal and print the content to the output stream
void BirthdayBST::inOrderPrint(ostream& os){
    inOrderPrint_rec(root,os);
}

void BirthdayBST::deleteTree() {
    deleteTree_rec(root);
    root = nullptr;
    size = 0;
}

//destructor
BirthdayBST::~BirthdayBST(){
    deleteTree_rec(root);
}