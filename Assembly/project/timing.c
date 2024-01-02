// Enable clock_gettime: https://stackoverflow.com/a/40515669
#define _POSIX_C_SOURCE 199309L
#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>
#include <time.h>
#include "addADT.h"

#define NUM1LENGTH 100000000
#define NUM2LENGTH 100000000
#define BASE 10
uint64_t* createArray(uint64_t length){
    uint64_t* array = (uint64_t*)malloc(length * sizeof(uint64_t));
    if (array == NULL) {
        return NULL;
    }
    for (uint64_t i = 0; i < length; i++) {
        array[i] = ((uint64_t)rand() % BASE);
    }
    return array;
}
void freeLL(ListNode_t* node){
    ListNode_t* temp;
    while(node){
        temp = node;
        node = node->next;
        free(temp);
    }
}
ListNode* createLL(uint64_t length){
    ListNode_t* it = newListNode((uint64_t)rand() % BASE);
    ListNode_t* head = it;
    for (uint64_t i = 0; i < length-1; i++) {
        it->next = newListNode((uint64_t)rand() % BASE);
        it = it->next;
    }
    return head;
}
void addLLSpeed(const char* descr, ListNode_t* addLL(ListNode_t*,ListNode_t*)) {
    uint64_t total = 0;
    struct timespec start, end;
    ListNode_t* num1 = createLL(NUM1LENGTH);
    ListNode_t* num2 = createLL(NUM2LENGTH);
    clock_gettime(CLOCK_PROCESS_CPUTIME_ID, &start);
    ListNode_t* res = addLL(num1,num2);
    clock_gettime(CLOCK_PROCESS_CPUTIME_ID, &end);
    double elapsed = (end.tv_sec - start.tv_sec) + (end.tv_nsec - start.tv_nsec) / 1e9;
    printf("%25s calculated in %.3g ms\n", descr, elapsed * 1000);
    freeLL(num1);
    freeLL(num2);
    freeLL(res);
}

void addArrSpeed(const char* descr, uint64_t* addArr(uint64_t*, uint64_t, uint64_t*, uint64_t)) {
    uint64_t* num1 = createArray(NUM1LENGTH);
    uint64_t* num2 = createArray(NUM2LENGTH);
    struct timespec start, end;

    clock_gettime(CLOCK_PROCESS_CPUTIME_ID, &start);
    uint64_t* res = addArr(num1,NUM1LENGTH,num2,NUM2LENGTH);
    clock_gettime(CLOCK_PROCESS_CPUTIME_ID, &end);
    double elapsed = (end.tv_sec - start.tv_sec) + (end.tv_nsec - start.tv_nsec) / 1e9;
    printf("%25s calculated in %.3g ms\n", descr, elapsed * 1000);
    free(num1);
    free(num2);
    free(res);
}

int main(void) {

addLLSpeed("addLL", addLL);

    addArrSpeed("addArr_cmov", addArr_cmov);
    addArrSpeed("addArr_if", addArr_if);
    addArrSpeed("addArr_mod", addArr_mod);

    return 0;
}
