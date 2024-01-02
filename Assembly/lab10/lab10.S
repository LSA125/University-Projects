    .section .note.GNU-stack,""
    .global dot_double
    .global map_poly_double
    .global dot_single
    .global map_poly_single
    .global sin_x87
    .text
    
dot_double:
	pxor %xmm0,%xmm0 #total
	mov $0, %rcx #iterator
loop1:
	cmp %rdx, %rcx
	jae end1
	movq (%rdi,%rcx,8), %xmm1 # get arr1[i]
	movq (%rsi,%rcx,8), %xmm2 # get arr2[i]
	mulsd %xmm1,%xmm2 # arr1[i] * arr2[i]
	
	addsd %xmm2, %xmm0 # add val to total
	
	inc %rcx
	jmp loop1
end1:
	ret
	
map_poly_double:
	mov $0, %rcx #iterator
loop2:
	cmp %rdx, %rcx
	jae end2
	movq (%rdi,%rcx,8), %xmm4 # get input[i]
	movq %xmm0,%xmm5 #mov a to temp output
	mulsd %xmm4, %xmm5 # a*x
	addsd %xmm1, %xmm5 # a*x + b
	mulsd %xmm4, %xmm5 # (a*x + b)*x
	addsd %xmm2, %xmm5 # (a*x + b)*x + c
	mulsd %xmm4, %xmm5 # ((a*x + b)*x + c)*x
	addsd %xmm2, %xmm5 # ((a*x + b)*x + c)*x + d
	movq  %xmm5, (%rsi,%rcx,8)
	inc %rcx
	jmp loop2
end2:
	ret

dot_single:
	pxor %xmm0,%xmm0
	mov $0, %rcx #iterator
loop3:
	cmp %rdx, %rcx
	jae end3
	movd (%rdi,%rcx,4), %xmm1 # get arr1[i]
	movd (%rsi,%rcx,4), %xmm2 # get arr2[i]
	mulss %xmm1,%xmm2 # arr1[i] * arr2[i]
	
	addss %xmm2, %xmm0 # add val to total
	
	inc %rcx
	jmp loop3
end3:
	ret
	
map_poly_single:
	mov $0, %rcx #iterator
loop4:
	cmp %rdx, %rcx
	jae end4
	movd (%rdi,%rcx,4), %xmm4 # get input[i]
	movq %xmm0, %xmm5 #mov a to temp output
	mulss %xmm4, %xmm5 # a*x
	addss %xmm1, %xmm5 # a*x + b
	mulss %xmm4, %xmm5 # (a*x + b)*x
	addss %xmm2, %xmm5 # (a*x + b)*x + c
	mulss %xmm4, %xmm5 # ((a*x + b)*x + c)*x
	addss %xmm3, %xmm5 # ((a*x + b)*x + c)*x + d
	movd  %xmm5, (%rsi,%rcx,4)
	inc %rcx
	jmp loop4
end4:
	ret

sin_x87:
    mov $0, %rcx
s87_loop:
    cmp %rdx, %rcx
    jae s87_ret
    fldl (%rdi, %rcx, 8)
    fsin
    fstpl (%rsi, %rcx, 8)
    inc %rcx
    jmp s87_loop
s87_ret:
    ret
