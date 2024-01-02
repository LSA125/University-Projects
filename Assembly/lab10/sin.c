#define _POSIX_C_SOURCE 199309L
#include <math.h>
#include <assert.h>
#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>
#include <time.h>
#include "lab10.h"
//almost all this code is from the timing.c

#define SIN_LENGTH 1000000
#define TIMING_RESULT(DESCR, CODE) do { \
    struct timespec start, end; \
    clock_gettime(CLOCK_PROCESS_CPUTIME_ID, &start); \
    CODE; \
    clock_gettime(CLOCK_PROCESS_CPUTIME_ID, &end); \
    double elapsed = (end.tv_sec - start.tv_sec) + (end.tv_nsec - start.tv_nsec) / 1e9; \
    printf("%25s took %7.1f ms\n", descr, elapsed * 1000); \
} while(0)
void sin_stdlib(double* input, double* output, uint64_t length){
	for(int i = 0; i < length;++i){
		output[i] = sin(input[i]);
	}
}
void speed_sin(const char* descr, void s(double* input, double* output, uint64_t length), uint64_t length) {
    double* d1 = create_array(length);
    assert(d1 != NULL);
    double* d2 = create_array(length);
    assert(d2 != NULL);

    TIMING_RESULT(descr, s(d1, d2,length));

    free(d1);
    free(d2);
}

int main(){
	speed_sin("sin_x87", sin_x87, SIN_LENGTH);
	speed_sin("sin_stdlib", sin_stdlib, SIN_LENGTH);
}
