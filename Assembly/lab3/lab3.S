    .section .note.GNU-stack,""
    .global abs_value
    .global power2
    .global hailstone_length
    .text

abs_value:
	mov %rdi, %rax
	test %rax, %rax
	jl is_negative
	ret
is_negative:
	imul $-1, %rax
	ret

power2 :
	push %r12
	push %r13 
	mov %rdi, %r12 # r12 = remaining loops
	mov $1, %r13 # r13 = data
	# if negative input just return
	test %r12, %r12
	jl endLoop
	jmp loop
loop:
	mov %r13, %rdi
	call print_int64
	add $-1, %r12
	add %r13, %r13
	test %r12, %r12
	jge loop
	jmp endLoop
endLoop:
	pop %r13
	pop %r12
	ret

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
