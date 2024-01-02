    .section .note.GNU-stack,""
    .global dot_double
    .global map_poly_double
    .global dot_single
    .global map_poly_single
    .global dot_double_vec
    .global dot_single_vec
    .global map_poly_double_vec
    .global map_poly_single_vec
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
	addsd %xmm3, %xmm5 # ((a*x + b)*x + c)*x + d
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
	
dot_double_vec:
	vxorpd %ymm0, %ymm0, %ymm0
	mov $0, %rcx #iterator
loop5:
	cmp %rdx, %rcx
	jae end5
	vmovupd (%rdi,%rcx,8), %ymm1 # get arr1[i]
	vmovupd (%rsi,%rcx,8), %ymm2 # get arr2[i]
	vmulpd %ymm1, %ymm2, %ymm2 # arr1[i] * arr2[i]
	
	vaddpd %ymm2, %ymm0, %ymm0
	add $4, %rcx
	jmp loop5
end5:
    vextractf128 $0x1, %ymm0, %xmm1
    vaddpd %xmm1, %xmm0, %xmm0
    vshufpd $0b01, %xmm0, %xmm0, %xmm1
    vaddsd %xmm1, %xmm0, %xmm0
    ret

dot_single_vec:
	vxorpd %ymm0, %ymm0, %ymm0
	mov $0, %rcx #iterator
loop6:
	cmp %rdx, %rcx
	jae end6
	vmovups (%rdi,%rcx,4), %ymm1 # get arr1[i]
	vmovups (%rsi,%rcx,4), %ymm2 # get arr2[i]
	vmulps %ymm1,%ymm2, %ymm2 # arr1[i] * arr2[i]
	vaddps %ymm2, %ymm0, %ymm0
	add $8, %rcx
	jmp loop6
end6:
    vextractf128 $0x1, %ymm0, %xmm1
    vaddps %xmm1, %xmm0, %xmm0
    vshufps $0b00001110, %xmm0, %xmm0, %xmm1
    vaddps %xmm1, %xmm0, %xmm0
    vshufps $0b00000001, %xmm0, %xmm0, %xmm1
    vaddss %xmm1, %xmm0, %xmm0
    ret
    
map_poly_double_vec:
	mov $0, %rcx #iterator
	vbroadcastsd %xmm1, %ymm1
	vbroadcastsd %xmm2, %ymm2
	vbroadcastsd %xmm3, %ymm3
loop7:
	cmp %rdx, %rcx
	jae end7
	vmovupd (%rdi,%rcx,8), %ymm4 # get input[i]
	vbroadcastsd %xmm0, %ymm5
	vmulpd %ymm4, %ymm5, %ymm5 # a*x
	vaddpd %ymm1, %ymm5, %ymm5 # a*x + b
	vmulpd %ymm4, %ymm5, %ymm5 # (a*x + b)*x
	vaddpd %ymm2, %ymm5, %ymm5 # (a*x + b)*x + c
	vmulpd %ymm4, %ymm5, %ymm5 # ((a*x + b)*x + c)*x
	vaddpd %ymm3, %ymm5, %ymm5 # ((a*x + b)*x + c)*x + d
	vmovupd  %ymm5, (%rsi,%rcx,8)
	add $4, %rcx
	jmp loop7
end7:
	ret
	
map_poly_single_vec:
	mov $0, %rcx #iterator
	vbroadcastss %xmm1, %ymm1
	vbroadcastss %xmm2, %ymm2
	vbroadcastss %xmm3, %ymm3
loop8:
	cmp %rdx, %rcx
	jae end8
	vmovups (%rdi,%rcx,4), %ymm4 # get input[i]
	vbroadcastss %xmm0, %ymm5
	vmulps %ymm4, %ymm5, %ymm5 # a*x
	vaddps %ymm1, %ymm5, %ymm5 # a*x + b
	vmulps %ymm4, %ymm5, %ymm5 # (a*x + b)*x
	vaddps %ymm2, %ymm5, %ymm5 # (a*x + b)*x + c
	vmulps %ymm4, %ymm5, %ymm5 # ((a*x + b)*x + c)*x
	vaddps %ymm3, %ymm5, %ymm5 # ((a*x + b)*x + c)*x + d
	vmovups  %ymm5, (%rsi,%rcx,4)
	add $8, %rcx
	jmp loop8
end8:
	ret
