    .section .note.GNU-stack,""
    .global calculate
    .text

calculate:
	push %r12 #store r12 as x
	push %r13 #store r13 as a
	push %r14 #store r14 as b
	push %r15 #store r15 as c
	mov %rdi, %r12 # set r12 as x
	
	mov %rdi, %r13 
	add $3, %r13  # a = x + 3
	#move values to arguments
	mov %r13, %rsi # set arg 2 as a
	call f
	mov %rax, %r14 # store return value into b
	mov %r14, %rdi # move b to arg1
	mov %r12, %rsi # move x to arg2
	call f
	mov %rax, %r15 # store return value into c
	mov %r12, %rdi #move x to arg1
	mov %r15, %rsi #move c into arg2
	call f
	# add all values into counter
	mov %rax, %rcx # + d
	add %r15, %rcx # + c
	add %r14, %rcx # + b
	add %r13, %rcx # + a
	mov %rcx, %rax
	#restore values
	pop %r15
	pop %r14
	pop %r13
	pop %r12
	ret
