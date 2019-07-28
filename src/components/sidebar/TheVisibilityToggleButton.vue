<template>
	<div class='sidebar-toggle'>
		<button @click='onClick' :class="isOpen ? 'expanded' : ''"><i class='fas fa-bars'></i></button>
	</div>
</template>

<script>
export default {
	props: ['onClick', 'isOpen']
}
</script>

<style lang='scss' scoped>
	.sidebar-toggle {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		background-color: $smoke-screen-color;
		transition: all $long-transition-duration ease;

		button {
			font-size: 16px;
			margin: 0;
			border: none;
			padding: 10px 0;
			transition: all $long-transition-duration ease;
			min-width: $minibar-width;
			&.expanded {
				min-width: $sidebar-width;
			}
		}
	}
</style>
