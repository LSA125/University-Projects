#include <stdint.h>
#include <stdlib.h>
#include "lab11.h"
#include "test/vectorclass.h"
using namespace std;

void map_poly_single_vc(float* input, float* output, uint64_t length, float a, float b, float c, float d) {
    Vec8f tmp, aa = Vec8f(a),bb = Vec8f(b),cc = Vec8f(c),dd = Vec8f(d);
    for (uint64_t i = 0; i < length; i+=8) {
        tmp.load(input + i);
        tmp = ((aa*tmp + bb)*tmp + cc)*tmp + dd;
        tmp.store(output + i);
    }
}

void map_poly_double_vc(double* input, double* output, uint64_t length, double a, double b, double c, double d) {
    Vec4d tmp, aa = Vec4d(a),bb = Vec4d(b),cc = Vec4d(c),dd = Vec4d(d);
    for (uint64_t i = 0; i < length; i+=8) {
        tmp.load(input + i);
        tmp = ((aa*tmp + bb)*tmp + cc)*tmp + dd;
        tmp.store(output + i);
    }
}

float dot_single_vc(float* arr1, float* arr2, uint64_t length) {
    Vec8f a,b;
    float total = 0.0;
    for (uint64_t i = 0; i < length; i+=8) {
        a.load(arr1 + i);
        b.load(arr2 + i);
        total += horizontal_add(a * b);
    }
    return total;
}

double dot_double_vc(double* arr1, double* arr2, uint64_t length) {
    Vec4d a,b;
    double total = 0.0;
    for (uint64_t i = 0; i < length; i+=4) {
        a.load(arr1 + i);
        b.load(arr2 + i);
        total += horizontal_add(a * b);
    }
    return total;
}
