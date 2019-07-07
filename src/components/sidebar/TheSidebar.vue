<template>
	<div class='sidebar'>
		<div class='file-buttons'>
			<the-new-card-button :is-icon-only="false" />
			<base-divider />
			<the-save-card-button :is-icon-only="false" />
			<the-update-card-button :is-icon-only="false" />
			<base-divider />
			<the-render-card-button :is-icon-only="false" />
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
	.sidebar {
		margin-top: 50px;

		button {
			border: none;
			min-width: 100%;
			margin: 0;
			padding: 4px 0;
			min-height: 30px;
			background: transparent;
		}
	}
</style>
