#ifndef addADT
#define addADT

#include <stdint.h>
#include <stdlib.h>
typedef struct ListNode {
    uint64_t val;
    ListNode* next;
}ListNode_t;
ListNode_t* newListNode(uint64_t val);
ListNode_t* addLL(ListNode_t* l1,ListNode_t* l2);
uint64_t* addArr_if(uint64_t* a1, uint64_t len1, uint64_t* a2, uint64_t len2);
uint64_t* addArr_cmov(uint64_t* a1, uint64_t len1, uint64_t* a2, uint64_t len2);
uint64_t* addArr_mod(uint64_t* a1, uint64_t len1, uint64_t* a2, uint64_t len2);

#endif
