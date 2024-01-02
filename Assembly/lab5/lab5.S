    .section .note.GNU-stack,""
    .global fibonacci
    .global is_odd1
    .global is_odd2
    .global mul1
    .global mul2
    .global polynomial1
    .global polynomial2
    .text

fibonacci:
	cmp $1, %rdi
	jle base
	push %rdi
	sub $1, %rdi
	call fibonacci
	pop %rdi
	mov %rax, %rdx
	push %rdi
	push %rdx
	sub $2, %rdi
	call fibonacci
	pop %rdx
	pop %rdi
	add %rdx, %rax
	ret
base:
	mov %rdi, %rax
	ret
	
is_odd1:
	mov $0, %rdx
	mov %rdi, %rax
	mov $2, %rdi
	div %rdi
	mov %rdx, %rax
	ret
is_odd2:
	and $1, %rdi
	mov %rdi, %rax
	ret
mul1:
	mov %rdi, %rax
	imul $65537, %rax
	ret
mul2:
	mov %rdi, %rax
	shl $16, %rax
	add %rdi, %rax
	ret
polynomial1:
	#polynomial2(x, a, b, c, d) = a*x*x*x + b*x*x + c*x + d
	mov %r8, %rax # + d
	
	imul %rdi, %rcx # c*x
	add %rcx, %rax # c*x + d
	
	imul %rdi, %rdx # b*x*x
	imul %rdi, %rdx
	add %rdx, %rax # b*x*x + c*x + d
	
	imul %rdi, %rsi # a*x*x*x
	imul %rdi, %rsi 
	imul %rdi, %rsi 
	add %rsi, %rax # a*x*x*x + b*x*x + c*x + d
	ret
	
polynomial2:
	#polynomial2(x, a, b, c, d) = x*(x*(a*x + b) + c) + d
	imul %rdi, %rsi
	add %rdx, %rsi
	imul %rdi, %rsi
	add %rcx, %rsi
	imul %rdi, %rsi
	add %r8, %rsi
	mov %rsi, %rax
	ret
