<template>
	<transition name="slide-fade" appear>
		<div class="toolbar-tab tab-features">
			<the-library-exporter />
			<base-divider />
			<the-library-importer />
		</div>
	</transition>
</template>

<script>
import BaseDivider from '../components/BaseDivider'
import TheLibraryExporter from '../components/TheLibraryExporter'
import TheLibraryImporter from '../components/TheLibraryImporter'

export default {
	components: {
		BaseDivider,
		TheLibraryExporter,
		TheLibraryImporter
	}
}
</script>
