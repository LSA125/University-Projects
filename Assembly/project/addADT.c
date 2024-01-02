#include "addADT.h"

ListNode_t* newListNode(uint64_t val){
    ListNode_t* out = (ListNode_t*)malloc(sizeof(ListNode_t));
    out->val = val;
    out->next = NULL;
    return out;
}

ListNode_t* addLL(ListNode_t* l1,ListNode_t* l2){
    ListNode_t* head = (ListNode_t*)malloc(sizeof(ListNode_t));
    ListNode_t* it = head;
    uint32_t sum = 0;
    while(l1 || l2){
        sum /= 10;
        if(l1){
            sum += l1->val;
            l1 = l1->next;
        }
        if(l2){
            sum += l2->val;
            l2 = l2->next;
        }
        it->next = newListNode(sum % 10);
        it = it->next;
    }
    if(sum > 9){
        it->next = newListNode(1);
        it = it->next;
    }
    it = head;
    head = head->next;
    free(it);
    return head;
}
uint64_t* addArr_if(uint64_t* a1, uint64_t len1, uint64_t* a2, uint64_t len2){
    uint64_t largest = len1 > len2 ? len1 : len2;
    uint64_t* outArr = (uint64_t*)malloc(sizeof(uint64_t)*(largest+1));
    uint64_t sum = 0,it1 = 0, it2 = 0,count = 0;
    while(it1 < len1 || it2 < len2){
        if(it1 < len1){
            sum += a1[it1++];
        }
        if(it2 < len2){
            sum += a2[it2++];
        }
        if(sum > 9){
            outArr[count] = sum-10;
            sum = 1;
        }else{
            outArr[count] = sum;
            sum = 0;
        }
        
        ++count;
    }
    if(sum > 9){
        outArr[count] = 1;
    }
    return outArr;
}
uint64_t* addArr_cmov(uint64_t* a1, uint64_t len1, uint64_t* a2, uint64_t len2){
    uint64_t largest = len1 > len2 ? len1 : len2;
    uint64_t* outArr = (uint64_t*)malloc(sizeof(uint64_t)*(largest+1));
    uint64_t sum = 0,it1 = 0, it2 = 0,count = 0;
    while(it1 < len1 || it2 < len2){
        sum = sum > 9 ? 1 : 0;
        if(it1 < len1){
            sum += a1[it1++];
        }
        if(it2 < len2){
            sum += a2[it2++];
        }
        outArr[count] = sum > 9 ? sum-10 : sum;
        ++count;
    }
    if(sum > 9){
        outArr[count] = 1;
    }
    return outArr;
}
uint64_t* addArr_mod(uint64_t* a1, uint64_t len1, uint64_t* a2, uint64_t len2){
    uint64_t largest = len1 > len2 ? len1 : len2;
    uint64_t* outArr = (uint64_t*)malloc(sizeof(uint64_t)*(largest+1));
    uint64_t sum = 0,it1 = 0, it2 = 0,count = 0;
    while(it1 < len1 || it2 < len2){
        sum /= 10;
        if(it1 < len1){
            sum += a1[it1++];
        }
        if(it2 < len2){
            sum += a2[it2++];
        }
        outArr[count] = sum % 10;
        ++count;
    }
    if(sum > 9){
        outArr[count] = 1;
    }
    return outArr;
}
