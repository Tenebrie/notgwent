<template>
	<div class='minibar'>
		<div class='file-buttons'>
			<the-new-card-button :is-icon-only="true" />
			<base-divider />
			<the-save-card-button :is-icon-only="true" />
			<the-update-card-button :is-icon-only="true" />
			<base-divider />
			<the-render-card-button :is-icon-only="true" />
		</div>
	</div>
</template>

<script>
import BaseDivider from '../BaseDivider'
import TheNewCardButton from './TheNewCardButton'
import TheSaveCardButton from './TheSaveCardButton'
import TheUpdateCardButton from './TheUpdateCardButton'
import TheRenderCardButton from './TheRenderCardButton'

export default {
	components: {
		BaseDivider,
		TheNewCardButton,
		TheSaveCardButton,
		TheUpdateCardButton,
		TheRenderCardButton
	}
}
</script>

<style lang='scss' scoped>
	.minibar {
		margin-top: 50px;

		.base-button {
			border: none;
			min-width: 100%;
			margin: 0;
			padding: 4px 0;
			min-height: 30px;
			background: transparent;
		}
	}
</style>
