#include <stdint.h>
#include <stdio.h>
#include "utf8.h"


uint32_t getNBits(char val, int bits){
	return ((1<<bits) - 1) & val; //set n bits to 1 and bitwise & with value
}

void decode_utf8(const char* s) {
    unsigned i = 0;
    uint32_t value = 0;
    //this doesnt really need comments
    //i get n bits, shift left to make room and then add the bits
    while (s[i] != '\0') {
        if ((s[i] & 0x40) == 0) {
            value = s[i];
            report_character(value,1);
            i += 1;
        } else if ((s[i] & 0b11100000) == 0b11000000) {
            value = getNBits(s[i],5);
            value <<= 6;
            value += getNBits(s[i+1],6);
            report_character(value,2);
            i += 2;
        } else if ((s[i] & 0b11110000) == 0b11100000) {
            value = getNBits(s[i],4);
            value <<= 6;
            value += getNBits(s[i+1],6);
            value <<= 6;
            value += getNBits(s[i+2],6);
            report_character(value,3);
            i += 3;
            report_character(value,3);
        } else if ((s[i] & 0b11111000) == 0b11110000) {
            value = getNBits(s[i],3);
            value <<= 6;
            value += getNBits(s[i+1],6);
            value <<= 6;
            value += getNBits(s[i+2],6);
            value <<= 6;
            value += getNBits(s[i+3],6);
            report_character(value,4);
            i += 4;
        } else {
            printf("<li>Unknown byte: 0x%02hhx</li>\n", s[i]);
            i++;
        }
    }
}
