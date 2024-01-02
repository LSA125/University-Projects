    .section .note.GNU-stack,""
    .global strlen_mine
    .global strlen_utf8
    .text
    
    
strlen_mine:
	mov $0, %rcx
loop2:
	cmpb $0, (%rdi,%rcx)
	je endloop2
	add $1,%rcx
	jmp loop2
endloop2:
	mov %rcx,%rax
	ret

strlen_utf8:
	mov $0, %rcx
	mov $0, %rdx
loop1:
	
	mov (%rdi,%rcx), %rsi
	cmpb $0, (%rdi,%rcx)
	je endloop1
	test $0x80, %rsi
	jz addCount1
	test $0x40, %rsi
	jnz addCount1
	add $1, %rcx
	jmp loop1
addCount1:
	add $1,%rdx
	add $1,%rcx
	jmp loop1
endloop1:
	mov %rdx,%rax
	ret
