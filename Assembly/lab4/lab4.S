    .section .note.GNU-stack,""
    .global is_prime
    .global largest_power_unsigned
    .global overflowing_subtract
    .global dumb
    .text
    
is_prime:
	mov $2, %rcx #rcx will be i
	jmp loop1
loop1:
	cmp %rdi, %rcx # if i < n
	jae isPrime 

	#divide i by n, place remainder in %rdx
	mov $0, %rdx
	mov %rdi, %rax
	div %rcx
	
	test %rdx, %rdx #test if n % i == 0
	je isNotPrime
	
	add $1, %rcx #add 1 to loop variable
	jmp loop1
isPrime:
	mov $1, %rax
	ret
isNotPrime:
	mov $0, %rax
	ret
	
largest_power_unsigned:
	#if 0 or 1, ret 1
	mov %rdi, %rax
	cmp $1, %rdi
	ja loop2
	ret
loop2:
	mov %rax, %rcx #store cur number
	mul %rdi #go to next power
	jno loop2 #if nothing carried, loop
	mov %rcx, %rax
	ret #if carry bit, then return the prev val
overflowing_subtract:
	sub %rsi, %rdi
	jo isOverflow
	mov %rdi, %rax
	ret
isOverflow:
	mov $0, %rax
	ret
dumb:
	test %rdi, %rdi
	je baseA
	test %rsi, %rsi
	je baseB
	jmp recursive
baseA:
	mov %rsi, %rax
	ret
baseB:
	mov %rdi, %rax
	ret
recursive:
	push %rdi
	push %rsi
	sub $1, %rdi
	sub $1, %rsi
	call dumb
	pop %rsi
	pop %rdi
	add %rdi, %rax
	add %rsi, %rax
	add %rsi, %rax
	ret
