    .section .note.GNU-stack,""
    .global randint
    .global fill_array
    .global dot
    .global dot_struct
    .bss
    .data
seed:
    .quad 0

.text

randint:
    movabs $6364136223846793005, %rcx
    movabs $1442695040888963407, %rdi
    lea seed(%rip), %rsi
    imul (%rsi), %rcx
    add %rdi, %rcx
    mov %rcx, (%rsi)
    mov %rcx, %rax
    ret

fill_array:
	#(%rdi,%rcx,8) for %rcx < %rsi
	push %r12 #pointer
	push %r13 #num elements
	push %r14 #counter
	mov %rdi, %r12
	mov %rsi, %r13
	mov $0, %r14
loop:
	cmp %r13, %r14
	jae endLoop
	call randint
	and $0xff, %rax
	sub $128, %rax
	mov %rax, (%r12,%r14,8)
	inc %r14
	jmp loop
endLoop:
	pop %r14
	pop %r13
	pop %r12
	ret

dot:
	push %r12 #pointer
	push %r13 #pointer2
	push %r14 #num elements
	push %r15 #counter
	mov %rdi, %r12
	mov %rsi, %r13
	mov %rdx, %r14
	mov $0, %r15
	mov $0, %rax
loop1:
	cmp %r14, %r15
	jae endLoop1
	mov (%r12,%r15,8), %rdi
	imul (%r13,%r15,8), %rdi
	add %rdi, %rax
	inc %r15
	jmp loop1
endLoop1:
	pop %r15
	pop %r14
	pop %r13
	pop %r12
	ret
dot_struct:
	push %r12 #pointer
	push %r14 #num elements
	push %r15 #counter
	mov %rdi, %r12
	mov %rsi, %r14
	imul $2, %r14 #incrementing by 2 each time so double the num elements
	mov $0, %r15
	mov $0, %rax
loop2:
	cmp %r14, %r15
	jae endLoop2
	mov (%r12,%r15,8), %rdi
	imul 8(%r12,%r15,8), %rdi
	add %rdi, %rax
	add $2, %r15
	jmp loop2
endLoop2:
	pop %r15
	pop %r14
	pop %r12
	ret
