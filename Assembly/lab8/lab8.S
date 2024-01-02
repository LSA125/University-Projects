    .section .note.GNU-stack,""
    .global hailstone_length
    .global hailstone_length_cmov
    .text
#from assignment 3
hailstone_length:
	mov $0, %rax
	jmp loop2
loop2:
	
	cmp $1, %rdi
	je endLoop2
	add $1, %rax
	test $1, %dil
	
	jnz isOdd
	jmp isEven
	
isEven:
	shr $1, %rdi
	jmp loop2
isOdd:
	imul $3, %rdi
	add $1, %rdi
	jmp loop2
endLoop2:
	ret



hailstone_length_cmov:
	mov $0, %rax
loop:
	cmp $1, %rdi
	je endLoop # if num is 1 end loop
	add $1, %rax
	mov %rdi, %rsi #rsi is the even case
	shr $1, %rsi
	
	mov %rdi, %rdx #rdx is odd case
	imul $3, %rdx
	add $1, %rdx
	
	test $1, %dil
	
	cmovz %rsi, %rdx # move correct case to rdx
	mov %rdx, %rdi
	jmp loop
endLoop:
	ret
